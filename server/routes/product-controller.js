var express = require('express');
var router = express.Router();
var productServiceService = require('../service/product-service')
var { success, error } = require('../utils/response')
const multer = require('multer');
var path = require('path')

// 配置 multer 存储选项
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
    req.uploadName = name
    cb(null, name); // 自定义文件名
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  res.send(req.uploadName);
});

router.get('/', async (req, res, next) => {
  let { page, pageSize } = req.query
  page = Number(page)
  pageSize = Number(pageSize)
  if (isNaN(page)) { page = 1 }
  if (isNaN(pageSize)) { pageSize = 10 }

  const productServices = await productServiceService.selectProduct({ page, pageSize })
  res.send(productServices ? success(productServices) : error())
})

router.post('/', async (req, res, next) => {
  const data = req.body
  const result = await productServiceService.insertProduct(data)
  res.send(result ? success() : error())
})

router.put('/:id', async (req, res, next) => {
  const data = req.body || {}
  const result = await productServiceService.updateProductById({ id: req.params.id, ...data })
  res.send(result ? success() : error())
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const result = await productServiceService.deleteProductById(id)
  res.send(result ? success() : error())
})

module.exports = router

var express = require('express');
var router = express.Router();
var classifyServiceService = require('../service/classify-service')
var { success, error } = require('../utils/response')

router.get('/', async (req, res, next) => {
  const classifyServices = await classifyServiceService.selectClassify()
  res.send(classifyServices ? success(classifyServices) : error())
})

router.post('/', async (req, res, next) => {
  const data = req.body
  const result = await classifyServiceService.insertClassify(data)
  res.send(result ? success() : error())
})

router.put('/:id', async (req, res, next) => {
  const data = req.body || {}
  const result = await classifyServiceService.updateClassifyById({ id: req.params.id, ...data })
  res.send(result ? success() : error())
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const result = await classifyServiceService.deleteClassifyById(id)
  res.send(result ? success() : error())
})

module.exports = router

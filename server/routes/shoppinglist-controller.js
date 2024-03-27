var express = require('express');
var router = express.Router();
var shoppinglistServiceService = require('../service/shoppinglist-service')
var { success, error } = require('../utils/response')

router.get('/', async (req, res, next) => {
  const shoppinglistServices = await shoppinglistServiceService.selectShoppinglist()
  res.send(shoppinglistServices ? success(shoppinglistServices) : error())
})

router.post('/', async (req, res, next) => {
  const data = req.body
  const result = await shoppinglistServiceService.insertShoppinglist(data)
  res.send(result ? success() : error())
})

router.put('/:id', async (req, res, next) => {
  const data = req.body || {}
  const result = await shoppinglistServiceService.updateShoppinglistById({ id: req.params.id, ...data })
  res.send(result ? success() : error())
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const result = await shoppinglistServiceService.deleteShoppinglistById(id)
  res.send(result ? success() : error())
})

module.exports = router

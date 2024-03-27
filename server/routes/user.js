var express = require('express');
var router = express.Router();
var service = require('../service/user')

router.post('/login', async function (req, res, next) {
  let nList = await service.selectOneByEmail(req.body.email)

  if (!nList.length) {
    await service.insert(req.body.email, req.body.password)
  }

  let list = await service.selectOneByEmailAndPwd(req.body.email, req.body.password)

  res.send({
    code: list.length ? 200 : 500,
    data: list[0]
  })
});

module.exports = router;

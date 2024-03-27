var query = require('../mysql/query')

async function selectAll() {
  return await query({
    sql: 'SELECT * FROM `t_user` ORDER BY id DESC',
  })
}

async function selectOneByEmail(email) {
  return await query({
    sql: 'SELECT * FROM `t_user` WHERE email=?',
    params: [email]
  })
}

async function selectOne(id) {
  return await query({
    sql: 'SELECT * FROM `t_user` WHERE id=?',
    params: [id]
  })
}

async function selectOneByEmailAndPwd(email, pwd) {
  return await query({
    sql: 'SELECT * FROM `t_user` WHERE email=? and password=?',
    params: [email, pwd]
  })
}
async function updateStorage({ id, storage }) {
  return await query({
    sql: 'update t_user set storage=? where id=?',
    params: [storage, id]
  })
}

async function insert(email, pwd) {
  return await query({
    sql: 'INSERT INTO `t_user`(`email`, `password`) VALUES (?,?)',
    params: [email, pwd]
  })
}

module.exports = {
  selectAll,
  selectOne,
  selectOneByEmailAndPwd,
  selectOneByEmail,
  insert,
  updateStorage
}

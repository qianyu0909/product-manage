var query = require('../mysql/query')

const selectKeys = '*'

/**
 * table name: t_classify
 * table keys: 
 *   key: id        desc: ID
 *   key: user_id   desc: 用户id
 *   key: name      desc: 分类名
 *   key: storage   desc: -
 */
module.exports = {
  selectClassify () {
    return new Promise(async (resolve) => {
      try {
        const classifys = await query({
          sql: `SELECT ${selectKeys} FROM \`t_classify\` ORDER BY id DESC`,
        })
       
        resolve(classifys)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insertClassify ({ name, user_id, storage }) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'INSERT INTO `t_classify` (`name`, `user_id`, `storage`) VALUES(?)',
          params: [
            [name, user_id, storage]
          ]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  updateClassifyById ({ id, name, storage }) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'UPDATE `t_classify` SET ? WHERE `id`=?',
          params: [
            { name, storage },
            id
          ]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  deleteClassifyById (id) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'DELETE FROM `t_classify` WHERE `id`=?',
          params: [id]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }
}

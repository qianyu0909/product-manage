var query = require('../mysql/query')

const selectKeys = '*'

/**
 * table name: t_shoppingList
 * table keys: 
 *   key: id            desc: ID
 *   key: user_id       desc: 用户id
 *   key: name          desc: 商品名
 *   key: num           desc: 数量
 *   key: description   desc: 描述
 *   key: storage       desc: -
 */
module.exports = {
  selectShoppinglist () {
    return new Promise(async (resolve) => {
      try {
        const shoppinglists = await query({
          sql: `SELECT ${selectKeys} FROM \`t_shoppingList\` ORDER BY id DESC`,
        })
        resolve(shoppinglists)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insertShoppinglist ({ name, user_id, num, description, storage }) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'INSERT INTO `t_shoppingList` (`name`, `user_id`, `num`, `description`, `storage`) VALUES(?)',
          params: [
            [name, user_id, num, description, storage]
          ]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  updateShoppinglistById ({ id, name, num, description, storage }) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'UPDATE `t_shoppingList` SET ? WHERE `id`=?',
          params: [
            { name, num, description, storage },
            id
          ]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  deleteShoppinglistById (id) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'DELETE FROM `t_shoppingList` WHERE `id`=?',
          params: [id]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }
}

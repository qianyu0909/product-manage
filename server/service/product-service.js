var query = require('../mysql/query')

const selectKeys = '*'

/**
 * table name: t_product
 * table keys: 
 *   key: id            desc: ID
 *   key: classify_id   desc: 分类ID
 *   key: user_id       desc: 用户ID
 *   key: name          desc: 商品名
 *   key: description   desc: 描述
 *   key: image         desc: 图片地址
 *   key: num           desc: 数量
 *   key: tags          desc: 数量
 *   key: status        desc: 物品状态
 *   key: storage       desc: -
 */
module.exports = {
  selectProduct () {
    return new Promise(async (resolve) => {
      try {
        const products = await query({
          sql: `SELECT ${selectKeys} FROM \`t_product\` ORDER BY id DESC`,
        })
        resolve(products)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insertProduct ({ user_id, classify_id, name, description, image, num, tags, status, storage }) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'INSERT INTO `t_product` (`user_id`, `classify_id`, `name`, `description`, `image`, `num`, `tags`, `status`, `storage`) VALUES(?)',
          params: [
            [user_id, classify_id, name, description, image, num, tags, status, storage]
          ]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  updateProductById ({ id, classify_id, name, description, image, num, tags, status, storage }) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'UPDATE `t_product` SET ? WHERE `id`=?',
          params: [
            { classify_id, name, description, image, num, tags, status, storage },
            id
          ]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  deleteProductById (id) {
    return new Promise(async (resolve) => {
      try {
        await query({
          sql: 'DELETE FROM `t_product` WHERE `id`=?',
          params: [id]
        })
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }
}

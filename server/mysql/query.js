var mysql = require('mysql')

const pool = mysql.createPool({
  host: 'localhost',
  database: 'product',
  user: 'root',
  password: '123456',
  useConnectionPooling: true,
  dateStrings: true
})

module.exports = function ({ sql, params = [] }) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connect) => {
      if (err) {
        console.log(err)
        return reject(err)
      } else {
        connect.query(sql, params, (err, values) => {
          connect.release()
          if (err) {
            console.log(err)
            return reject(err)
          } else {
            resolve(values)
          }
        })
      }
    })
  })
}

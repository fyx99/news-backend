const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || '138.68.74.3',
    database: process.env.DB_NAME || 'newsaggregate',
    password: process.env.DB_PW || 'u3fph3ßü98fg43f34f3',
    port: process.env.DB_PORT || 5432,
    application_name: 'NEWSBACKEND'
})



module.exports = {
  query: async (text, params) => {
    //console.time("query");
    const qres = await pool.query(text, params)
    //console.timeEnd("query");
    return qres
  },
}

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: process.env.BD_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
});

async function query(sql, data) {
  let conn;
  let res;
  try {
    conn = await pool.getConnection();
    res = await conn.query(sql, data);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
    if (res.meta) delete res.meta;
    return res;
  }
}

async function CreatData(sql) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(sql);
    // const rows = await conn.query("SELECT 1 as val");
    // rows: [ {val: 1}, meta: ... ]

    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

async function getOne(sql, data) {
  const answer = await query(sql, data);
  return answer[0];
}
module.exports = {
  query,
  getOne,
  CreatData,
};

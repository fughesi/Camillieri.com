const { createPool } = require("mysql2/promise");

function db(query) {
  let args = Array.from(arguments).slice(1);

  const pool = createPool({
    // https://github.com/mysqljs/mysql?tab=readme-ov-file#connection-options
    host: process.env.HOST,
    user: process.env.USER_MYSQL,
    port: process.env.PORT_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 2,
    idleTimeout: 2000,
  });

  return {
    query: async () => {
      try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute(query, args);
        connection.release();
        return results;
      } catch (error) {
        console.log(error);
        return;
      }
    },
  };
}

module.exports = { db };

const { db } = require("../database/mysql");

function aboutController(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // allow all connections
  });

  return {
    about: async () => {
      const thing = await db("SELECT * FROM test2").query();
      // const thing = await db("SELECT * FROM interests").query();
      res.end(JSON.stringify(thing));
      return;
    },
  };
}

module.exports = { aboutController };

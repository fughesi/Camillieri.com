const { db } = require("../database/mysql");

function aboutController(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections

  return {
    about: async () => {
      const thing = await db("SELECT * FROM interests").query();
      res.end(JSON.stringify(thing));
      return;
    },
  };
}

module.exports = { aboutController };

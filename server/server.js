const http = require("node:http");
const path = require("node:path");
const { middleware } = require("./utils/middleware");
const { aboutController } = require("./controllers/aboutController");

const PORT = process.env.PORT || 3333;

http
  .createServer(async (req, res) => {
    try {
      const endpoint = req.url;

      const mimetypes = {
        ".css": "text/css",
        ".js": "text/javascript",
        ".html": "text/html",
        ".json": "application/json",
        ".ico": "image/x-icon",
      };

      let contentType = mimetypes[path.extname(endpoint)] || "text/html";

      let file = path.join(__dirname, "..", "client", endpoint);

      const pages = ["/", "/about", "/home"];

      if (pages.indexOf(endpoint) > -1)
        // reroutes to index on page refresh so router.js can navigate
        file = path.join(__dirname, "..", "client", "index.html");

      if (req.headers["content-type"] === "application/json") {
        aboutController(req, res).about();
      } else {
        middleware().serveFile(file, contentType, res); // serve all static files
      }
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end(error.message);
    }
  })
  .listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );

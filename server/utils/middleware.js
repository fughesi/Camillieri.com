const fs = require("node:fs/promises");

function middleware() {
  return {
    writeDataToFile: async (filename, content) => {
      // not finished
      try {
        fs.writeFile(filename, JSON.stringify(content), "utf-8");
      } catch (error) {
        console.log(`failed to write data to file: ${error.message}`);
      }
    },

    getBodyData: async (req) => {
      return new Promise((resolve, reject) => {
        try {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            resolve(body);
          });
        } catch (error) {
          reject("failed to get data from body\n", error);
        }
      });
    },

    serveFile: async (file, contentType, res) => {
      try {
        const content = await fs.readFile(file);

        res.writeHead(200, {
          "Content-Type": contentType, // set MIME type
          "Access-Control-Allow-Origin": ["http://127.0.0.1:52237", "*"], // CORS
        });

        res.end(content, "utf-8");
      } catch (error) {
        error?.code !== "ENOENT"
          ? (res.writeHead(500), res.end(`Server Error: ${error}`))
          : (res.writeHead(404), res.end(`File not found: ${error}`));
      }
    },
  };
}

module.exports = { middleware };

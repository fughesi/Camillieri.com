const http = require("node:http");
const path = require("node:path");
const { readFile } = require("node:fs/promises");

const PORT = process.env.PORT || 3333;

http
  .createServer(async (req, res) => {
    try {
      const mimetypes = {
        ".css": "text/css",
        ".js": "text/javascript",
        ".html": "text/html",
        ".json": "application/json",
        ".ico": "image/x-icon",
      };

      let contentType = mimetypes[path.extname(req.url)] || "text/html";

      let file = path.join(__dirname, req.url);

      if (req.url === "/") file = "./index.html";

      const contents = await readFile(file, { encoding: "utf8" });

      res.setHeader("Content-Type", contentType);
      res.end(contents);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end({ message: error });
    }
  })
  .listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );

// function utils() {
//   return {
//     writeDataToFile: (filename, content) => {
//       fs.writeFile(filename, JSON.stringify(content), "utf-8", (error) => {
//         if (error) throw new Error("failed to write data to file");
//       });
//     },
//
//     getBodyData: (req) => {
//       return new Promise((resolve, reject) => {
//         try {
//           let body = "";
//           req.on("data", (chunk) => {
//             body += chunk.toString();
//           });
//           req.on("end", () => {
//             resolve(body);
//           });
//         } catch (error) {
//           reject("failed to get data from body\n", error);
//         }
//       });
//     },
//
//     serveFile: (filePath, contentType, res) => {
//       fs.readFile(filePath, (err, content) => {
//         if (err) {
//           if (err?.code !== "ENOENT") {
//             res.writeHead(500);
//             res.end(`Server Error: ${err?.code}`);
//           }
//         } else {
//           res.writeHead(200, { "Content-Type": contentType });
//           res.end(content, "utf-8");
//         }
//       });
//     },
//   };
// }
//

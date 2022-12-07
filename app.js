const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pdfRoutes = require("./web-page-pdf/routes/convertToPdfRoutes");
const {
  notFound,
  developmentErrors,
  productionErrors,
} = require("./helpers/error");
require("dotenv").config({ path: ".env" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1", pdfRoutes);
app.use(notFound);

if (process.env.NODE_ENV == "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}
app.use(productionErrors);

// app.get("/node-test", (req, res) => {
//   setImmediate(() => console.log(1));
//   Promise.resolve().then(() => console.log(2));
//   process.nextTick(() => console.log(3));
//   fs.readFile("big.file", () => {
//     console.log(4);
//     setTimeout(() => console.log(5));
//     setImmediate(() => console.log(6));
//     process.nextTick(() => console.log(7));
//   });
//   console.log(8);

//   res.status(200).json({ msg: "Reading done" });
// });

// app.get("/create-file", (req, res) => {
//   const file = fs.createWriteStream("example.txt");
//   file.write("hello, ");
//   file.end("world!");
//   //   const file = fs.createWriteStream("./big.file");

//   //   process.stdin.pipe(file);
//   //   for (let i = 0; i <= 1e6; i++) {
//   //     file.write(
//   //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"
//   //     );
//   //   }
//   //   file.end();z
//   res.status(200).json({ msg: "File Done" });
// });

// app.get("/read-file", (req, res) => {
//   // const getDataAPI = new FetchStream("https://www.google.com");

//   // getDataAPI.on("data", function (chunk) {
//   //   console.log("whole website data", JSON.stringify(chunk));
//   // });
//   res.status(200).json({ msg: "Reading done" });
// });

// app.get("/elastic-search-test", (req, res) => {
//   const elasticClient = new elasticSearch.Client({
//     host: "lucifer",
//     log: "hell",
//   });
// });

module.exports = app;

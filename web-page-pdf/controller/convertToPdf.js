const puppeteer = require("puppeteer");
const { sendApiResponse } = require("../../helpers/apiResponse");

exports.getDataFromWebPAge = async (req, res) => {
  let { url = "https://www.google.com" } = req.body;
  if (!url.includes(process.env.URL_PREDECESSOR)) {
    url = `${urlPredecessor}${url}`;
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.pdf({
    format: "A4",
    path: "./web-page.pdf",
    printBackground: true,
  });
  sendApiResponse(res, {
    status: true,
    statusCode: 200,
    msg: "Work Done",
    data: [],
  });
};

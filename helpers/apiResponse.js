async function sendApiResponse(res, data) {
  //   console.log("datat", res, data);
  return res.status(data.statusCode).send(data);
}

module.exports = {
  sendApiResponse: sendApiResponse,
};

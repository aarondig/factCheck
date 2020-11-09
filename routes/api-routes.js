const axios = require("axios");
const db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {
  // index route loads cms.html
  app.post("/api/search", async function (req, res) {
    const result = await axios.get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=${req.body.searchEncoded}&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI`
    );
    var response = result.data.claims;

    await db.Search.destroy({ where: {} });
    for (i = 0; i < 5; i++) {
      await db.Search.create({
        query: req.body.search,
        title: response[i].claimReview[0].title,
        text: response[i].text,
        publisher: response[i].claimReview[0].publisher.site,
        url: response[i].claimReview[0].url,
        rating: response[i].claimReview[0].textualRating,
      });
    }
    res.status(200).end();
  });
  app.get("/api/display", async function (req, res) {
    const data = await db.Search.findAll({});
    console.log(data.map((i) => i.toJSON()));
    res.json(data);
  });
};

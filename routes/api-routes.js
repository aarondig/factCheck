const axios = require("axios");
const db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {

    // index route loads cms.html
    app.post("/api/search", function(req, res) {
        axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&query=${req.body.searchEncoded}&key=AIzaSyAYJ05r2WOK34MO9zLkmaz0Ux9NWnYTCcI`)
            .then(async function(res) {
                var response = res.data.claims;

                for (i = 0; i < 5; i++) {
                    console.log(response[i].claimReview[0].publisher.site);

                    await db.Search.create({
                        query: req.body.search,
                        title: response[i].claimReview[0].title,
                        text: response[i].text,
                        publisher: response[i].claimReview[0].publisher.site,
                        url: response[i].claimReview[0].url,
                        rating: response[i].claimReview[0].textualRating
                    })
                }
            });

    });
    app.get("/api/display", function(req, res) {

    });
}
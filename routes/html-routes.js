var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {
  // index route loads cms.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};

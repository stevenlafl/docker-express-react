var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {

  var data = [
    "test",
    "test",
    "test"
  ];
  res.send(JSON.stringify(data));
});

module.exports = router;
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {

  var data = [
    "test",
    "test2",
    "test3"
  ];
  res.send(JSON.stringify(data));
});

module.exports = router;
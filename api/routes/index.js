var express = require('express');
var router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, '../build')));

router.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/../build'));
});

module.exports = router;

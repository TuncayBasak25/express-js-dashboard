var express = require('express');
var router = express.Router();

var db = require('../models/index');

var cors = require('cors');

router.use(cors());

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try
  {
    const books = await db.Book.findAll();

    res.send(books);
  }
  catch (e) {
    console.log(e);
  }
});




module.exports = router;

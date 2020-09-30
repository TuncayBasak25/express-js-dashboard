var express = require('express');
var router = express.Router();

var db = require('../models/index');

/* Enter login page. */
router.all('/', async function(req, res, next) {

  try
  {
    const actualUser = await db.User.findOne({ where: {sessionId: req.session.id } });

    if (!actualUser)
    {
      res.redirect('/');
    }

    next();
  }
  catch (e) {
    console.log(e);
  }
});

/* GET login page. */
router.get('/', async function(req, res, next) {
  try
  {
    const bookList = await db.Book.findAll();

    res.render('books', {bookList: bookList});
  }
  catch (e) {

  }
});

/* POST login page. */
router.post('/', async function(req, res, next) {
  try
  {


    res.render('books');
  }
  catch (e) {
    console.log(e);
  }
});




module.exports = router;

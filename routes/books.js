var express = require('express');
var router = express.Router();

var db = require('../models/index');

/* GET books page. */
router.get('/', async function(req, res, next) {
  try
  {
    const actualUser = await db.User.findOne({ where: {sessionId: req.session.id } });

    if (!actualUser)
    {
      res.redirect('/');
    }

    const bookList = await db.Book.findAll();

    res.render('books', {bookList: bookList, userId: actualUser.dataValues.id});
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

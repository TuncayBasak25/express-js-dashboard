var express = require('express');
var router = express.Router();

var db = require('../models/index');

var Joi = require('joi');

let bookSchema = Joi.object( {
  title: Joi.string().min(4).max(16).required(),
  reference: Joi.string().min(10).max(10).required(),
  category: Joi.string().valid('roman', 'science', 'dictionnaire').required(),
  writtingDate: Joi.date().required(),
  editionDate: Joi.date().required(),
  addBookButton: Joi.string()
});

/* Enter login page. */
router.all('/', async function(req, res, next) {

  try
  {
    const actualUser = await db.User.findOne({ where: {sessionId: req.session.id } });

    if (!actualUser)
    {
      res.redirect('/');
    }

    req.user = actualUser;

    next();
  }
  catch (e) {
    console.log(e);
  }
});

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('addBook', { user: req.user, categories: db.Book.CATEGORIES });
});

/* POST login page. */
router.post('/', async function(req, res, next) {
  try
  {
    const valid = bookSchema.validate(req.body);

    if (valid.error)
    {
      res.render('addBook', { error: valid.error.details[0].message, user: req.user });
      return;
    }

    const book = await db.Book.create({
      title: req.body.title,
      reference: req.body.reference,
      category: req.body.category,
      writtingDate: req.body.writtingDate,
      editionDate: req.body.editionDate
    });

    res.render('addBook', { error: `Book ${req.body.title} has been added successfully.`, user: req.user });
  }
  catch (e) {
    console.log(e);
  }
});




module.exports = router;

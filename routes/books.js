var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Joi = require('joi');

/* GET books page. */
router.get('/', async function(req, res, next) {
  try
  {
    const actualUser = await db.User.findOne({ where: {sessionId: req.session.id } });

    if (!actualUser)
    {
      res.redirect('/');
    }

    if (!req.session.filter)
    {
      req.session.filter = {};
      const bookList = await db.Book.findAll();
    }
    else
    {
      let where = {};

      if (req.session.filter.category !== '')
      {
        where.category = req.session.filter.category;
      }

      if (req.session.filter.status !== '')
      {
        where.status = req.session.filter.status;
      }

      if (Object.keys(where).length !== 0)
      {
        console.log(where);
        const bookList = await db.Book.findAll(  );
      }
      else
      {
        const bookList = await db.Book.findAll();
      }

    }

    res.render('books', {bookList: bookList, userId: actualUser.dataValues.id, user: actualUser, filter: req.session.filter });
  }
  catch (e) {

  }
});

const filterSchema = Joi.object({
  category: Joi.string().valid('', 'roman', 'dictionnaire', 'science'),
  status: Joi.string().valid('', 'available', 'borrowed', 'reserved')
});

router.post('/filter', async function(req, res, next) {
  try
  {
    const actualUser = await db.User.findOne({ where: {sessionId: req.session.id } });

    if (!actualUser)
    {
      res.redirect('/');
    }

    if (filterSchema.validate(req.body))
    {
      req.session.filter = req.body;
    }

    res.redirect('/books');
  }
  catch (e) {
    console.log(e);
  }
});





module.exports = router;

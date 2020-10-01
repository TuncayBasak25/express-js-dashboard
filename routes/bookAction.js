var express = require('express');
var router = express.Router();

var db = require('../models/index');

var Joi = require('joi');

/* Get all action. */
router.get('/*', async function(req, res, next) {
  try
  {
    const user = await db.User.findOne({ where: {sessionId: req.session.id } });
    const book = await db.Book.findOne( { where: { id: req.query.bookId } });

    if (!user || !book)
    {
      res.redirect('/');
    }

    req.user = user;
    req.book = book;

    next();
  }
  catch (e) {
    console.log(e);
  }
});

router.get('/borrow', async function(req, res, next) {
  try
  {
    if (! await req.book.getBorrower())
    {
      await req.book.setBorrower(req.user);
    }

    res.redirect('/books');
  }
  catch (e) {
    console.log(e);
  }
});

router.get('/return', async function(req, res, next) {
  try
  {
    const borrower = await req.book.getBorrower();
    if (borrower && borrower.dataValues.id === req.user.dataValues.id)
    {
      const reserver = await req.book.dataValues.ReserverId;
      if (reserver)
      {
        await req.book.setBorrower(reserver);
        await req.book.setReserver(null);
      }
      else
      {
        await req.book.setBorrower(null);
      }
    }

    res.redirect('/books');
  }
  catch (e) {
    console.log(e);
  }
});

router.get('/reserve', async function(req, res, next) {
  try
  {
    const borrower = await req.book.getBorrower();
    const reserver = await req.book.getReserver();

    if (borrower && borrower.dataValues.id !== req.user.dataValues.id && !reserver)
    {
      await req.book.setReserver(req.user);
    }

    res.redirect('/books');
  }
  catch (e) {
    console.log(e);
  }
});

router.get('/annulate', async function(req, res, next) {
  try
  {
    const borrower = await req.book.getBorrower();
    const reserver = await req.book.getReserver();

    if (borrower && borrower.dataValues.id !== req.user.dataValues.id && reserver && reserver.dataValues.id === req.user.dataValues.id)
    {
      //await req.book.update({reservationDate: })
      await req.book.setReserver(null);
    }

    res.redirect('/books');
  }
  catch (e) {
    console.log(e);
  }
});



module.exports = router;

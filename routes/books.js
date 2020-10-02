var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Sequelize = require('Sequelize');
var Op = Sequelize.Op
var Joi = require('joi');

router.all('/*', async function(req, res, next) {
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

/* GET books page. */
router.get('/', async function(req, res, next) {
  try
  {
    let bookList;

    if (req.session.bookFilter === undefined)
    {
      req.session.bookFilter = {};
    }

    if (req.session.bookOrder === undefined)
    {
      req.session.bookOrder = '';
      req.session.bookOrderReverse = false;
    }

    if (req.session.bookPage === undefined)
    {
      bookPage = 1;
    }
    else
    {
      bookPage = parseInt(req.session.bookPage);
    }

    if (req.session.bookByPage === undefined)
    {
      bookByPage = 20;
    }
    else
    {
      bookByPage = parseInt(req.session.bookByPage);
    }

    let order = [];

    if (req.session.bookOrder !== '')
    {
      if (req.session.bookOrderReverse)
      {
        order.push([req.session.bookOrder, 'DESC']);
      }
      else
      {
        order.push([req.session.bookOrder, 'ASC']);
      }
    }

    let where = {};

    if (req.session.bookFilter.category !== undefined && req.session.bookFilter.category !== '')
    {
      where.category = req.session.bookFilter.category;
    }

    if (req.session.bookFilter.status !== undefined && req.session.bookFilter.status !== '')
    {
      if (req.session.bookFilter.status === 'available')
      {
        where.BorrowerId = null;
        where.ReserverId = null;
      }
      else if (req.session.bookFilter.status === 'borrowed')
      {
        where.BorrowerId = { [Op.ne]: null };
      }
      else if (req.session.bookFilter.status === 'reserved')
      {
        where.BorrowerId = { [Op.ne]: null };
        where.ReserverId = { [Op.ne]: null };
      }
    }

    let queries = {};

    if (Object.keys(where).length !== 0)
    {
      queries.where = where;
    }
    if (order.length !== 0)
    {
      queries.order = order;
    }


    if (Object.keys(queries).length === 0)
    {
      bookList = await db.Book.findAll();
    }
    else
    {
      bookList = await db.Book.findAll(queries);
    }

    res.render('adminBooks', {bookList: bookList, userId: req.user.dataValues.id, user: req.user, filter: req.session.bookFilter, categories: db.Book.CATEGORIES });
  }
  catch (e) {

  }
});

const bookFilterSchema = Joi.object({
  category: Joi.string().valid(...db.Book.CATEGORIES),
  status: Joi.string().valid('', 'available', 'borrowed', 'reserved')
});

router.post('/bookFilter', function(req, res, next) {
  if (bookFilterSchema.validate(req.body))
  {
    req.session.bookFilter = req.body;
  }

  res.redirect('/books');
});

router.get('/bookOrder', function(req, res, next) {
  if (req.session.bookOrder === req.query.order)
  {
    if (req.session.bookOrderReverse)
    {
      req.session.bookOrderReverse = false;
    }
    else
    {
      req.session.bookOrderReverse = true;
    }
  }
  else
  {
    req.session.bookOrder = req.query.order;
    req.session.bookOrderReverse = false;
  }

  res.redirect('/books');
});


router.post('/editBook', async function(req, res, next) {
  try
  {
    let queries = [];

    Object.entries(req.body).forEach((input, i) => {
      let name = input[0];
      let value = input[1];

      if (value !== '')
      {
        if (name.slice(0, 2) === 'id')
        {
          queries.push([name.slice(2), {} ]);
        }
        else
        {
          name = name.split('_')[0];
          queries[queries.length-1][1][name] = value;
        }
      }
    });

    console.log(queries);

    queries.forEach((query, i) => {
      if (Object.entries(query[1]).length !== 0)
      {
        db.Book.update(
          query[1],
          {
            where: { id: query[0] }
          }
        )
      }
    });

    res.redirect('/books');
  }
  catch (e) {
    console.log(e);
  }
});


module.exports = router;

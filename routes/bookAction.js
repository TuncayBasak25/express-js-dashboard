var express = require('express');
var router = express.Router();

var db = require('../models/index');

var Joi = require('joi');

/* Enter login page. */
router.get('/*', async function(req, res, next) {
  try
  {
    const user = await db.User.findOne({ where: {sessionId: req.session.id } });
    const book = await db.Book.findOne( { where: { id: req.query.bookId } });

    if (!user || !book)
    {
      res.redirect('/');
    }

    book.setBorrower(user);

    res.redirect('/books');

    next(user, book);
  }
  catch (e) {
    console.log(e);
  }
});

// if (await
// {
//   await user.removeBook(book);
// }
// else if (await book.getUser())
// {
//   let date = new Date();
//   await book.update({ reservationDate: date.toLocaleDateString() })
// }
// else
// {
//   await user.addBook(book);
// }



module.exports = router;

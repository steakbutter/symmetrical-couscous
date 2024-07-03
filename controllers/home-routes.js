const router = require('express').Router();
const { Transaction, User } = require('../models');
const withAuth = require('../utils/auth');

// GET login route


router.get('/', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Transaction }],
      });
  
      const user = userData.get({ plain: true });

      res.render('homepage', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/income', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Transaction }],
      });
  
      const user = userData.get({ plain: true });
     
      res.render('income', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/expense', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Transaction }],
      });

      const user = userData.get({ plain: true });
     
      res.render('expenses', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;

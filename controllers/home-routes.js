const router = require('express').Router();
const { Transaction, User } = require('../models');
const withAuth = require('../utils/auth');

// GET login route

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
});

router.get('/', async (req, res) => {
        try {
            // Get all projects and JOIN with user data
            const transactionData = await Transaction.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                ],
            });

            // Serialize data so the template can read it
            const transactions = transactionData.map((transaction) => transaction.get({ plain: true }));
            console.log(transactions);
            // Pass serialized data and session flag into template
            res.render('homepage', {
                transactions,
                logged_in: req.session.logged_in
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);













module.exports = router;
const router = require('express').Router();
// Import models
const { Transaction, User} = require('../../models');
const withAuth = require('../../utils/auth');

// ERASE AT THE END

router.get('/', async (req, res) => {
    try {
        const transactionData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Transaction }],
          });
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//////////////////
// get one transaction

router.get('/:id', async (req, res) => {
    try {
        const transactionData = await Transaction.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        if (!transactionData) {
            res.status(400).json({ message: 'No trasnsaction found with that id.'});
            return;
        };
        
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500) 
    }
});

// Create a transaction 

router.post('/', withAuth, async (req, res) => {
    try{
        const newTransaction = await Transaction.create({
            ...req.body, 
            user_id: req.session.user_id,
        });
        res.status(200).json(newTransaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a transaction
router.put('/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.update({
            type: req.body.type,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date
        },
        {
            where: {
                id:req.params.id
            },
        }
    );
    res.status(200).json(transactionData)
    } catch (error) {
        res.status(400).json(error)
    }
});

// Delete a transaction
router.delete('/:id', withAuth, async (req, res) => {
    
    try {
        const transactionData = await Transaction.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
       
        if (!transactionData) {
            res.status(400).json({ message: 'No transaction found with that id.'});
            return;
        }

        res.status(200).json(transactionData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;

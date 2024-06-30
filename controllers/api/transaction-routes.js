const router = require('express').Router();
// Import models
const { Transaction, User} = require('../../models');

// get all transactions

router.get('/', async (req, res) => {
    try {
        const transactionData = await Transaction.findAll({
            include: [{ model: User }],
        });
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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

router.post('/', async (req, res) => {
    try{
        const transactionData = await Transaction.create(req.body);
        res.status(200).json(transactionData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a transaction
router.put('/:id', async (req, res) => {
    try {
        const transactionData = await Transaction.update({
            type: req.body.type,
            amount: req.body.amount,
            commentary: req.body.commentary,
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
router.delete('/:id', async (req, res) => {
    try {
        const transactionData = await Transaction.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!transactionData) {
            res.status(400).json({ message: 'No transaction found with that id.'});
            return;
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

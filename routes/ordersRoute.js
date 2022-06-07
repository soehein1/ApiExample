const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    
    res.send('all orders')
});
router.get('/:id', (req, res) => {
    res.send('got order no, ' + req.params.id)
});
router.post('/', (req, res) => {
    res.send('order created')
});
router.put('/:id', (req, res) => {
    res.send('order no, ' + req.params.id + ' is updated')
});
module.exports = router;
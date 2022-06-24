const {createItem} = require('./sold_items.controller');

const router = require("express").Router();

router.post('/createItem', createItem);

module.exports = router;

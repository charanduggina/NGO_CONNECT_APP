const express = require('express');
const router = express.Router();

// import controller
const { requireSignin,isAuth, adminMiddleware } = require('../controllers/auth');
const { read, update,purchaseHistory,userById } = require('../controllers/user');

router.get('/user/:id',  read);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);
router.get('/orders/by/user/:userId', requireSignin,isAuth, purchaseHistory);
router.param("userId", userById);
module.exports = router;

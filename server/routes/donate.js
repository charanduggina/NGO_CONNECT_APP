const express = require("express");
const router = express.Router();

const {
    ngoById,
    
} = require("../controllers/ngo");
const {donateobject, donateamount, listOrders} = require("../controllers/donate");
const { requireSignin, isAuth, adminMiddleware,isAdmin } = require("../controllers/auth");
const { userById ,addamountOrderToUserHistory,addobjectOrderToUserHistory } = require("../controllers/user");



router.post("/donate/object",addobjectOrderToUserHistory ,donateobject);
router.post("/donate/money",addamountOrderToUserHistory ,donateamount);
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);
router.param("userId", userById);
router.param("ngoId", ngoById);

module.exports = router;
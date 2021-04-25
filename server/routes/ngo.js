const express = require("express");
const router = express.Router();

const {
    create,
    ngoById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    photo,
    schedule_photo,
    certficate_photo,
    listSearch,
    listBySearch,
    RateNgo
} = require("../controllers/ngo");
const { requireSignin, isAuth, adminMiddleware,isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/ngo/:ngoId", read);
router.post("/ngo/create/:userId", requireSignin, isAuth, isAdmin,create); 
router.post("/ngo/rate", RateNgo); //method name--create. called in "controllers"
router.delete("/ngo/:ngoId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/ngo/:ngoId/:userId", requireSignin, isAuth, isAdmin, update);

router.get("/ngos", list);    //returns all ngos pressent
router.get("/ngos/search", listSearch);
router.get("/ngos/related/:ngoId", listRelated);
router.get("/ngos/categories", listCategories); //tells kaunse categories ke ngos present hain
router.post("/ngos/by/search", listBySearch);
router.get("/ngo/photo/:ngoId", photo);
router.get("/ngo/schedule_photo/:ngoId", schedule_photo);
router.get("/ngo/certficate_photo/:ngoId", certficate_photo);

router.param("userId", userById);
router.param("ngoId", ngoById);

module.exports = router;

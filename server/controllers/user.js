const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const DonateList = require('../models/donateList');
const Ngo = require('../models/ngo');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {     //for CRUD ops
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

exports.addamountOrderToUserHistory = (req, res, next) => {
    let history = [];

        history.push({
            _id:  req.body.ngoId,
            name: req.body.name,
            transaction_id: req.body.transactionId,
            amount: req.body.donateamount
        });
   

    User.findOneAndUpdate({ _id: req.body.userId}, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.addobjectOrderToUserHistory = (req, res, next) => {
    let history = [];

        history.push({
            _id:  req.body.ngoId,
            name: req.body.name,
            objects:  req.body.donateobjects
        });

    User.findOneAndUpdate({ _id: req.body.userId }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    DonateList.find({ donarId: req.profile._id })
        .populate('donarId', '_id name')
        .populate('recieverId', '_id name ')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

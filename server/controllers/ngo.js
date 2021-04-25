const formidable = require('formidable');   //form-data use karne hetu
const _ = require('lodash');
const fs = require('fs');   //filesystem
const Ngo = require('../models/ngo');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.ngoById = (req, res, next, id) => {     //for CRUD ops
    Ngo.findById(id)
        .populate('category')
        .exec((err, ngo) => {
            if (err || !ngo) {
                return res.status(400).json({
                    error: 'ngo not found'
                });
            }
            req.ngo = ngo; 
            console.log("ngo id is",req.ngo.id) //if a ngos found
            next();
        });
};

exports.read = (req, res) => {
    req.ngo.photo = undefined;
    req.ngo.certficate_photo = undefined;
    req.ngo.schedule_photo = undefined;  //photo baad mein bhejenge dusre method se
    return res.json(req.ngo);
};

exports.create = (req, res) => {    //this time cant just take i/p from req.body bec we also have imgs... so use FORM DATA
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        //check for all fields.checks whether all fields have been given as i/p
        const { name, location, description, category,phone } = fields;

        if (!name || !location || !description || !category ||!phone) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }


        let ngo = new Ngo(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {

            if (files.photo.size > 2000000) {       //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            ngo.photo.data = fs.readFileSync(files.photo.path);
            ngo.photo.contentType = files.photo.type;
        }
        
        if (files.certficate_photo) {

            if (files.certficate_photo.size > 2000000) {       //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            ngo.certficate_photo.data = fs.readFileSync(files.certficate_photo.path);
            ngo.certficate_photo.contentType = files.certficate_photo.type;
        }
        
        if (files.schedule_photo) {

            if (files.schedule_photo.size > 2000000) {       //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            ngo.schedule_photo.data = fs.readFileSync(files.schedule_photo.path);
            ngo.schedule_photo.contentType = files.schedule_photo.type;
        }

        ngo.save((err, result) => {
            if (err) {
                console.log('NGO CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let ngo = req.ngo;
    ngo.remove((err, deletedNgo) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'ngo deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        //check for all fields.checks whether all fields have been given as i/p
        // const { name, location, description, category,phone } = fields;
        //
        // if (!name || !location || !description || !category ||!phone) {
        //     return res.status(400).json({
        //         error: 'All fields are required'
        //     });
        // }

        let ngo = req.ngo;
        ngo = _.extend(ngo, fields);    //extend comes wit lodash


        if (files.photo) {
            if (files.photo.size > 2000000) {
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            ngo.photo.data = fs.readFileSync(files.photo.path);
            ngo.photo.contentType = files.photo.type;
        }
        if (files.certficate_photo) {

            if (files.certficate_photo.size > 2000000) {       //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            ngo.certficate_photo.data = fs.readFileSync(files.certficate_photo.path);
            ngo.certficate_photo.contentType = files.certficate_photo.type;
        }
        
        if (files.schedule_photo) {

            if (files.schedule_photo.size > 2000000) {       //>1MB, error msg
                return res.status(400).json({
                    error: 'Image should be less than 2mb in size'
                });
            }
            ngo.schedule_photo.data = fs.readFileSync(files.schedule_photo.path);
            ngo.schedule_photo.contentType = files.schedule_photo.type;
        }

        ngo.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; //getting order from route parameter given OTHERWISE ascending by defalut
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';   //--do-- koi query aa rha to theek, varna defult wala use karlo
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;    //MAX 3 NGOS RETURNED AT A TIME.
    Ngo.find()      //from DB
         .select('-photo') 
         .select('-schedule_photo')
         .select('-certficate_photo')   
         .populate('category')
         .sort([[sortBy, order]])    //array of arrays
        .limit(limit)
        .exec((err, ngos) => {
            if (err) {
                return res.status(400).json({
                    error: 'ngos not found'
                });
            }
            res.json(ngos);
        });
};
exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the ngo based on query object with 2 properties
        // search and category
        Ngo.find(query, (err, ngos) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(ngos);
        }).select('-photo') .select('-schedule_photo')
        .select('-certficate_photo');
    }
};

exports.listRelated = (req, res) => {       //related ngos(of SAME CATEGORY) displayed.other than self.
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Ngo.find({ _id: { $ne: req.ngo }, category: req.ngo.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, ngos) => {
            if (err) {
                return res.status(400).json({
                    error: 'ngos not found'
                });
            }
            res.json(ngos);
        });
};

exports.listCategories = (req, res) => {        //returns all categories IDs present
    Ngo.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    });
};


/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

 exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Ngo.find(findArgs)
        .select('-photo')
        .select('-schedule_photo')
        .select('-certficate_photo')  
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ngo not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
exports.photo = (req, res, next) => {   //response not JSON. jpg/pdf etc content-type hoga.
    if (req.ngo.photo.data) {
        res.set('Content-Type', req.ngo.photo.contentType);
        return res.send(req.ngo.photo.data);
    }
    next();
};
exports.schedule_photo = (req, res, next) => {   //response not JSON. jpg/pdf etc content-type hoga.
    if (req.ngo.schedule_photo.data) {
        res.set('Content-Type', req.ngo.schedule_photo.contentType);
        return res.send(req.ngo.schedule_photo.data);
    }
    next();
};
exports.certficate_photo = (req, res, next) => {   //response not JSON. jpg/pdf etc content-type hoga.
    if (req.ngo.certficate_photo.data) {
        res.set('Content-Type', req.ngo.certficate_photo.contentType);
        return res.send(req.ngo.certficate_photo.data);
    }
    next();
};

exports.RateNgo= (req, res) => {
   
   console.log(req.body);

   const ngo = new Ngo({
    rating: req.body.rating,
    count : req.body.count
  });
  Ngo.findByIdAndUpdate({_id: req.body.ngoId},{rating: req.body.rating,count :req.body.count} ).then(
    () => {
      res.status(201).json({
        message: 'Rating updated successfully!'
      });
    }
  ).catch(
    (error) => {
        console.log(error)
      res.status(400).json({
        error: error
      });
    }
  );

  
};

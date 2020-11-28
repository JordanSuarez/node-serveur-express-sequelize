const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = require('../nodemon.json')

function register(req, res) {
    // Check if email already exist before register user
    models.User.findOne({where: {email: req.body.email}}).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already exist",
            }) 
        } else {
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(req.body.password, salt, (err, hash) => {
                    const user = {
                        email: req.body.email,
                        password: hash,
                    };
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User saved successfully",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        })
                    })
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        })
    });
}

function login(req, res) {
    models.User.findOne({where: {email: req.body.email}}).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Invalid credentials",
            })
        } else {
            bcryptjs.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, ACCESS_TOKEN_SECRET.env.JWT_KEY, (err, token) => {
                        res.status(200).json({
                            message: "Authentication successful",
                            token: token
                        })
                    })
                } else {
                    res.status(401).json({
                        message: "Invalid credentials",
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        })
    });
}

function show(req, res) {
   const id = req.params.id;

    models.User.findByPk(id).then(result => {
        if (result) {
            res.status(200).json({
                email: result.email,
                username: result.username,
                imageUrl: result.imageUrl,
            }) 
        } else {
            res.status(500).json({
                message: "User not found",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        })
    })
}

// TODO don't return user password
function index(req, res) {
     models.User.findAll().then(result => {
        res.status(200).json(result)
     }).catch(error => {
         res.status(500).json({
             message: "Something went wrong",
         })
     })
 }

 function update(req, res) {
   const id = req.params.id;

    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            const updatedUser = {
                email: req.body.email,
                username: req.body.username,
                imageUrl: req.body.imageUrl,
                password: hash,
            };
            models.User.update(updatedUser, {where: {id: id}}).then(result => {
                res.status(200).json({
                    message: "User updated successfully",
                    user: {
                        email: updatedUser.email,
                        username: updatedUser.username,
                        imageUrl: updatedUser.imageUrl
                    }
                })
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                })
            })
        })
    })
   
}

function destroy(req, res) {
    const id = req.params.id;

    models.User.destroy({where: {id: id}}).then(result => {
        res.status(200).json({
            message: "User deleted successfully",
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

module.exports = {
    register: register,
    login: login,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
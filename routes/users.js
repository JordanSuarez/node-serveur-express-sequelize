const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuthMiddleware =  require('../middleware/check-auth')

const router = express.Router();

router.post('/new', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.show);
router.get('/', userController.index)
router.patch('/:id/edit', checkAuthMiddleware.checkAuth,userController.update)
router.delete('/:id/delete', checkAuthMiddleware.checkAuth,userController.destroy)

module.exports = router;
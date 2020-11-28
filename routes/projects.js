const express = require('express');
const projectController = require('../controllers/project.controller');
const checkAuthMiddleware =  require('../middleware/check-auth')

const router = express.Router();

router.get('/:id', projectController.show);
router.get('/', projectController.index)
// Added middleware for routes needed authentication to access
router.post('/new', checkAuthMiddleware.checkAuth,projectController.save);
router.patch('/:id/edit', checkAuthMiddleware.checkAuth,projectController.update)
router.delete('/:id/delete', checkAuthMiddleware.checkAuth,projectController.destroy)

module.exports = router;
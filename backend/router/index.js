const Router = require('express').Router;
const userController = require('../controllers/user.controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 16}),
    userController.registration
    );
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/books', userController.getAllBooks);
router.get(`/book/:id`, userController.getBook);
router.get('/comments', userController.getComments);
router.post('/addcomments', userController.addComment);
router.post('/deletecomments', userController.deleteComment);
router.post('/updatecomments', userController.updateComment);

module.exports = router;
var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const ensureUserIsAuthenticated = require('../middleware/ensureUserIsAuthenticated.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/article');
});

router.get('/article/add', ensureUserIsAuthenticated, articleController.renderAddForm);
router.post('/article/add', ensureUserIsAuthenticated, articleController.addArticle);

router.get('/article/', articleController.displayAll);
router.get('/article/:articleId', articleController.displayArticle);
router.get('/article/:articleId/edit', ensureUserIsAuthenticated, articleController.renderEditForm);
router.post('/article/:articleId/edit', ensureUserIsAuthenticated, articleController.updateArticle);
router.get('/article/:articleId/delete', ensureUserIsAuthenticated, articleController.deleteArticle);

router.post('/article/:articleId/comment/create', commentController.createComment);
router.post('/comment/:commentId/reply/create', commentController.addReply);

router.get('/register', userController.renderRegistrationForm);
router.post('/register', userController.register);
router.get('/login', userController.renderLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;

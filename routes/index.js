var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const ensureUserIsAuthenticated = require('../middleware/ensureUserIsAuthenticated.js');
const userHasRole = require('../middleware/userHasRole.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/article');
});

router.get('/article/add', ensureUserIsAuthenticated, userHasRole, articleController.renderAddForm);
router.post('/article/add', ensureUserIsAuthenticated, userHasRole, articleController.addArticle);

router.get('/article/', articleController.displayAll);
router.get('/article/:articleId', articleController.displayArticle);
router.get('/article/:articleId/edit', ensureUserIsAuthenticated, userHasRole, articleController.renderEditForm);
router.post('/article/:articleId/edit', ensureUserIsAuthenticated, userHasRole, articleController.updateArticle);
router.get('/article/:articleId/delete', ensureUserIsAuthenticated, articleController.deleteArticle);

router.post('/article/:articleId/comment/create', commentController.createComment);
router.post('/comment/:commentId/reply/create', commentController.addReply);

router.get('/register', userController.renderRegistrationForm);
router.post('/register', userController.register);
router.get('/login', userController.renderLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/comment/:commentId/delete', ensureUserIsAuthenticated, userHasRole('admin'), commentController.deleteComment);
router.get('/comment/:commentId/reply/:replyId/delete', ensureUserIsAuthenticated, userHasRole('admin'), commentController.deleteReply);

module.exports = router;

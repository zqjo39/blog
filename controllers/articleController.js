const {Article, Comment, Reply} = require('../models');

module.exports.renderAddForm = function(req, res) {
    const article = {
        title: '',
        intro: '',
        image_url: '',
        body: ''
    };
    res.render('articles/add', {article});
};

module.exports.addArticle = async function(req, res) {
    const article = await Article.create({
        title: req.body.title,
        intro: req.body.intro,
        image_url: req.body.image_url,
        body: req.body.body,
        author_id: 1, // todo get logged in user
        published_on: new Date()
    });
    res.redirect('/') // todo change the redirect to view all once made
};

module.exports.displayArticle = async function(req, res) {
    const article = await Article.findByPk(req.params.articleId, {
        include: [
            'author',
            {
                model: Comment,
                as: 'comments',
                required: false,
                include: [{
                    model: Reply,
                    as: 'replies',
                    required: false
                }]
            }
        ],
        order: [
            ['comments', 'commented_on', 'desc']
        ]
    });
    res.render('articles/view', {article});
};

module.exports.displayAll = async function(req, res) {
    const articles = await Article.findAll({
        include: ['author']
    });
    res.render('articles/viewAll', {articles});
};

module.exports.renderEditForm = async function(req, res) {
    const article = await Article.findByPk(req.params.articleId);
    res.render('articles/edit', {article});``
};

module.exports.updateArticle = async function(req, res) {
    await Article.update({
        title: req.body.title,
        intro: req.body.intro,
        image_url: req.body.image_url,
        body: req.body.body,
    }, {
        where: {
            id: req.params.articleId
        }
    });
    res.redirect(`/article/${req.params.articleId}`);
};

module.exports.deleteArticle = async function(req, res) {
    await Article.destroy({
        where: {
            id: req.params.articleId
        }
    });
    res.redirect('/')
};
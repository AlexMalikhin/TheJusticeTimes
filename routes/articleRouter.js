const Router = require("express");
const router = new Router();
const controller = require("../controllers/articleController");

router.post('/createArticle', controller.createArticle)
router.get('/getAllArticles', controller.getAllArticles)
router.post('/getMyArticles', controller.getMyArticles)
router.get('/getPopularArticle', controller.getPopularArticle)
router.post('/viewArticle', controller.viewArticle)

module.exports = router
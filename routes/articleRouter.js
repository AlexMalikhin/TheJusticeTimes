const Router = require('express')
const router = new Router()
const controller = require('../controllers/articleController')
const authMiddleware = require('../middlewares/authMiddleWare')

router.post(
  '/createArticle',
  authMiddleware.authenticateToken,
  controller.createArticle
)
router.get('/getAllArticles', controller.getAllArticles)
router.get(
  '/getMyArticles',
  authMiddleware.authenticateToken,
  controller.getMyArticles
)
router.get('/getPopularArticle', controller.getPopularArticle)
router.post('/viewArticle', controller.viewArticle)

module.exports = router

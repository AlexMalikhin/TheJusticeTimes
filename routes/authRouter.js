const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');


router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.post('/getData', controller.getUserData)
router.post('/updateUser', controller.updateUserData)
router.post('/createArticle', controller.createArticle)
router.get('/getAllArticles', controller.getAllArticles)
router.post('/getMyArticles', controller.getMyArticles)
router.get('/getPopularArticle', controller.getPopularArticle)
router.post('/viewArticle', controller.viewArticle)

module.exports = router
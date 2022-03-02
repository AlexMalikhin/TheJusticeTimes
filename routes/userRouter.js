const Router = require("express");
const router = new Router();
const controller = require('../controllers/userController')

router.post('/getUserData', controller.getUserData)
router.post('/updateUser', controller.updateUserData)

module.exports = router
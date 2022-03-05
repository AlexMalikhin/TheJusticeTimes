const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const authMiddleWare = require('../middlewares/authMiddleWare')

router.get(
  '/getUserData',
  authMiddleWare.authenticateToken,
  controller.getUserData
)
router.post(
  '/updateUser',
  authMiddleWare.authenticateToken,
  controller.updateUserData
)

module.exports = router

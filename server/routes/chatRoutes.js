import express from 'express'
import { protect} from "../middlewares/authMiddleware.js"
import { getConversation, sendMessage} from '../controllers/conversation.controller.js'
const router = express.Router()
router.route('/send-message/:id').post(protect,sendMessage)
router.route('/get-conversation/:id').get(protect,getConversation)
export default router;
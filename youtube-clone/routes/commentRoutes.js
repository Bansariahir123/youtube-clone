// routes/commentRoutes.js
import express from 'express';
import { addComment, getCommentsByVideoId, updateComment, deleteComment } from '../controllers/commentController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', auth, addComment);
router.get('/:videoId', getCommentsByVideoId);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);
export default router;

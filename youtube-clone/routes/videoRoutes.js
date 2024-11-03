// routes/videoRoutes.js
import express from 'express';
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo, likeVideo, dislikeVideo, searchVideos  } from '../controllers/videoController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createVideo);
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.put('/:id', auth, updateVideo);
router.delete('/:id', auth, deleteVideo);

// Like and dislike routes (protected)
router.post('/:id/like', auth, likeVideo);
router.post('/:id/dislike', auth, dislikeVideo);
router.get('/search', searchVideos);
export default router;

// routes/channelRoutes.js
import express from 'express';
import {getChannelById, getChannels, subscribeToChannel, unsubscribeFromChannel,updateChannelById } from '../controllers/channelController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();
// Get a specific channel by ID
router.get('/:id', getChannelById);
// Get all channels
router.get('/', getChannels);
// Subscribe to a channel
router.post('/:id/subscribe', auth, subscribeToChannel);
// Unsubscribe from a channel
router.post('/:id/unsubscribe', auth, unsubscribeFromChannel);
// Update channel by ID
router.put('/:id', auth, updateChannelById);
export default router;




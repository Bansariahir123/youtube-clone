// controllers/commentController.js
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

// Add a comment to a video
export const addComment = async (req, res) => {
    try {
        const { text, videoId } = req.body;
        const newComment = new Comment({
            text,
            userId: req.user.userId,
            videoId,
        });
        const comment = await newComment.save();
        
        // Add the comment to the video
        await Video.findByIdAndUpdate(videoId, { $push: { comments: comment._id } });

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get comments for a video
export const getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId }).populate('userId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment || comment.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this comment' });
        }
        comment.text = req.body.text;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment || comment.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
        await comment.deleteOne();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

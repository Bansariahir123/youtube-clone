// models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
    timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;

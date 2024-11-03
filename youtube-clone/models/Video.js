// models/Video.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnailUrl: String,
    videoUrl: String,
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,default: [] }], // Array of user IDs who liked the video
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,default: [] }],
    // likes: { type: Number, default: 0 },
    // dislikes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    uploadDate: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', VideoSchema);
export default Video;

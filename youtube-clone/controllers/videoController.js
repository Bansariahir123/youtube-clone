// controllers/videoController.js
import Video from '../models/Video.js';
import Channel from '../models/Channel.js';
// Create a new video
export const createVideo = async (req, res) => {
    try {
        const { title, description, thumbnailUrl, videoUrl, channelId } = req.body;

        // Find the channel and check if the requesting user owns it
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }
        
        if (channel.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to upload to this channel' });
        }

        // Create and save the new video
        const newVideo = new Video({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            channelId,
            uploader: req.user.userId,
        });
        const video = await newVideo.save();

        // Update the channel’s list of videos
        channel.videos.push(video._id);
        await channel.save();

        res.status(201).json(video);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all videos
export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('uploader', 'username').populate('channelId', 'name');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single video
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('uploader', 'username').populate('channelId', 'name');
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a video
export const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video || video.uploader.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this video' });
        }
        Object.assign(video, req.body);
        await video.save();
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a video

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        
        // Check if video or uploader is missing
        if (!video || !video.uploader || video.uploader.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this video' });
        }
        
        await video.deleteOne();
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Like a video
export const likeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        // Check if the user already liked the video
        if (!video.likes.includes(req.user.userId)) {
            // Add user to likes and remove from dislikes 
            video.likes.push(req.user.userId);
            video.dislikes = video.dislikes.filter(userId => userId.toString() !== req.user.userId);
            await video.save();
            res.status(200).json({ message: 'Video liked' });
        } else {
            res.status(400).json({ message: 'Video already liked' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dislike a video
export const dislikeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        // Check if the user already disliked the video
        if (!video.dislikes.includes(req.user.userId)) {
            // Add user to dislikes and remove from likes
            video.dislikes.push(req.user.userId);
            video.likes = video.likes.filter(userId => userId.toString() !== req.user.userId);
            await video.save();
            res.status(200).json({ message: 'Video disliked' });
        } else {
            res.status(400).json({ message: 'Video already disliked' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const searchVideos = async (req, res) => {
    try {
        const query = req.query.q || ""; // Get the search query from the request
        const videos = await Video.find({ 
            title: { $regex: query, $options: "i" } // Case-insensitive search
        }).populate('uploader', 'username').populate('channelId', 'name');
        
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

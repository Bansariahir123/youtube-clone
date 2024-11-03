
// controllers/channelController.js
import Channel from '../models/Channel.js';
import User from '../models/User.js';


// Get a specific channel by ID
export const getChannelById = async (req, res) => {
    const { id } = req.params;

    try {
        const channel = await Channel.findById(id).populate('owner', 'username').populate('videos');
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }
        res.json(channel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all channels
export const getChannels = async (req, res) => {
    try {
        const channels = await Channel.find().populate('owner', 'username');
        res.json(channels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update a channel by ID
export const updateChannelById = async (req, res) => {
    const { id } = req.params;
    const { name, description, channelBanner } = req.body;

    try {
        // Find the channel by ID and update with the provided data
        const channel = await Channel.findByIdAndUpdate(
            id,
            { name, description, channelBanner },
            { new: true, runValidators: true }
        );

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        res.status(200).json({ message: 'Channel updated successfully', channel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Subscribe to a channel
export const subscribeToChannel = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // User ID from the auth middleware

    try {
        const channel = await Channel.findById(id);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Add the channel to the user's subscriptions
        await User.findByIdAndUpdate(userId, { $addToSet: { subscriptions: channel._id } });
        channel.subscribers += 1;
        await channel.save();

        res.status(200).json({ message: 'Subscribed successfully', channel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unsubscribe from a channel
export const unsubscribeFromChannel = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // User ID from the auth middleware

    try {
        const channel = await Channel.findById(id);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Remove the channel from the user's subscriptions
        await User.findByIdAndUpdate(userId, { $pull: { subscriptions: channel._id } });
        channel.subscribers = Math.max(0, channel.subscribers - 1); // Prevent negative subscribers
        await channel.save();

        res.status(200).json({ message: 'Unsubscribed successfully', channel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


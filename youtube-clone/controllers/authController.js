// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Channel from '../models/Channel.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        
        // Save the user
        await user.save();

        // Automatically create a channel for the user
        const channel = new Channel({
            name: `${username}'s Channel`,
            owner: user._id,
            description: "Welcome to my channel!",
            channelBanner: "", // Default banner or image URL
        });

        await channel.save();

        // Add the created channel to the user's channels list
        user.channels.push(channel._id);
        await user.save();

        res.status(201).json({ message: 'User registered successfully', channel });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('channels');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
           // Get the channel ID 
           const channelId = user.channels.length > 0 ? user.channels[0]._id : null;

        
        res.json({ token, userId: user._id, channelId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// controllers/authController.js
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('channels' ,'subscriptions');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const { password, ...userData } = user._doc; 
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

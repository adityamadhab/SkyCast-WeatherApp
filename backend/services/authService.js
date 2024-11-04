const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

class AuthService {
  async register(userData) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = new User(userData);
      await user.save();

      const token = this.generateToken(user._id);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken(user._id);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  generateToken(userId) {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });
  }

  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      Object.keys(updates).forEach(update => {
        user[update] = updates[update];
      });

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
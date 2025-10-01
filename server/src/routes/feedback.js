import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send feedback/help request
router.post('/sendFeedback', protect, async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: 'Email and message are required' });
    }

    // TODO: Burada email gönderme servisi veya veritabanına kaydetme yapılabilir
    // Şimdilik sadece success response dönüyoruz
    console.log('Feedback received:', { email, message, userId: req.user?.id });

    res.status(200).json({ 
      message: 'Your feedback has been received. Thank you!',
      success: true 
    });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ message: 'Failed to send feedback', error: error.message });
  }
});

export default router;

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/feedback/sendFeedback
router.post('/sendFeedback', protect, async (req, res) => {
  try {
    const { email, message } = req.body;
    const userId = req.user?.id;

    if (!email || !message) {
      return res.status(400).json({ 
        message: 'Email and message are required' 
      });
    }

    // Log the feedback (production'da database'e kaydet veya email gönder)
    console.log('📧 Feedback received:');
    console.log('User ID:', userId);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('---');

    // TODO: Production'da:
    // 1. Database'e kaydet (Feedback model oluştur)
    // 2. Admin'e email gönder
    // 3. Slack/Discord notification gönder

    res.status(200).json({ 
      success: true,
      message: 'Feedback received successfully. Thank you!' 
    });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ 
      message: 'Failed to send feedback. Please try again later.' 
    });
  }
});

export default router;

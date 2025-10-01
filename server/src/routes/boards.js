import { Router } from 'express';
import mongoose from 'mongoose';
import Board from '../models/Board.js';
// import auth from '../middleware/auth.js';

const router = Router();

const DEFAULT_BG = { min: '', desktop: '', tablet: '', mobile: '' };
const isObj = (v) => v !== null && typeof v === 'object';
const normalizeBg = (bg) => {
  if (!isObj(bg)) return DEFAULT_BG;
  return {
    min: typeof bg.min === 'string' ? bg.min : '',
    desktop: typeof bg.desktop === 'string' ? bg.desktop : '',
    tablet: typeof bg.tablet === 'string' ? bg.tablet : '',
    mobile: typeof bg.mobile === 'string' ? bg.mobile : '',
  };
};

// CREATE  POST /api/boards
router.post('/', /*auth,*/ async (req, res) => {
  try {
    const { title, icon, background } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ message: 'Title min 3 characters' });
    }

    const doc = await Board.create({
      title: title.trim(),
      icon: typeof icon === 'string' ? icon : '#icon-Project',
      background: normalizeBg(background),
      ...(req.user?.id ? { owner: req.user.id } : {}),
    });

    return res.status(201).json(doc);
  } catch (err) {
    console.error('POST /api/boards error:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

// LIST   GET /api/boards
router.get('/', /*auth,*/ async (_req, res) => {
  try {
    const list = await Board.find().sort({ createdAt: -1 }).lean();
    return res.json(list);
  } catch (err) {
    console.error('GET /api/boards error:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

// READ   GET /api/boards/:id
router.get('/:id', /*auth,*/ async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid board id' });
    }
    const board = await Board.findById(id).lean();
    if (!board) return res.status(404).json({ message: 'Board not found' });
    return res.json(board);
  } catch (err) {
    console.error('GET /api/boards/:id error:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

// UPDATE PUT /api/boards/:id
router.put('/:id', /*auth,*/ async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, background } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid board id' });
    }
    if (title && (typeof title !== 'string' || title.trim().length < 3)) {
      return res.status(400).json({ message: 'Title min 3 characters' });
    }

    const update = {};
    if (typeof title === 'string') update.title = title.trim();
    if (typeof icon === 'string') update.icon = icon;
    if (background !== undefined) update.background = normalizeBg(background);

    const updated = await Board.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return res.status(404).json({ message: 'Board not found' });
    return res.json(updated);
  } catch (err) {
    console.error('PUT /api/boards/:id error:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

// DELETE DELETE /api/boards/:id
router.delete('/:id', /*auth,*/ async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid board id' });
    }
    const deleted = await Board.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: 'Board not found' });
    return res.json({ message: 'Board deleted', id });
  } catch (err) {
    console.error('DELETE /api/boards/:id error:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

export default router;

import mongoose from 'mongoose';

const backgroundSchema = new mongoose.Schema(
  {
    min: { type: String, default: '' },
    desktop: { type: String, default: '' },
    tablet: { type: String, default: '' },
    mobile: { type: String, default: '' },
  },
  { _id: false }
);

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    icon: { type: String, default: '#icon-Project' },
    background: { type: backgroundSchema, default: () => ({}) }, // ← önemli
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

export default mongoose.model('Board', boardSchema);

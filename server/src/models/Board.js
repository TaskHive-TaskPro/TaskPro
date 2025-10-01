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

const columnSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
  },
  { _id: false }
);

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    icon: { type: String, default: '#icon-Project' },
    background: { type: backgroundSchema, default: () => ({}) },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    columns: { type: [columnSchema], default: () => [
      { _id: 'todo', title: 'To do' },
      { _id: 'inprogress', title: 'In progress' },
      { _id: 'done', title: 'Done' }
    ]},
  },
  { timestamps: true }
);

export default mongoose.model('Board', boardSchema);

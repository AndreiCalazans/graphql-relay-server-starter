import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  title: {
    type: String,
    description: 'Title for the link',
    required: true,
  },
  url: {
    type: String,
    description: 'Url to the link',
    required: true,
  },
  createdAt: {
    type: Date,
    description: 'Date of creation',
    required: true,
  },
});

export const Link = mongoose.model('Link', Schema);


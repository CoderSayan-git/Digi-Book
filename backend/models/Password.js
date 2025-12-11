const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const passwordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  url: {
    type: String,
    trim: true,
    maxlength: [500, 'URL cannot exceed 500 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
passwordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Only encrypt if password field is modified
  if (this.isModified('password')) {
    try {
      this.password = encrypt(this.password);
    } catch (error) {
      return next(error);
    }
  }
  
  next();
});

// Decrypt password after finding
passwordSchema.post('find', function(docs) {
  if (docs && docs.length > 0) {
    docs.forEach(doc => {
      if (doc.password) {
        try {
          doc.password = decrypt(doc.password);
        } catch (error) {
          console.error('Decryption error for document:', doc._id);
        }
      }
    });
  }
});

// Decrypt password after findOne
passwordSchema.post('findOne', function(doc) {
  if (doc && doc.password) {
    try {
      doc.password = decrypt(doc.password);
    } catch (error) {
      console.error('Decryption error for document:', doc._id);
    }
  }
});

// Decrypt password after findOneAndUpdate
passwordSchema.post('findOneAndUpdate', function(doc) {
  if (doc && doc.password) {
    try {
      doc.password = decrypt(doc.password);
    } catch (error) {
      console.error('Decryption error for document:', doc._id);
    }
  }
});

module.exports = mongoose.model('Password', passwordSchema);

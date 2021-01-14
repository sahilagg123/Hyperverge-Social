const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  Dob:{
    type:String
  },
  Bio:{
      type: String
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
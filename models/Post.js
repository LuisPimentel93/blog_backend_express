const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      
    },
}, {
  timestamps: true
})





module.exports = mongoose.model('POST', postSchema)
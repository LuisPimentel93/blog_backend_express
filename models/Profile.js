const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 4,
      max: 15,
      unique: true

    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
     

    }
   
}, {
  timestamps: true
})

profileSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password",) || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

const secret = 'wdibwehrbvwkbefhbwhefbhvwbefhbvh2efbjnvbwefjbv'
profileSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (isMatch) {
        jwt.sign({username,id:profileSchema._id}, secret, {}, (err,tokem))
            if(err) throw err;
            res.json(token)
    } else {
      callback(null, error)
    }
  })
}



module.exports = mongoose.model('Profile', profileSchema)
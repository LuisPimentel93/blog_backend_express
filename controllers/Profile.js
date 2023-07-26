const router = require('express').Router()
const Profile = require('../models/Profile')
const bcrypt = require('bcryptjs');
const secret = 'wdibwehrbvwkbefhbwhefbhvwbefhbvh2efbjnvbwefjbv'
const jwt = require('jsonwebtoken')




router.get('/', async (req, res) => {
  try {
      const people = await Profile.find()
      res.json(people)
      
  } catch (error) {
      console.log('error retreiving profile:', error)
      res.json({ message: 'error retreving profile' })
      
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
      const profile = await Profile.findById(id)
      res.json(profile)

  } catch (error) {
      console.log('error retreiving profile:', error)
      res.status(404).json({ message: `error retreiving profile with id ${id}` })
  }
})

router.post('/', async (req, res) => {
  try {
      const user = await new Profile(req.body).save()
      res.json({ 'message': 'Profile created' })

  } catch (error) {
      console.log('error creating profile:', error)
      res.status(500).json({ message: 'error creating profile' })
  }
  
})

router.post('/login', async (req, res) => {
    const { username, password} = req.body;
    const profiles = await Profile.findOne({ username: `${username}`});;
    const passOk = bcrypt.compareSync(password, profiles.password)
    console.log(profiles)
    if(passOk){
      jwt.sign({username,id:profiles._id}, secret, {}, (err,token) => {
          if(err) throw err;
          
          res.cookie('token', token).json('ok')
          
      })
    }else{
      res.status(400).json('Wrong Credentials')
    }
  })
    
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.image) req.body.image = undefined;
    await Profile.findByIdAndUpdate(id, req.body);
    res.status(204).json({ message: 'Profile updated' });
  } catch (error) {
    console.log('error updating Profile:', error);
    res.json({ message: 'error updating Profile' });
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.status(204).json({ message: 'profile deleted' });
  } catch (error) {
    console.log('error deleting Profile:', error);
    res.json({ message: 'error deleting Profile' });
  }
})

module.exports = router
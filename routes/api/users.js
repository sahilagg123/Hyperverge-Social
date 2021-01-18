const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
router.post('/follow', auth, async (req, res) => {
  const { sender_id } = req.body;
  try {
    console.log(req.user.id);
    const user = await User.findById(req.user.id);
    comsole.log(user);
    const friend = user.friends.find(id => {
      return id === sender_id;
    });

    user.friends.push(sender_id);
    await user.save();
    res.send('Followed');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/unfollow', auth, async (req, res) => {
  const { sender_id } = req.body;
  try {
    const user = await User.findOne({
      user: req.user.id,
    });
    const friend = user.friends.find(id => {
      return id === sender_id;
    });

    friend !== null &&
      (user.friends = user.friends.filter(item => item !== value));
  } catch (error) {
    res.status(500).send('Server error');
  }
});
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

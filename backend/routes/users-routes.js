const express = require('express');
const { check } = require('express-validator');
const multer=require("multer");

const usersController = require('../controllers/users-controllers');
// const fileUpload=require("../middleware/file-upload");

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  upload.single("image"),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;

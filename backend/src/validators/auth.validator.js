import { body, validationResult } from 'express-validator'

export const registerValidator = [
  body('email')
    .trim()
    .exists()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Enter valid email'),
  body('name')
    .exists()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be the length below 50'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be string')
    .trim()
    .isLength({ min: 6 })
    .withMessage('The length of the password must be 6'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid request',
        errors: errors.array()
      })
    }

    next()
  }
]

export const loginValidator = [
  body('email')
    .exists()
    .withMessage('Email is requried')
    .bail()
    .isString()
    .withMessage('Email must be in string format')
    .bail()
    .isEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be string')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be min 6'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid age',
        errors: errors.array()
      })
    }
    next()
  }
]

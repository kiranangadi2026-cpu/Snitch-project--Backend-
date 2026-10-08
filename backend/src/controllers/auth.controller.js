import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken
} from '../utils/auth.utils.js'

export async function register (req, res) {
  const { email, name, password } = req.body

  const userExits = userModel.findOne({
    email
  })

  if (userExits) {
    return res.status(400).json({
      message: 'USer already exists',
      errors: [
        {
          path: 'email',
          message: 'User has already registered using this email'
        }
      ]
    })
  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12)
  })

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role
  })

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true
  })

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken
  })

  res.status(201).json({
    message: 'user registerd successfully',
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id
      },
      accessToken
    }
  })
}

export async function login (req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).json({
      message: 'Invalid email or password'
    })
  }

  const isPasswordValid = bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'Invalid password or email'
    })
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role
  })

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  })

  await userModel.findOneAndUpdate(
    {
      email
    },
    {
      refreshToken
    }
  )

  res.status(200).json({
    message: 'USer logged in successfully',
    data: {
      id: user._id,
      email: user.email,
      name: user.name
    },
    accessToken
  })
}

export async function refresh (req, res) {
  const refreshToken = req.copkies.refreshToken

  if (!refreshToken) {
    return res.status(400).json({
      message: 'Refresh Token is required'
    })
  }

  try {
    const decoded = readRefreshToken(refreshToken)

    const { userId, role } = decoded

    const user = await userModel.findById(userId)

    if (refreshToken != user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null
      })

      return res.status(401).json({
        message: 'Refresh Token missmatch'
      })
    }

    const accessToken = createAccessToken({
      userId,
      role
    })

    const newRefreshToken = createRefreshToken({
      userId,
      role
    })

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true
    })

    res.status(401).json({
      message: 'Token rotated successfully',
      data: {
        user: {
          email: user.email,
          name: user.name,
          userId: user._id
        },
        accessToken
      }
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid refresh Token'
    })
  }
}

export async function getMe (req, res) {
  const { userId, role } = req.user

  const user = await userModel.findById(userId)

  res.status(200).json({
    message: 'USer data fetched successfully',
    data: {
      user: {
        email: user.email,
        name: user.name,
        userId: user._id
      }
    }
  })
}

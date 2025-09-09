import { StatusCodes } from 'http-status-codes'
import { pickUser } from '~/utils/formatters'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'

const Datastore = require('nedb-promises')
const UserDB = Datastore.create('src/database/users.json')
const TwoFactorSecretKeyDB = Datastore.create('src/database/2fa_secret_keys.json')
const UserSessionDB = Datastore.create('src/database/user_sessions.json')

const SERVICE_NAME = '2FA-ideft'

const login = async (req, res) => {
  try {
    const user = await UserDB.findOne({ email: req.body.email })

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' })
      return
    }
    if (user.password !== req.body.password) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Wrong password!' })
      return
    }

    let resUser = pickUser(user)
    const newUserSession = await UserSessionDB.insert({
      user_id: user._id,
      device_id: req.headers['user-agent'],
      is_2fa_verified: false,
      last_login: new Date().valueOf()
    })
    resUser['is_2fa_verified'] = newUserSession.is_2fa_verified
    resUser['last_login'] = newUserSession.last_login

    res.status(StatusCodes.OK).json(resUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await UserDB.findOne({ _id: req.params.id })
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' })
      return
    }

    let resUser = pickUser(user)
    if (user.require_2fa) {
      const currentUserSession = await UserSessionDB.findOne({
        user_id: user._id,
        device_id: req.headers['user-agent']
      })
      resUser['is_2fa_verified'] = currentUserSession ? currentUserSession.is_2fa_verified : null
      resUser['last_login'] = currentUserSession ? currentUserSession.last_login : null
    }

    res.status(StatusCodes.OK).json(resUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    const user = await UserDB.findOne({ _id: req.params.id })
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' })
      return
    }
    await UserSessionDB.deleteOne({
      user_id: user._id,
      device_id: req.headers['user-agent']
    })
    UserSessionDB.compactDatafileAsync()

    res.status(StatusCodes.OK).json({ loggedOut: true })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const get2FA_QCode = async (req, res) => {
  try {
    const user = await UserDB.findOne({ _id: req.params.id })
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' })
      return
    }

    let twoFactorSecretKeyValue = null

    const twoFactorSecretKey = await TwoFactorSecretKeyDB.findOne({ user_id: user._id })
    if (!twoFactorSecretKey) {
      const newTwoFactorSecretKey = await TwoFactorSecretKeyDB.insert({
        user_id: user._id,
        value: authenticator.generateSecret()
      })
      twoFactorSecretKeyValue = newTwoFactorSecretKey.value
    } else {
      twoFactorSecretKeyValue = twoFactorSecretKey.value
    }

    const otpAuthToken = authenticator.keyuri(
      user.username,
      SERVICE_NAME,
      twoFactorSecretKeyValue
    )

    const QRCodeImage = await QRCode.toDataURL(otpAuthToken)

    res.status(StatusCodes.OK).json({ qrcode: QRCodeImage })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const setup2FA = async (req, res) => {
  try {
    const user = await UserDB.findOne({ _id: req.params.id })
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' })
      return
    }
    const twoFactorSecretKey = await TwoFactorSecretKeyDB.findOne({ user_id: user._id })
    if (!twoFactorSecretKey) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Two-Factor secret key not found!' })
      return
    }

    const clientOtpToken = req.body.otpToken
    if (!clientOtpToken) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'OTP token not found!' })
      return
    }
    const isValid = authenticator.verify({
      token: clientOtpToken,
      secret: twoFactorSecretKey.value
    })
    if (!isValid) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Invalid OTP token!' })
      return
    }

    const updatedUser = await UserDB.update(
      { _id: user._id },
      { $set:{ require_2fa: true } },
      { returnUpdatedDocs: true }
    )
    UserDB.compactDatafileAsync()

    const updatedUserSession = await UserSessionDB.update(
      { user_id: user._id, device_id: req.headers['user-agent'] },
      { $set:{ is_2fa_verified: true } },
      { returnUpdatedDocs: true }
    )
    UserSessionDB.compactDatafileAsync()

    res.status(StatusCodes.OK).json({
      ...pickUser(updatedUser),
      is_2fa_verified: updatedUserSession.is_2fa_verified,
      last_login: updatedUserSession.last_login
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const verify2FA = async (req, res) => {
  try {
    const user = await UserDB.findOne({ _id: req.params.id })
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' })
      return
    }
    const twoFactorSecretKey = await TwoFactorSecretKeyDB.findOne({ user_id: user._id })
    if (!twoFactorSecretKey) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Two-Factor secret key not found!' })
      return
    }

    const clientOtpToken = req.body.otpToken
    if (!clientOtpToken) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'OTP token not found!' })
      return
    }
    const isValid = authenticator.verify({
      token: clientOtpToken,
      secret: twoFactorSecretKey.value
    })
    if (!isValid) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Invalid OTP token!' })
      return
    }

    const updatedUserSession = await UserSessionDB.update(
      { user_id: user._id, device_id: req.headers['user-agent'] },
      { $set:{ is_2fa_verified: true } },
      { returnUpdatedDocs: true }
    )
    UserSessionDB.compactDatafileAsync()

    res.status(StatusCodes.OK).json({
      ...pickUser(user),
      is_2fa_verified: updatedUserSession.is_2fa_verified,
      last_login: updatedUserSession.last_login
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  login,
  getUser,
  logout,
  get2FA_QCode,
  setup2FA,
  verify2FA
}

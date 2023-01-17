import saveToDatabase from '../utils/saveToDatabase.js'
import DB from './db.json' assert { type: 'json' }

const getAllUsers = () => {
  try {
    return DB.users
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const getOneUser = (userId) => {
  const isNotFound =
    DB.users.findIndex((user) => user.id === userId) === -1

  if (isNotFound) {
    throw {
      status: 404,
      message: `User width id '${userId}' not found`,
    }
  }

  try {
    return DB.users.find((user) => user.id === userId)
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const createNewUser = (newUser) => {
  const isAlreadyAdded =
    DB.users.findIndex((user) => user.email === newUser.email) > -1

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `User with email '${newUser.email}' already exists`,
    }
  }

  try {
    DB.users.push(newUser)
    saveToDatabase(DB)
    return newUser
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const updateOneUser = (userId, changes) => {
  const userIndex = DB.users.findIndex((user) => user.email === newUser.email)

  if (userIndex === -1) {
    throw {
      status: 404,
      message: `User width id '${userId}' not found`,
    }
  }

  try {
    const updatedUser = {
      ...DB.users[userIndex],
      ...changes,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    }
  
    DB.users[userIndex] = updatedUser
    saveToDatabase(DB)
    return updatedUser
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const deleteOneUser = (userId) => {
  const userIndex = DB.users.findIndex((user) => user.id === userId)

  if (userIndex === -1) {
    throw {
      status: 404,
      message: `User width id '${userId}' not found`,
    }
  }

  try {
    DB.users.splice(userIndex, 1)
    saveToDatabase(DB)
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

export default {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
}

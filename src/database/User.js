import saveToDatabase from '../utils/saveToDatabase.js'
import DB from './db.json' assert { type: 'json' }

const getAllUsers = () => {
  return DB.users
}

const getOneUser = (userId) => {
  return DB.users.find((user) => user.id === userId)
}

const createNewUser = (newUser) => {
  const isAlreadyAdded =
    DB.users.findIndex((user) => user.email === newUser.email) > -1

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `User with email '${newUser.email}' already exists`
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
  const userIndex = DB.users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return

  const updatedUser = {
    ...DB.users[userIndex],
    ...changes,
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  }

  DB.users[userIndex] = updatedUser
  saveToDatabase(DB)
  return updatedUser
}

const deleteOneUser = (userId) => {
  const userIndex = DB.users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return
  
  DB.users.splice(userIndex, 1)
  saveToDatabase(DB)
}

export default {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
}

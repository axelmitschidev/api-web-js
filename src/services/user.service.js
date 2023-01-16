import { v4 as uuid } from 'uuid'
import User from '../database/User.js'

const getAllUsers = () => {
  return User.getAllUsers()
}

const getOneUser = (userId) => {
  return User.getOneUser(userId)
}

const createNewUser = (newUser) => {
  const userToInsert = {
    ...newUser,
    id: uuid(),
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  }
  
  try {
    return User.createNewUser(userToInsert)
  } catch (error) {
    throw error
  }
}

const updateOneUser = (userId, changes) => {
  return User.updateOneUser(userId, changes)
}

const deleteOneUser = (userId) => {
  return User.deleteOneUser(userId)
}

export default {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
}

import { v4 as uuid } from 'uuid'
import User from '../database/User.js'

const getAllUsers = () => {
  try {
    return User.getAllUsers()
  } catch (error) {
    throw error
  }
}

const getOneUser = (userId) => {
  try {
    return User.getOneUser(userId)
  } catch (error) {
    throw error
  }
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
  try {
    return User.updateOneUser(userId, changes)
  } catch (error) {
    throw error
  }
}

const deleteOneUser = (userId) => {
  try {
    return User.deleteOneUser(userId)
  } catch (error) {
    throw error
  }
}

export default {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
}

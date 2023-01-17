import userService from '../services/user.service.js'

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers()

  try {
    res.json({ status: 'OK', data: users })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneUser = (req, res) => {
  const { userId } = req.params

  try {
    const user = userService.getOneUser(userId)
    res.json({ status: 'OK', data: user })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewUser = (req, res) => {
  const { body } = req

  if (!body.firstname || !body.lastname || !body.email || !body.password)
    return res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body:\
           'firstname' 'lastname' 'email' 'password'",
      },
    })

  const newUser = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
  }

  try {
    const createdUser = userService.createNewUser(newUser)
    res.status(201).json({ status: 'OK', data: createdUser })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneUser = (req, res) => {
  const {
    params: { userId },
    body,
  } = req

  try {
    const updatedUser = userService.updateOneUser(userId, body)
    res.json({ status: 'OK', data: updatedUser })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneUser = (req, res) => {
  const { userId } = req.params

  try {
    deleteOneUser(userId)
    res.status(204).json({ status: 'OK' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser }

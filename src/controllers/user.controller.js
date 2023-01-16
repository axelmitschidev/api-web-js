import userService from '../services/user.service.js'

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers()

  res.json({ status: 'OK', data: users })
}

const getOneUser = (req, res) => {
  const { userId } = req.params

  if (!userId) return

  const user = userService.getOneUser(userId)

  res.json({ status: 'OK', data: user })
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
    res.status(error?.status || 500).json({ status: 'FAILED', data: { error: error?.message || error } })
  }
} 

const updateOneUser = (req, res) => {
  const {
    params: { userId },
    body,
  } = req

  if (!userId) return

  const updatedUser = userService.updateOneUser(userId, body)

  res.json({ status: 'OK', data: updatedUser })
}

const deleteOneUser = (req, res) => {
  const { userId } = req.params

  if (!userId) return

  deleteOneUser(userId)

  res.status(204).json({ status: 'OK' })
}

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser }

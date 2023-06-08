const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAllUsers = catchError(async(req, res) => {
    const users = await User.findAll(); 
    return res.json(users)
});

const createUser = catchError(async(req, res) => {
    const user = req.body
    const create = await User.create(user)
    return res.status(201).json(create)
});

const getUser = catchError(async(req, res) => {
    const { id } = req.params
    const getUserById = await User.findByPk(id)
    if(!getUserById) return res.status(404).json({message:"user not exists"})
    return res.json(getUserById)
});

const deleteUser = catchError(async(req, res) => {
    const { id } = req.params
    const deleteUserById = await User.destroy({ where: { id }})
    if(!deleteUserById) return res.status(404).json({message:"user not exists"})
    else return res.send(204);
});

const updateUser = catchError(async(req, res) => {
    const { id } = req.params
    const user = req.body
    const updateUserById = await User.update(user, { where: { id }, returning: true})
    if(updateUserById[0] === 0) return res.status(404).json({message:"user not exists"})
    return res.json(updateUserById[1][0])
});

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser
}
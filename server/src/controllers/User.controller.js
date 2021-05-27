import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import UserModel from '../models/User.model.js';
import StatusCode from '../configurations/StatusCode.js'

/* TODO: remove error logs */

const createUser = async (request, response) => {
    try {
        const BCRYPT_SALT_ROUND = 12
        const hashedPassword = await bcrypt.hash(request.body.password, BCRYPT_SALT_ROUND)

        const user = new UserModel({
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            schoolclass: request.body.schoolclass,
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        })

        const databaseResponse = await user.save()
        response.status(StatusCode.CREATED).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const getUser = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find({ _id: request.params.userId }).populate('loans')
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const getUsers = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find()
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const updateUser = async (request, response) => {

    const data = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        schoolclass: request.body.schoolclass,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    }

    try {
        if (!request.body.username || !request.body.password) {
            return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values not allowed.' })
        }
        const databaseResponse = await UserModel.findByIdAndUpdate(request.params.userId, data, { new: true, useFindAndModify: false })
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const loginUser = async (request, response, next) => {
    passport.authenticate('login', (error, users, info) => {
        /* 	if (err) { console.error(`error ${err}`) } */
        if (info !== undefined) {
            info.message === 'bad username'
                ? response.status(StatusCode.UNAUTHORIZED).send(info.message)
                : response.status(StatusCode.FORBIDDEN).send(info.message)
        } else {
            request.logIn(users, () => {
                UserModel.findOne({ username: request.body.username })
                    .then(user => {
                        const token = jwt.sign({ id: user._id }, 'jwtSecret.secret', { expiresIn: 60 * 60 })
                        response.status(200).send({
                            authenticated: true,
                            token,
                            username: user.username,
                            id: user._id,
                        })
                    })
            })
        }
    })(request, response, next)
}

const queryUser = async (request, response) => {
    try {
        const databaseResponse = await UserModel.find({ username: request.query.username })
        databaseResponse.length !== 0 ?
            response.status(StatusCode.OK).send(databaseResponse)
            :
            response.status(StatusCode.NOT_FOUND).send({ message: `Could not find ${request.query.username}` })
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }

}

const deleteUser = async (request, response) => {
    try {
        const databaseResponse = await UserModel.findByIdAndDelete(request.params.userId, { useFindAndModify: false })
        response.status(StatusCode.OK).send({ message: `User with name ${databaseResponse.username} deleted.` })
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: `Error occured when trying to delete user with ID: ${request.params.userId}.` })

    }
}

export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    loginUser,
    queryUser,
    deleteUser
}
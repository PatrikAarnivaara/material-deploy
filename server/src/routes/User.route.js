import UserController from '../controllers/User.controller.js';

const routes = server => {
    server.get('/users', UserController.getUsers);
    server.post('/user', UserController.createUser);
    server.get('/user/:userId', UserController.getUser)
    server.put('/user/:userId', UserController.updateUser)
    server.post('/user/login', UserController.loginUser)
    server.delete('/user/:userId', UserController.deleteUser)
    server.get('/search/user', UserController.queryUser)
    server.post('/forgotpassword', UserController.forgotPassword)
    server.put('/updatepassword', UserController.updatePassword)
    server.put('/resetpassword', UserController.resetPassword)
}

export default { routes }
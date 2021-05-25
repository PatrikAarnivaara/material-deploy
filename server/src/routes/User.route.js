import UserController from '../controllers/User.controller.js';

const routes = server => {
    server.post('/user', UserController.createUser);
    server.get('/users', UserController.getUsers);
    server.get('/user/:userId', UserController.getUser)
    server.put('/user/:userId', UserController.updateUser)
    server.post('/user/login', UserController.loginUser)
    server.delete('/user/:userId', UserController.deleteUser)
    server.get('/search/user', UserController.queryUser)
}

export default { routes }
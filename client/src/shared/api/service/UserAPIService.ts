import { RegisterUserProps } from '../../types/RegisterUserProps'
import { LoginCredentials } from '../../types/AuthenticationProps'
import http from '../UserAPI';

const getUser = (userId: string) => {
	return http.get(`/user/${userId}`)
}

const getUsers = () => {
	return http.get('/users');
};

const createUser = (userdata?: RegisterUserProps) => {
	return http.post('/user', userdata)
}
/* TODO: add specific route etc to edit password and username */
/* Make object instead of all parameters */
const editUser = (userId: string, firstName: string, lastName: string, schoolclass: string, email: string, username: string, password: string) => {
	return http.put(`/user/${userId}`, { _id: userId, firstname: firstName, lastname: lastName, schoolclass: schoolclass, email: email, username: username, password: password })

}

const deleteUser = (userId: string) => {
	http.delete(`/user/${userId}`)
}

// -> Authentications below <-

const loginUser = (credentials: LoginCredentials) => {
	return http.post('/user/login', credentials)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUsers, getUser, editUser, deleteUser, createUser, loginUser };

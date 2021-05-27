import Chai from 'chai';
import ChaiHTTP from 'chai-http';
import { describe, it as test } from 'mocha';
import server from '../index.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(3)

const testingNonExistingRoute = () => {
    test('expecting 404 not found.', done => {
        Chai.request(server)
            .get(`/${randomString}`)
            .end((request, response) => {
                response.should.have.a.status(404)
                done()
            })
    })
}

const getUsers = () => {
    test('Fetch(GET) all users from database', done => {
        Chai.request(server)
            .get('/users')
            .end((request, response) => {
                response.should.have.a.status(200)
                response.body.should.be.a('array')
                response.body.length.should.be.eq(response.body.length)
                done()
            })
    })
}

const createUser = () => {
    const mockData = {
        firstname: randomString,
        lastname: randomString,
        schoolclass: 'ee22b',
        username: randomString,
        email: `${randomString}@mail.com`,
        password: randomString,
    }

    test('Create(POST) method for user entity', done => {
        Chai.request(server)
            .post('/user')
            .send(mockData)
            .end((request, response) => {
                response.should.have.a.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('loans')
                response.body.should.have.property('firstname').eql(mockData.firstname)
                response.body.should.have.property('lastname').eql(mockData.lastname)
                response.body.should.have.property('schoolclass').eql(mockData.schoolclass)
                response.body.should.have.property('username').eql(mockData.username)
                response.body.should.have.property('email').eql(mockData.email)
                response.body.should.have.property('password')
                response.body.should.have.property('createdAt')
                response.body.should.have.property('updatedAt')
                done()
            })
    })
}

describe('TESTING USER API ROUTE, FETCH USER AND CREATE USER', () => {
    getUsers();
    createUser();
    testingNonExistingRoute();
})
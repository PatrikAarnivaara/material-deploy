import Chai from 'chai';
import ChaiHTTP from 'chai-http';
import { describe, it as test } from 'mocha';
import server from '../Server.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)

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
        username: randomString,
        password: randomString
    }

    test('Create(POST) method for user entity', done => {
        Chai.request(server)
            .post('/user')
            .send(mockData)
            .end((request, response) => {
                response.should.have.a.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('username').eq(mockData.username)
                response.body.should.have.property('password').eq(mockData.password)
                done()
            })
    })
}

/* WRITE TEST FOR UPDATING USER */

describe('TESTING USER API ROUTE, FETCH USER AND CREATE USER', () => {
    testingNonExistingRoute();
    getUsers();
    createUser();
})
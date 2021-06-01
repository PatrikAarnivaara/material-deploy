import Chai from 'chai';
import ChaiHTTP from 'chai-http';
import { describe, it as test } from 'mocha';
import server from '../index.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)
const longRandomString = Math.random().toString(36).substring(0)

const createEquipment = () => {

    const mockData = {
        title: randomString,
        description: longRandomString,
        brand: randomString,
        serialnumber: longRandomString,
        category: randomString
    }

    test('Create(POST) method for equipment entity', done => {
        Chai.request(server)
            .post('/equipment')
            .send(mockData)
            .end((request, response) => {
                response.should.have.a.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('title').eql(mockData.title)
                response.body.should.have.property('description').eql(mockData.description)
                response.body.should.have.property('brand').eql(mockData.brand)
                response.body.should.have.property('serialnumber').eql(mockData.serialnumber)
                response.body.should.have.property('category').eql(mockData.category)
                done()
            })
    })
}

const updateEquipment = () => {

    const mockData = {
        title: randomString,
        description: `description${randomString}`,
        brand: randomString,
        serialnumber: `123${randomString}456`,
        category: randomString
    }

    test('Create(PUT) method for equipment entity', done => {
        Chai.request(server)
            .put('/equipment/60a22f288093f7ab779b0839')
            .send(mockData)
            .end((request, response) => {
                response.should.have.a.status(200)
                done();
            })
    })
}

describe('TESTING EQUIPMENT API ROUTE, CREATE AND UPDATE EQUIPMENT', () => {
    createEquipment()
    updateEquipment()
})
import Chai from 'chai';
import ChaiHTTP from 'chai-http';
import { describe, it as test } from 'mocha';
import server from '../index.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)

const createEquipment = () => {
    const mockData = {
        title: randomString,
        description: `description${randomString}`,
        brand: randomString,
        serialnumber: `12345678${randomString}`,
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
                response.body.should.have.property('title').eq(mockData.title)
                response.body.should.have.property('description').eq(mockData.description)
                response.body.should.have.property('brand').eq(mockData.brand)
                response.body.should.have.property('serialnumber').eq(mockData.serialnumber)
                response.body.should.have.property('category').eq(mockData.category)
                done()
            })
    })
}

describe('TESTING EQUIPMENT API ROUTE, CREATE', () => {
    createEquipment()
})
const notFound = (request, response, next) => {
    const error = new Error(`Not Found: ${request.originalUrl}`);
    response.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    const statuscode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statuscode)
    res.json({
        statuscode: statuscode,
        message: error.message,
        stacktrace: ENVIROMENT === 'PRODUCTION' ? null : error.stack,
    })
}

const checkToken = (request, response, next) => {
    const header = request.headers['authorization']
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ')
        const token = bearer[1]
        request.token = token
        next()
    } else {
        response.sendStatus(403)
    }
}

export default {
    notFound,
    errorHandler,
    checkToken
}
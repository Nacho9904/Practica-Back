/* MongoExpressReactNode */

/* Common JS */
const express = require('express')
const morgan = require('morgan')


const server = express()

//MiddleWare//
server.use(express.json())
server.use(morgan('tiny'))


server.get('/api',(req , res) => {
    console.log('Hola mundo desde get')
    res.send('Hola cliente')
} )


server.post('/api/users', (req , res)=> {
    console.log(req.body)
    const { body } = req;
    res.statusCode = 201
    body.password = '-------'
    res.json({
        message:'Usuario Creado Exitosamente',
        result: body,
    })})

server.put('/api/users', (req , res)=> {
    res.json({
        message:'PUT',
})})



server.delete('/api/users', (req , res)=> {
    res.json({
        message:'Delete',
})})



server.listen(3000, () => {
console.log('Servidor iniciado en http://localhost:3000')
})

// // Criando um server nativo com Node.js
// const http = require('node:http')

// const server = http.createServer((request, reply) =>{
//   reply.write('Hello World')
//   reply.end()
// })

// server.listen(3333).on('listening', () => {
//   console.log('HTTP server running')
// })

// const fastify = require('fastify')
// const crypto = require('crypto')

import { fastifySwagger } from '@fastify/swagger'
// import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-course.ts'
import { getCoursesRoute } from './src/routes/get-courses.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
  logger:{ 
    transport: {
      target:'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development'){
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  })

  server.register(scalarAPIReference, {
    routePrefix: '/docs',
  })
}

// server.register(fastifySwaggerUi,{
//   routePrefix: '/docs',
// })

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

// accessando uma rota para um curso com ID especifico

server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)

server.listen({port: 3333}).then(() => {
  console.log('HTTP server running')
})

// return reply é utilizado para que a API retorne uma resposta e não transmita 
// mais nada que esteja abaixo dela

//typescript converte o código para JS
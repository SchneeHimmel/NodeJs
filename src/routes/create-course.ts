import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { checkRequestJwt } from './hooks/check-request-jwt.ts'
import { checkUserRole } from './hooks/check-user-role.ts'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses',{
    preHandler: [
      checkRequestJwt,
      checkUserRole('manager'),
    ],
    schema: {
      tags: ['courses'],
      summary: 'Create a course',
      description: 'Essa rota recebe um título e cria um curso no banco de dados',
      body: z.object({
        title: z.string().min(5, 'Título precisa ter 5 caracteres'),
      }),
      response: {
        201: z.object({ courseId: z.uuid() }).describe('Curso criado.')
      }
    },
}, async (request, reply) => {

  const courseTitle = request.body.title // pegando o titulo do curso pelo corpo da requisição
  
  
  const result = await db
    .insert(courses)
    .values({title: courseTitle})
    .returning()

  // retornar um objeto das rotas
  return reply.status(201).send({courseId: result[0].id}) 
})
}
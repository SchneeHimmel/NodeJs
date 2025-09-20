import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthUser } from '../tests/factories/make-user.ts'

test('Get course by id', async () => {
  await server.ready()

  const {token} = await makeAuthUser('student')
  const course = await makeCourse()

  const response = await request(server.server)
  .get(`/courses/${course.id}`)
  .set('Authorization', token)

  expect(response.status).toEqual(200),
  expect(response.body).toEqual({
    course: {
      id : expect.any(String),
      title: expect.any(String),
      description: null,
    }
    
  })
  console.log(response.body)
})

test('return 404 for non existing courses', async () => {
  await server.ready()

  const {token} = await makeAuthUser('student')

  const response = await request(server.server)
    .get(`/courses/765736bf-eabe-4c34-a297-1165e6fdac9e`)
    .set('Authorization', token)

  expect(response.status).toEqual(404),
  console.log(response.body)
})
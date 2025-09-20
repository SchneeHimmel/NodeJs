import { faker }  from '@faker-js/faker'
import {db} from '../../database/client.ts'
import { courses } from '../../database/schema.ts'

// cria dados de cursos falsos no banco de dados para testes

export async function makeCourse(title?: string){
  const result = await db.insert(courses).values({
    title: title ?? faker.lorem.words(4),
  }).returning()

  return result [0]
}
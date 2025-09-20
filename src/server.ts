import { server } from "./app.ts"

server.listen({port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP server running')
})

// return reply é utilizado para que a API retorne uma resposta e não transmita 
// mais nada que esteja abaixo dela

//typescript converte o código para JS
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "API - Rotinas pessoais"
})

Route.post('/confirmarAniversariDani', 'VerifyConditionsController.confirmar')
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "API - Rotinas pessoais"
})

Route.post('/confirmarAniversariDani', 'ConfirmationNiverDaniController.confirmar')
Route.get('/confirmarAniversariDani', 'ConfirmationNiverDaniController.getInscritos')
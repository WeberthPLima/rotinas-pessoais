import Route from '@ioc:Adonis/Core/Route'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA'

Route.get('/', async () => {
  return "API - Rotinas pessoais"
})

Route.post('/confirmarAniversariDani', 'ConfirmationNiverDaniController.confirmar')
Route.get('/confirmarAniversariDani', 'ConfirmationNiverDaniController.getInscritos')
Route.get('/teste', async () => {
  const controller = new BaterPontoNODATAController();
  return controller.getBaterPonto('07', '45');
});
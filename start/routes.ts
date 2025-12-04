import Route from '@ioc:Adonis/Core/Route'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA'

Route.get('/', async () => {
  return "API - Rotinas pessoais"
})

// Endpoint de teste que retorna boolean true
Route.get('/botao-igrejasnet', async () => {
  return true
})

Route.post('/confirmarAniversariDani', 'ConfirmationNiverDaniController.confirmar')
Route.get('/confirmarAniversariDani', 'ConfirmationNiverDaniController.getInscritos')
Route.post('/confirmarPresensaCasamento', 'ConfirmationCasamentoController.confirmar')
Route.get('/confirmados', 'ConfirmationCasamentoController.getInscritos')
Route.put('/confirmados/:id', 'ConfirmationCasamentoController.informarAdultos')
Route.put('/informaOriginConvidado/:id', 'ConfirmationCasamentoController.informaOriginConvidado')
Route.get('/mensagensCasamento', 'ConfirmationCasamentoController.mensagemcasamento')
Route.post('/mensagensCasamento', 'ConfirmationCasamentoController.enviarMensagemcasamento')
Route.get('/convert-base64', 'Base64Controller.convert')
Route.get('/teste', async () => {
  const controller = new BaterPontoNODATAController();
  return controller.getBaterPonto('07', '45');
});

// Rotas para Google Sheets API
Route.get('/getInfo/getMeses', 'GoogleSheetsController.getMeses')
Route.post('/getInfo/getData', 'GoogleSheetsController.getData')
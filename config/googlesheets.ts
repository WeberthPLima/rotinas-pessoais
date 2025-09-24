import Env from '@ioc:Adonis/Core/Env'

export default {
  /*
  |--------------------------------------------------------------------------
  | Google Sheets Configuration
  |--------------------------------------------------------------------------
  |
  | Configurações para integração com Google Sheets API
  |
  */
  
  // ID da planilha do Google Sheets
  spreadsheetId: Env.get('GOOGLE_SHEETS_SPREADSHEET_ID', '14vw4gUxD0Y1oxE4Fmq_ZuiVorkoH4HU-PgVVRHv5jQw'),
  
  // Credenciais da conta de serviço
  client_email: Env.get('GOOGLE_SHEETS_CLIENT_EMAIL', 'sheetsapi@healthy-catfish-375718.iam.gserviceaccount.com'),
  private_key: Env.get('GOOGLE_SHEETS_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
}
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import Config from '@ioc:Adonis/Core/Config'

export default class GoogleSheetsController {
  public async getMeses({ response }: HttpContextContract) {
    try {
      const config = Config.get('googlesheets')
      
      const doc = new GoogleSpreadsheet(config.spreadsheetId)
      
      // Autenticação usando service account
      await doc.useServiceAccountAuth({
        client_email: config.client_email,
        private_key: config.private_key,
      })

      await doc.loadInfo()

      const meses = doc.sheetsByIndex.map((sheet, index) => ({
        title: sheet.title,
        index: index,
      }))

      return response.json(meses)
    } catch (error) {
      console.error('Erro ao obter meses:', error)
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  public async getData({ request, response }: HttpContextContract) {
    try {
      const { mes } = request.only(['mes'])

      if (mes === undefined || mes === null) {
        return response.status(400).json({ error: 'Parâmetro "mes" é obrigatório' })
      }

      const config = Config.get('googlesheets')
      
      const doc = new GoogleSpreadsheet(config.spreadsheetId)
      
      // Autenticação usando service account
      await doc.useServiceAccountAuth({
        client_email: config.client_email,
        private_key: config.private_key,
      })

      await doc.loadInfo()

      const sheet = doc.sheetsByIndex[mes]
      if (!sheet) {
        return response.status(404).json({ error: 'Planilha não encontrada' })
      }

      const rows = await sheet.getRows()
      const data = rows.map((row) => row._rawData)

      return response.json(data)
    } catch (error) {
      console.error('Erro ao obter dados:', error)
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
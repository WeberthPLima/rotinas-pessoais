import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { bucket } from '../../../start/firebase'

export default class Base64Controller {
  public async convert({ request, response }: HttpContextContract) {
    try {
      const url = request.input('url')
      if (!url) return response.badRequest({ error: 'Parâmetro "url" é obrigatório' })

      // Extrai o path do arquivo da URL
      const match = url.match(/o\/(.+)\?/)
      if (!match) return response.badRequest({ error: 'URL inválida' })

      const filePath = decodeURIComponent(match[1])

      const file = bucket.file(filePath)
      const [buffer] = await file.download() // pega o conteúdo

      const base64 = buffer.toString('base64')
      // descobre o tipo pelo nome do arquivo
      const ext = filePath.split('.').pop() || 'jpeg'
      const dataUri = `data:image/${ext};base64,${base64}`

      return { base64: dataUri }
    } catch (err) {
      console.error(err)
      return response.status(500).send({ error: 'Erro ao buscar imagem no Firebase' })
    }
  }
}

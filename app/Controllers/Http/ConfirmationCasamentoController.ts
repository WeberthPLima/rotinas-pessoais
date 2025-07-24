import ListaCasamento from "App/Models/ListaCasamentoModell";
import MensagemCasamentosModell from "App/Models/MensagemCasamentosModell";

export default class ConfirmationCasamentoController {
  public async confirmar({ request, response }) {
    try {
      let body = request.only(['name', 'phone', 'companions']);

      if (body.phone) {
        body.phone = body.phone.replace(/\D/g, '');
      }

      if (body.phone.length != 11) {
        return response.status(400).json({
          status: false,
          msg: 'Telefone inválido!',
        });
      }

      if (!body.name || !body.phone) {
        return response.status(400).json({
          status: false,
          msg: 'Preencha todos os campos!',
        });
      }

      const verify = await ListaCasamento.query()
        .where('phone', body.phone)
        .first();
      if (verify) {
        return response.status(400).json({
          status: false,
          msg: `Você já confirmou 😉😜!`,
        });
      }

      const register = await ListaCasamento.create(body)

      return response.status(200).json({
        status: true,
        msg: 'Confirmação registrada com sucesso',
        register,
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        status: false,
        error,
      })
    }
  }
  public async enviarMensagemcasamento({ request, response }) {
    try {
      let body = request.only(['name', 'message']);

      if (!body.name || !body.message) {
        return response.status(400).json({
          status: false,
          msg: 'Preencha todos os campos!',
        });
      }

      const register = await MensagemCasamentosModell.create(body)

      return response.status(200).json({
        status: true,
        msg: 'Mensagem enviada com sucesso',
        register,
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        status: false,
        error,
      })
    }
  }
  public async mensagemcasamento({ response }) {
    try {

      const data = await MensagemCasamentosModell.query().orderBy('id', 'asc');

      return response.status(200).json({
        status: true,
        msg: 'Lista carregada com sucesso',
        data,
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        status: false,
        error,
      })
    }
  }
  public async getInscritos({ response }) {
    try {

      const data = await ListaCasamento.query().orderBy('id', 'desc');

      return response.status(200).json({
        status: true,
        msg: 'Lista carregada com sucesso',
        data,
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        status: false,
        error,
      })
    }
  }
  public async informarAdultos({ response, request, params }) {
    try {
      const lista = await ListaCasamento.findOrFail(params.id)

      let body = request.only(['adultos', 'criancas']);

      if (body.adultos < 0 || body.criancas < 0) {
        return response.status(400).json({
          status: false,
          msg: 'Valores inválidos!',
        });
      }
      const data = {
        adultos: body.adultos,
        criancas: body.criancas,
      };
      lista.merge(data)
      await lista.save()
      return response.ok(lista)
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        status: false,
        error,
      })
    }
  }
  public async informaOriginConvidado({ response, request, params }) {
    try {
      const lista = await ListaCasamento.findOrFail(params.id)

      let body = request.only(['origin']);

      const data = {
        origin: body.origin,
      };
      lista.merge(data)
      await lista.save()
      return response.ok(lista)
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        status: false,
        error,
      })
    }
  }
}
import ConfirmationNiverDaniModell from "App/Models/ConfirmationNiverDaniModell"

export default class VerifyConditionsController {
  public async confirmar({ request, response }) {
    try {
      let body = request.only(['name', 'telefone', 'qtdAdultos', 'qtdCrianca']);

      if (body.telefone) {
        body.telefone = body.telefone.replace(/\D/g, '');
      }

      if (body.telefone.length != 11) {
        return response.status(400).json({
          status: false,
          msg: 'Telefone inválido!',
        });
      }

      if (!body.name || !body.telefone || !body.qtdAdultos) {
        return response.status(400).json({
          status: false,
          msg: 'Preencha todos os campos!',
        });
      }

      const verify = await ConfirmationNiverDaniModell.query()
        .where('telefone', body.telefone)
        .first();
      if (verify) {
        return response.status(400).json({
          status: false,
          msg: `Você já confirmou 😉😜!`,
        });
      }

      const register = await ConfirmationNiverDaniModell.create(body)

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
  public async getInscritos({ response }) {
    try {

      const data = await ConfirmationNiverDaniModell.all();

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
}
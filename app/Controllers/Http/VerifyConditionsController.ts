import BaterPontoController from "../CronsJobs/baterPontoDecisao";

const yellow = '\x1b[33m%s\x1b[0m'; // Amarelo
const green = '\x1b[32m%s\x1b[0m'; // Verde

export default class VerifyConditionsController {
  public async verifyPonto(
    randomMinute,
    lastExecutionDate,
    hasExecutedTodayFn: () => boolean
  ) {
    const now = new Date();
    const currentMinute: number = now.getMinutes();
    const minuteAsString: string = currentMinute.toString();

    const dataComFuso = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const ano = dataComFuso.getFullYear();
    const mes = (dataComFuso.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataComFuso.getDate().toString().padStart(2, '0');
    const hora = dataComFuso.getHours().toString().padStart(2, '0');
    const sec = dataComFuso.getSeconds().toString().padStart(2, '0');

    console.log(yellow, `Minuto aleatório: `, randomMinute);
    console.log(`${dia}/${mes}/${ano} - ${hora}:${parseInt(minuteAsString, 10)}:${sec}`);

    let updatedLastExecutionDate: Date | null = lastExecutionDate;

    // Verifica se é o primeiro registro do dia
    if (parseInt(minuteAsString, 10) === randomMinute && !hasExecutedTodayFn()) {
      console.log(green, 'Registrando Ponto');
      const newDateNext = new Date(now);
      updatedLastExecutionDate = newDateNext;

      const addesksController = new BaterPontoController();
      await addesksController.getBaterPonto();

      // Atualiza o lastExecutionDate para garantir que só execute uma vez por dia
      return {
        lastExecutionDateReturn: updatedLastExecutionDate,
        numberGeneration: false, // Indica que o número já foi gerado e o ponto registrado
      };
    }

    // Se o ponto não foi registrado, mantém o estado
    return {
      lastExecutionDateReturn: updatedLastExecutionDate,
      numberGeneration: true,
    };
  }
}

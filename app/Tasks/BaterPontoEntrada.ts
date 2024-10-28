import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoEntrada extends BaseTask {
  public static get schedule() {
    return '47 10 * * 1-5'
  }

  public static get useLock() {
    return false
  }

  private generateRandomMinute(): number {
    return getRandomInt(16, 47);
  }

  public async handle() {
    const minutoAleatorio = this.generateRandomMinute();

    const addesksController = new BaterPontoNODATAController();
    await addesksController.getBaterPonto('07', minutoAleatorio);
  }
}

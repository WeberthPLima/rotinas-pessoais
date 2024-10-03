import VerifyConditionsController from 'App/Controllers/Http/VerifyConditionsController'
import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'

const red = '\x1b[31m%s\x1b[0m'; // Vermelho

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoEntrada extends BaseTask {
  private randomMinute: number = 0
  private lastExecutionDate: Date | null = null
  public numberGeneration = false

  public static get schedule() {
    return '24-42 10 * * 1-5'
  }

  public static get useLock() {
    return false
  }

  private generateRandomMinute(): number {
    return getRandomInt(25, 41);
  }

  private hasExecutedToday(): boolean {
    const now = new Date()
    return (
      this.lastExecutionDate ?
      now.getFullYear() === this.lastExecutionDate.getFullYear() &&
      now.getMonth() === this.lastExecutionDate.getMonth() &&
      now.getDate() === this.lastExecutionDate.getDate()
      : false
    )
  }

  public async handle() {
    if (!this.lastExecutionDate) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      this.lastExecutionDate = currentDate;
    }


    const verifyConditionsController = new VerifyConditionsController()
    const { lastExecutionDateReturn, numberGeneration } = await verifyConditionsController.verifyPonto(
      this.randomMinute,
      this.lastExecutionDate,
      this.hasExecutedToday.bind(this),
    );

    this.lastExecutionDate = lastExecutionDateReturn;
    this.numberGeneration = numberGeneration

    if (!this.numberGeneration && this.hasExecutedToday()) {
      this.randomMinute = this.generateRandomMinute()
      this.numberGeneration = true
      console.log(red, 'Gerando novo minuto aleatório: ', this.randomMinute)
    }
  }

}

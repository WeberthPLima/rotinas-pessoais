import VerifyConditionsController from 'App/Controllers/Http/VerifyConditionsController'
import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'

const red = '\x1b[31m%s\x1b[0m'; // Vermelho

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoEntrada extends BaseTask {
  private randomMinute: number = 0
  private lastExecutionDate: Date | null = null
  private isNumberRandom: boolean = false

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
    this.lastExecutionDate = (!this.lastExecutionDate || !this.isNumberRandom) ? new Date() : this.lastExecutionDate
    const now = new Date()
    return (
      now.getFullYear() === this.lastExecutionDate.getFullYear() &&
      now.getMonth() === this.lastExecutionDate.getMonth() &&
      now.getDate() === this.lastExecutionDate.getDate()
    )
  }

  public async handle() {
    const verifyConditionsController = new VerifyConditionsController()
    const { lastExecutionDateReturn, isNumberRandom } = await verifyConditionsController.verifyPonto(
      this.randomMinute,
      this.isNumberRandom,
      this.lastExecutionDate,
      this.hasExecutedToday.bind(this)
    );

    this.lastExecutionDate = lastExecutionDateReturn;
    this.isNumberRandom = isNumberRandom;

    if (!this.isNumberRandom && this.hasExecutedToday()) {
      this.randomMinute = this.generateRandomMinute()
      this.isNumberRandom = true
      console.log(red, 'Gerando novo minuto aleatório: ', this.randomMinute)
    }
  }

}

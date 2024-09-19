import BaterPontoController from 'App/Controllers/CronsJobs/baterPontoDecisao'
import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'


export default class BaterPontoEntrada extends BaseTask {
  private randomMinute: number = this.generateRandomMinute()
  private lastExecutionDate: Date | null = null // Armazena a última data de execução

  public static get schedule() {
    // return '*/05 * * * * 1-5'
    return '*/1 26-39 10 * * 1-5'
    // return '*/1 01-13 12 * * *'
    // return '*/1 02-19 13 * * *'
    // return '*/1 15-26 15 * * *'
  }

  public static get useLock() {
    return false
  }

  private generateRandomMinute(): number {
    return Math.floor(Math.random() * (39 - 26 + 1)) + 26;
  }

  private hasExecutedToday(): boolean {
    if (!this.lastExecutionDate) {
      return false
    }

    const now = new Date()
    return (
      now.getFullYear() === this.lastExecutionDate.getFullYear() &&
      now.getMonth() === this.lastExecutionDate.getMonth() &&
      now.getDate() === this.lastExecutionDate.getDate()
    )
  }

  public async handle() {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    if (currentHour === 10 && currentMinute === this.randomMinute && !this.hasExecutedToday()) {
      this.lastExecutionDate = now
      console.log(`Executando tarefa no minuto aleatório: ${this.randomMinute}`)
      const addesksController = new BaterPontoController()
      await addesksController.getBaterPonto()
    }

    if (currentMinute !== this.randomMinute && this.hasExecutedToday()) {
      this.randomMinute = this.generateRandomMinute()
      console.log(`Próximo minuto aleatório: ${this.randomMinute}`)
    }
  }
}

import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoEntrada extends BaseTask {
  private static randomMinute: number | null = null
  private static generatedDate: string | null = null

  public static get schedule() {
    return '05-32 10 * * 1-5' // Roda de 07:15 até 07:45
  }

  public static get useLock() {
    return true
  }

  private getTodayKey(): string {
    const today = new Date()
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  }

  public async handle() {
    const now = new Date()
    const currentMinute = now.getMinutes()
    const todayKey = this.getTodayKey()

    // Verifica se já foi gerado para hoje
    if (BaterPontoEntrada.generatedDate !== todayKey) {
      BaterPontoEntrada.randomMinute = getRandomInt(5, 32)
      BaterPontoEntrada.generatedDate = todayKey
      console.log(`[07] 🎲 Novo minuto aleatório do dia: ${BaterPontoEntrada.randomMinute}`)
    }

    if (currentMinute === BaterPontoEntrada.randomMinute) {
      const controller = new BaterPontoNODATAController()
      await controller.getBaterPonto('07', currentMinute)
      console.log(`✅ [07] Ponto batido às 07:${currentMinute}`)
    } else {
      console.log(`⏳ [07] Agora: ${currentMinute}, esperando: ${BaterPontoEntrada.randomMinute}`)
    }
  }
}

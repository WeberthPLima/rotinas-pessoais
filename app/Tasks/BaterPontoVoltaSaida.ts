import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoSaida extends BaseTask {
  private static randomMinute: number | null = null
  private static generatedDate: string | null = null

  public static get schedule() {
    return '15-32 20 * * 1-5' // Roda de 17:15 até 17:32
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
    if (BaterPontoSaida.generatedDate !== todayKey) {
      BaterPontoSaida.randomMinute = getRandomInt(15, 32)
      BaterPontoSaida.generatedDate = todayKey
      console.log(`[17] 🎲 Novo minuto aleatório do dia: ${BaterPontoSaida.randomMinute}`)
    }

    if (currentMinute === BaterPontoSaida.randomMinute) {
      const controller = new BaterPontoNODATAController()
      await controller.getBaterPonto('17', currentMinute)
      console.log(`✅ [17] Ponto batido às 17:${currentMinute}`)
    } else {
      console.log(`⏳ [17] Agora: ${currentMinute}, esperando: ${BaterPontoSaida.randomMinute}`)
    }
  }
}

import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoVoltaAlmoco extends BaseTask {
  private static randomMinute: number | null = null
  private static generatedDate: string | null = null

  public static get schedule() {
    return '10-28 16 * * 1-5' // Roda de 13:01 até 13:17
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
    if (BaterPontoVoltaAlmoco.generatedDate !== todayKey) {
      BaterPontoVoltaAlmoco.randomMinute = getRandomInt(10, 28)
      BaterPontoVoltaAlmoco.generatedDate = todayKey
      console.log(`[13] 🎲 Novo minuto aleatório do dia: ${BaterPontoVoltaAlmoco.randomMinute}`)
    }

    if (currentMinute === BaterPontoVoltaAlmoco.randomMinute) {
      const controller = new BaterPontoNODATAController()
      await controller.getBaterPonto('13', currentMinute)
      console.log(`✅ [13] Ponto batido às 13:${currentMinute}`)
    } else {
      console.log(`⏳ [13] Agora: ${currentMinute}, esperando: ${BaterPontoVoltaAlmoco.randomMinute}`)
    }
  }
}

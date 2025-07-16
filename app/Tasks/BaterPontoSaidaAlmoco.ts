import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'
import BaterPontoNODATAController from 'App/Controllers/CronsJobs/baterPontoDecisaoNODATA'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class BaterPontoSaidaAlmoco extends BaseTask {
  private static randomMinute: number | null = null
  private static generatedDate: string | null = null

  public static get schedule() {
    return '01-14 15 * * 1-5' // Roda de 12:01 até 12:17
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
    if (BaterPontoSaidaAlmoco.generatedDate !== todayKey) {
      BaterPontoSaidaAlmoco.randomMinute = getRandomInt(1, 14)
      BaterPontoSaidaAlmoco.generatedDate = todayKey
      console.log(`[12] 🎲 Novo minuto aleatório do dia: ${BaterPontoSaidaAlmoco.randomMinute}`)
    }

    if (currentMinute === BaterPontoSaidaAlmoco.randomMinute) {
      const controller = new BaterPontoNODATAController()
      await controller.getBaterPonto('12', currentMinute)
      console.log(`✅ [12] Ponto batido às 12:${currentMinute}`)
    } else {
      console.log(`⏳ [12] Agora: ${currentMinute}, esperando: ${BaterPontoSaidaAlmoco.randomMinute}`)
    }
  }
}

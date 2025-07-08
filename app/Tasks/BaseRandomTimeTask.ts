import { BaseTask } from 'adonis5-scheduler/build/src/Scheduler/Task'
import fs from 'fs'
import path from 'path'

export abstract class BaseRandomTimeTask extends BaseTask {
  abstract readonly hour: number
  abstract readonly minuteRange: [number, number]
  abstract readonly taskKey: string
  abstract readonly pontoCode: string

  private logFilePath = path.resolve(__dirname, '..', 'bater_ponto_log.json')

  private getTodayKey() {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  }

  private loadLog(): Record<string, Record<string, number>> {
    if (!fs.existsSync(this.logFilePath)) return {}
    return JSON.parse(fs.readFileSync(this.logFilePath, 'utf-8'))
  }

  private saveLog(log: Record<string, Record<string, number>>) {
    fs.writeFileSync(this.logFilePath, JSON.stringify(log))
  }

  private getOrSetTodayMinute(): number {
    const today = this.getTodayKey()
    const log = this.loadLog()

    if (!log[today]) log[today] = {}
    if (!log[today][this.taskKey]) {
      const [min, max] = this.minuteRange
      log[today][this.taskKey] = Math.floor(Math.random() * (max - min + 1)) + min
      this.saveLog(log)
    }

    return log[today][this.taskKey]
  }

  public async handle() {
    const now = new Date()

    if (now.getHours() !== this.hour) return

    const minuteToTrigger = this.getOrSetTodayMinute()
    if (now.getMinutes() !== minuteToTrigger) return

    const controller = await import('App/Controllers/CronsJobs/baterPontoDecisaoNODATA')
    const instance = new controller.default()
    await instance.getBaterPonto(this.pontoCode, now.getMinutes())

    console.log(`✅ ${this.taskKey}: ponto batido às ${now.getHours()}:${now.getMinutes()}`)
  }

  public static get useLock() {
    return true
  }
}

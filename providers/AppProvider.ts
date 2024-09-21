import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'

export default class AppProvider {
  constructor(protected app: ApplicationContract) { }

  public async boot() { }

  public async ready() {
    if (Env.get('PROD')) {
    const scheduler = this.app.container.use('Adonis/Addons/Scheduler')
    scheduler.run()
    }
  }

  public async shutdown() { }
}

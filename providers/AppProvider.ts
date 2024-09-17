import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) { }

  public async boot() { }

  public async ready() {
    const scheduler = this.app.container.use('Adonis/Addons/Scheduler')
    scheduler.run()
  }

  public async shutdown() { }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'confirm_niver_danis'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('qtdCrianca')
      table.string('qtdPessoas')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public tableName = 'confirm_niver_danis'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('qtdAdultos')
      table.string('qtdCrianca')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

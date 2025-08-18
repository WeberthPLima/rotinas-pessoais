import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'listacasamento'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('qtd_drink').notNullable().defaultTo(0)
      table.integer('qtd_cerveja').notNullable().defaultTo(0)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

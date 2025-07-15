import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'listacasamento'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('adultos').notNullable().defaultTo(0)
      table.integer('criancas').notNullable().defaultTo(0)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'mensagemcasamentos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('message').alter()

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

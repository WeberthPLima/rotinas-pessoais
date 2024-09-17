import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'videos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('mub', 255)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

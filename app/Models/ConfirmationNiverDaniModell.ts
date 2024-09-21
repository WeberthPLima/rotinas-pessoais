import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class 
 extends BaseModel {
  public static table = 'confirm_niver_danis'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public telefone: string


  @column({ columnName: 'qtdPessoas' })
  public qtdPessoas: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

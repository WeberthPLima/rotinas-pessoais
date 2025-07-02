import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MensagemCasamentosModell extends BaseModel {
  public static table = 'mensagemcasamentos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

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

  @column({ columnName: 'qtdAdultos' })
  public qtdAdultos: string

  @column({ columnName: 'qtdCrianca' })
  public qtdCrianca: string

  @column({ columnName: 'qtd_drink' })
  public qtd_drink: string

  @column({ columnName: 'qtd_cerveja' })
  public qtd_cerveja: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

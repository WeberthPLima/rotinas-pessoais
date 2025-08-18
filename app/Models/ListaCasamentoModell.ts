import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ListaCasamento extends BaseModel {
  public static table = 'listacasamento'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public companions: string[]

  @column()
  public adultos: number

  @column()
  public criancas: number

  @column()
  public qtd_drink: number

  @column()
  public qtd_cerveja: number

  @column()
  public origin: string
}

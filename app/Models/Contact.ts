import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dsContato: string

  @column()
  public nrCelular: string

  @column()
  public dsEmail: string

  @column()
  public stAtivo: boolean

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  static get table() {
    return 'contatos'
  }
  
}

import { BaseModel, ManyToMany, column, manyToMany,  } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'


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

  @manyToMany(() => Group, {
    pivotTable: 'contatos_grupocontatos',  
    pivotForeignKey: 'contato_id',
    pivotRelatedForeignKey: 'grupocontato_id'
  })
  public grupos: ManyToMany<typeof Group>

  static get table() {
    return 'contatos'
  }
  
}

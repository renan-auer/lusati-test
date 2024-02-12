import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact';
import Group from 'App/Models/Group';
import ContactValidator from 'App/Validators/ContactValidator';
export default class ContactController {

  public async index({ response }: HttpContextContract) {

    const contacts = await Contact.query().orderBy('id', 'desc');

    response.status(200);

    return contacts
  }

  public async store({ request, response }: HttpContextContract) {

    const contactData = await request.validate(ContactValidator)

    const contact = await Contact.create(contactData)
    request.body().grupos.forEach(async grupo => {
      await contact.related('grupos').attach([grupo.id]);
    });
    response.status(201);

    return contact
  }

  public async show({ params }: HttpContextContract) {

    const contact = await Contact.query().preload('grupos').where('id', params.id).firstOrFail()

    return contact

  }

  public async update({ params, request, response }: HttpContextContract) {

    const contactData = await request.validate(ContactValidator)

    const contact = await Contact.query().preload('grupos').where('id', params.id).firstOrFail()

    const changes = this.getChangeList(request.body().grupos, contact.grupos)

    changes.inserts.forEach(async grupo => {
      await contact.related('grupos').attach([grupo.id]);
    });

    changes.deletes.forEach(async grupo => {
      await contact.related('grupos').detach([grupo.id]);
    });

    contact.dsContato = contactData.dsContato
    contact.dsEmail = contactData.dsEmail
    contact.nrCelular = contactData.nrCelular
    contact.stAtivo = contactData.stAtivo

    await contact.save()

    response.status(201);

    return contact
  }


  public async destroy({ params, response }: HttpContextContract) {

    const contact = await Contact.findOrFail(params.id)

    await contact.delete()

    return response.status(204)
  }

  private getChangeList(gruposParametro: Group[], gruposJaSalvos: Group[]) {
    const inserts: Group[] = []
    const deletes: Group[] = []

    gruposParametro.forEach(grupo => {
      const index = gruposJaSalvos.findIndex(g => g.id == grupo.id)
      if (index == -1) {
        inserts.push(grupo)
      }
    });

    gruposJaSalvos.forEach(grupo => {
      const index = gruposParametro.findIndex(g => g.id == grupo.id)
      if (index == -1) {
        deletes.push(grupo as Group)
      }
    })

    return { inserts, deletes }
  }
}

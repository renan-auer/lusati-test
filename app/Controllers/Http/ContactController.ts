import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact';
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

    response.status(201);

    return contact
  }

  public async show({ params }: HttpContextContract) {

    const contact = await Contact.findOrFail(params.id)

    return contact

  }

  public async update({ params, request, response }: HttpContextContract) {

    const contactData = await request.validate(ContactValidator)

    const contact = await Contact.findOrFail(params.id)

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
}

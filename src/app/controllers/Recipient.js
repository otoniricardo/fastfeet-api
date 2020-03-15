import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(8),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await Recipient.create(req.body);

    return res.json({ id, name, street, number, complement, city, state, cep });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      cep: Yup.string().min(8),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const recipientId = req.params.id;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    try {
      const {
        id,
        name,
        street,
        number,
        complement,
        city,
        state,
        cep,
      } = await recipient.update(req.body);

      return res.json({
        id,
        name,
        street,
        number,
        complement,
        city,
        state,
        cep,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
export default new RecipientController();

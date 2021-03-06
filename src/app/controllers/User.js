import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      passwordHash: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists)
      return res.status(400).json({ error: 'Email already in use' });

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists)
        return res.status(400).json({ error: 'Email already in use' });
    }

    if (oldPassword && !(await user.checkpassowd(oldPassword)))
      return res.status(401).json({ error: 'wrong passord' });

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, provider });
  }
}
export default new UserController();

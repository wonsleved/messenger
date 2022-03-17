import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {contactTemplate} from './contact.template';

export default class ContactComponent extends Block {
  constructor(name, username) {
    super('div', {
      name,
      username
    });
  }

  render() {
    return compile(contactTemplate, this.props);
  }
}
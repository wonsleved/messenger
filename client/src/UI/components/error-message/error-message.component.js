import Block from "../../modules/block";
import {compile} from "../../utils/templator";
import {errorMessageTemplate} from "./error-message.template";

export default class ErrorMessageComponent extends Block {
  constructor(messages = []) {
    super('div', {
      messages
    });

  }

  render() {
    return compile(errorMessageTemplate, this.props);
  }
}
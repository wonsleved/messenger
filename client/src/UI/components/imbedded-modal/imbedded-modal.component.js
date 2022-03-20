import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {imbeddedModalTemplate} from "./imbedded-modal.template";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {loadContacts} from "../../general/load-contacts";


const MODAL_CLASS = 'modal';
const SHOW_MODAL = '_show';

export default class ImbeddedModalComponent extends Block {
  didMountFunctions = null;

  constructor(payload, closeModal, didMountFunctions = []) {
    super('div', {
      outsideModalClick,
      ...payload,
      didMountFunctions
    });

    function outsideModalClick({target}) {
      if (target.classList.contains(MODAL_CLASS))
        closeModal(target);
    }

  }

  render() {
    return compile(imbeddedModalTemplate, this.props);
  }
}
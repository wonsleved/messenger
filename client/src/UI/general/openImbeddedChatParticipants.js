import ImbeddedModalComponent from "../components/imbedded-modal/imbedded-modal.component";
import {closeImbeddedModal} from "./closeImbeddedModal";

export function openImbeddedChatParticipants(payload) {

  let rootElement = document.getElementsByClassName('page')[0];

  const parser = new DOMParser();
  const imbeddedModalComponent = new ImbeddedModalComponent(payload, closeImbeddedModal); // Нет смысла передавать туда close
  const doc = parser.parseFromString(imbeddedModalComponent.render(), 'text/html');

  rootElement.prepend(doc.body.children[0]);
}
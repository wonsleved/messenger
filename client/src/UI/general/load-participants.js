import ChatParticipantComponent from "../components/chat-participant/chat-participant.component";
import {ChatService} from "../../services/chat.service";


export async function loadParticipants(chatId) {
  let participants = await ChatService.getChatParticipants(chatId);

  const participantsList = document.querySelector('[data-list="chat-participants"]');
  if (!participantsList || !participants)
    return;

  let parser = new DOMParser();

  let fragment = document.createDocumentFragment();

  for(let participant of participants) {
    const participantComponent = new ChatParticipantComponent(participant.name, participant.username);
    let doc = parser.parseFromString(participantComponent.render(), "text/html");

    let contactElement = doc.body.children[0];
    fragment.prepend(contactElement);
  }

  participantsList.textContent = '';
  participantsList.append(fragment);
}


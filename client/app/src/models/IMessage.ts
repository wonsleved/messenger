export default interface IMessage {
    id?: string,
    authorId?: string,
    chatId?: string,
    authorName: string,
    registry: number,
    date: string,
    body: string
}
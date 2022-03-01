module.exports = class MessageDto {
  id;
  authorId;
  authorName;
  chatId;
  registry;
  date;
  body;

  constructor(model) {
    this.id = model.id;
    this.authorId = model.authorId;
    this.authorName = model.authorName;
    this.chatId = model.chatId;
    this.registry = model.registry;
    this.date = model.date;
    this.body = model.body;
  }
};

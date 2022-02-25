module.exports = class ChatDto {
  id;
  title;
  isPrivate;
  creatorId;
  updatedAt;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.isPrivate = model.isPrivate;
    this.creatorId = model.creatorId;
    this.updatedAt = model.updatedAt;
  }
};

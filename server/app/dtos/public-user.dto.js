module.exports = class PublicUserDto {
  id;
  username;
  name;
  isOnline;
  lastVisitAt;

  constructor(model) {
    this.id = model.id;
    this.username = model.username;
    this.name = model.name;
    this.isOnline = model.isOnline;
    this.lastVisitAt = model.lastVisitAt;
  }
};

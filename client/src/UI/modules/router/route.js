import {render, disRender} from "../../utils/render.js";

export default class Route {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    if (this._block)
      disRender(this._props.rootQuery, this._block);
  }

  match(pathname) {
    return this._pathname === pathname;
  }

  render() {
    if (!this._block)
      this._block = new this._blockClass();

    render(this._props.rootQuery, this._block);
  }

}




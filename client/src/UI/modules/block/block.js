import {Mediator} from "../mediator/index.js";
import cloneDeep from "../../utils/cloneDeep.js"

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CWM: 'flow:component-will-mount',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CWU: 'flow:component-will-update',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  _element = null;
  _meta = null;

  constructor(tagName = 'div', props = {}) {
    const mediator = new Mediator();
    this.mediator = () => mediator;

    this._meta = {
      tagName,
      props
    }

    this.props = this._makeProxy(props);
    this._registerEvents();

    mediator.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    const mediator = this.mediator();

    mediator.on(Block.EVENTS.INIT, this.init.bind(this));

    mediator.on(Block.EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
    mediator.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    mediator.on(Block.EVENTS.FLOW_CWU, this._componentWillUpdate.bind(this));
    mediator.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    mediator.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _makeProxy(props) {

    const savedThis = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = cloneDeep(target);
        savedThis.mediator().emit(Block.EVENTS.FLOW_CWU, oldProps);

        target[prop] = value;

        savedThis.mediator().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
      }

    });
  }

  _allocResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(...tagNames) {
    if (tagNames.length === 1)
      return document.createElement(tagNames[0]);



    let documentFragment = document.createDocumentFragment();

    for (let tagName of tagNames) {
      let element = document.createElement(tagName);
      documentFragment.append(element);
    }

    return documentFragment;
  }

  init() {
    this.mediator().emit(Block.EVENTS.FLOW_CWM);

    this._allocResources();
    this.mediator().emit(Block.EVENTS.FLOW_CDM);
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate(oldProps) {}

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  render() {}

  _componentWillMount() {
    this.componentWillMount();
  }

  _componentDidMount() {
    this.componentDidMount();
    this.mediator().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentWillUpdate(oldProps) {
    this.componentWillUpdate(oldProps);
  }


  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response)
      return;

    this.mediator().emit(Block.EVENTS.FLOW_RENDER);
  }

  _render() {
    const block = this.render();


    //  rewrite, use DOM parser (https://davidwalsh.name/convert-html-stings-dom-nodes)
    this._element.innerHTML = block;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

}
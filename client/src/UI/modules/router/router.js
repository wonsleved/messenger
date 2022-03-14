import Route from './route.js';

export default class Router {
  constructor(rootQuery) {

    if (Router.__instance)
      return Router.__instance;

    this._defaultRoute = null;

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname, block) {
    let newRoute = new Route(pathname, block, { rootQuery: this._rootQuery });

    let foundRoute = this.getRoute(pathname);
    if (foundRoute)
      this.routes = this.routes.map(route => route.match(pathname) ? newRoute : route);
    else
      this.routes.push(newRoute);

    return this;
  }

  start() {
    window.onpopstate = (event => {

      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    let route = this.getRoute(pathname);
    if (!route) {
      let foundDefaultRoute = this.getRoute(this._defaultRoute);
      if (!foundDefaultRoute)
        return;

      this.go(this._defaultRoute);
      return;
    }


    if (this._currentRoute && this._currentRoute !== route)
      this._currentRoute.leave();

    this._currentRoute = route;
    route.render(route, pathname);
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }

  go(pathname) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  default(pathname) {
    this._defaultRoute = pathname;
    return this;
  }

  forward() {
    this.history.forward();
  }

  clear() {
    this.routes = [];
    return this;
  }
}


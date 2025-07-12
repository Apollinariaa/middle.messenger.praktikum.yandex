import NotFoundPage from '../../pages/404';
import { RoutesLinks } from '../../utils/regex';
import Block from '../Block';
import { Route } from './Route';

// отвечает только за изменение URL и вызывает Route;
class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Block): this {
    if (!block) {
      this.go(RoutesLinks.notFound);
    }
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {  // запустить роутер
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    const pathname = window.location.pathname;
    const isPathAuth = pathname === RoutesLinks.login || pathname === RoutesLinks.registration;
    const isAuth = localStorage.getItem('isAuth') !== null ? JSON.parse(localStorage.isAuth) : false;

    if (!isAuth && !isPathAuth) {
      this.go(RoutesLinks.login);
    } else if (isAuth && isPathAuth) {
      this.go(RoutesLinks.chats);
    } else {
      this._onRoute(pathname);
    }
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      const route = new Route(RoutesLinks.notFound, new NotFoundPage, { rootQuery: '#app' });
      route.render();
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
    return;
  }

  go(pathname: string): void {
    const isPageAuth = pathname === RoutesLinks.login || pathname === RoutesLinks.registration;
    const isAuth = localStorage.getItem('isAuth') !== null ? JSON.parse(localStorage.isAuth) : false;

    if (!isPageAuth && !isAuth)  {
      this.history.pushState({}, '', pathname);
      this._onRoute(RoutesLinks.login);
      return;
    };

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {  // переход назад по истории браузера
    this.history.back();
  }

  forward(): void {  // переход вперёд по истории браузера
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  static getInstance() {
    if (!Router.__instance) {
      Router.__instance = new Router('#app');
    }
    return Router.__instance;
  }
}

export default Router;

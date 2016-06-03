import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Home} from './components/home/home.component';
import {About} from './components/about/about';
import {Chart} from './components/chart/chart.component';
import {KeycloakService} from '../keycloak';

@Component({
  selector: 'seed-app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/seed-app.html',
})
@RouteConfig([
  {path: '/home', component: Home, name: 'Home', useAsDefault: true},
  {path: '/chart', component: Chart, name: 'Chart'},
  {path: '/about', component: About, name: 'About'},
])
export class SeedApp {

  constructor(private kc:KeycloakService) {
  }

  logout() {
    this.kc.logout();
  }

}

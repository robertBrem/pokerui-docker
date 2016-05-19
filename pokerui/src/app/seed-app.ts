import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {LineChartDemo} from './components/chart/chart';

@Component({
  selector: 'seed-app',
  providers: [],
  pipes: [],
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/seed-app.html',
})
@RouteConfig([
  {path: '/home', component: Home, name: 'Home', useAsDefault: true},
  {path: '/chart', component: LineChartDemo, name: 'Chart'},
  {path: '/about', component: About, name: 'About'},
])
export class SeedApp {

  constructor() {
  }

}

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {KeycloakService} from './keycloak';

import {SeedApp} from './app/seed-app';


// enableProdMode()

KeycloakService.init().then(
  o=>{
    bootstrap(SeedApp, [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      KeycloakService,
      provide(LocationStrategy, {useClass: HashLocationStrategy})
    ])
      .catch(err => console.error(err));
  },
  x=>{
    window.location.reload();
  }
);

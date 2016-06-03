import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import {Balance} from './../player/balance';
import {AccountPosition} from "./accountPosition";
import {TimeEntry} from "./timeentry";
import {HistoryEntry} from "./historyentry";
import {KeycloakService} from '../../../keycloak';

@Injectable()
export class AccountPositionService {
  private playersUrl:string;

  constructor(private http:Http, private kc:KeycloakService) {
    let baseUrl:string = process.env.POKERTRACKER_URL;
    if (baseUrl == undefined) {
      baseUrl = 'http://localhost:8080/pokertracker/';
    }
    let api:string = 'resources/';
    this.playersUrl = baseUrl + api + 'players/';
  }

  public create = (playerId:number, amount:number, currency:string):Promise<Observable<AccountPosition>> => {
    var toAdd = JSON.stringify({playerId: playerId, amount: amount, currency: currency});
    return this.kc.getToken().then(token => {
      return this.http
        .post(this.playersUrl + playerId + '/accountpositions/', toAdd, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getBalance = (playerId:number):Promise<Observable<Balance>> => {
    // let key;
    // for (key in KeycloakService.auth) {
    //   console.log('key: ' + key);
    //   console.log('value: ' + KeycloakService.auth[key]);
    // }
    // for (key in KeycloakService.auth.authz) {
    //   console.log('key: ' + key);
    //   console.log('value: ' + KeycloakService.auth.authz[key]);
    // }
    // for (key in KeycloakService.auth.authz['idTokenParsed']) {
    //   console.log('key: ' + key);
    //   console.log('value: ' + KeycloakService.auth.authz['idTokenParsed'][key]);
    // }
    // for (key in KeycloakService.auth.authz['tokenParsed']) {
    //   console.log('key: ' + key);
    //   console.log('value: ' + KeycloakService.auth.authz['tokenParsed'][key]);
    // }
    // for (key in KeycloakService.auth.authz['realmAccess']) {
    //   console.log('key: ' + key);
    //   console.log('value: ' + KeycloakService.auth.authz['realmAccess'][key]);
    // }
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersUrl + playerId + '/balance', new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getAccountPositions = (playerId:number):Promise<Observable<AccountPosition[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersUrl + playerId + '/accountpositions/', new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getAccountHistoryForPlayer = (playerId:number):Promise<Observable<TimeEntry[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersUrl + playerId + '/accounthistory/' + '?summedUp=true', new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getAccountHistory = (timeUnit:string, maxEntries:number):Promise<Observable<HistoryEntry[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersUrl + 'accounthistory/' + '?summedUp=true&timeUnit=' + timeUnit + '&maxEntries=' + maxEntries, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  private getHeaders(token:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

}

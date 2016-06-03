import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import {Player} from './player';
import {KeycloakService} from '../../../keycloak';

@Injectable()
export class PlayerService {
  private playersUrl:string;

  constructor(private http:Http, private kc:KeycloakService) {
    let baseUrl:string = process.env.POKERTRACKER_URL;
    if (baseUrl == undefined) {
      baseUrl = 'http://localhost:8080/pokertracker/';
    }
    let api:string = 'resources/';
    this.playersUrl = baseUrl + api + 'players/';
  }

  public getAll = ():Promise<Observable<Player[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersUrl, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    })
  }

  public find = (id:number):Promise<Observable<Player>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersUrl + id, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public create = (firstName:string, lastName:string):Promise<Observable<Player>> => {
    var toAdd = JSON.stringify({firstName: firstName, lastName: lastName});
    return this.kc.getToken().then(token => {
      return this.http
        .post(this.playersUrl, toAdd, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public update = (id:number, itemToUpdate:Player):Promise<Observable<Player>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .put(this.playersUrl + id, JSON.stringify(itemToUpdate), new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public delete = (id:number):Promise<Observable<Response>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .delete(this.playersUrl + id, new RequestOptions({headers: this.getHeaders(token)}));
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

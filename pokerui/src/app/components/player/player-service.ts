import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Player} from "./player";
import {KeycloakService} from "../../../keycloak";

@Injectable()
export class PlayerService {
  private playersCommandUrl: string;
  private playersQueryUrl: string;

  constructor(private http: Http, private kc: KeycloakService) {
    let baseCommandUrl: string = process.env.POKERTRACKER_COMMAND_URL;
    if (baseCommandUrl == undefined) {
      baseCommandUrl = 'http://localhost:8282/pokertracker/';
    }
    let baseQueryUrl: string = process.env.POKERTRACKER_QUERY_URL;
    if (baseQueryUrl == undefined) {
      baseQueryUrl = 'http://localhost:8080/pokertracker.query/';
    }

    let api: string = 'resources/';

    this.playersCommandUrl = baseCommandUrl + api + 'players/';
    this.playersQueryUrl = baseQueryUrl + api + 'players/';
  }

  public getAll = (): Promise<Observable<Player[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersQueryUrl, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    })
  }

  public find = (id: number): Promise<Observable<Player>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersQueryUrl + id, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public create = (firstName: string, lastName: string): Promise<Observable<Player>> => {
    var toAdd = JSON.stringify({firstName: firstName, lastName: lastName});
    return this.kc.getToken().then(token => {
      return this.http
        .post(this.playersCommandUrl, toAdd, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public update = (id: number, itemToUpdate: Player): Promise<Observable<Player>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .put(this.playersCommandUrl + id, JSON.stringify(itemToUpdate), new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public delete = (id: number): Promise<Observable<Response>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .delete(this.playersCommandUrl + id, new RequestOptions({headers: this.getHeaders(token)}));
    });
  }

  private getHeaders(token: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }
}

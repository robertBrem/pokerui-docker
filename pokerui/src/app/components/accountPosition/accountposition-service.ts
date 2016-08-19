import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Balance} from "./../player/balance";
import {AccountPosition} from "./accountPosition";
import {TimeEntry} from "./timeentry";
import {HistoryEntry} from "./historyentry";
import {KeycloakService} from "../../../keycloak";

@Injectable()
export class AccountPositionService {
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

  public create = (playerId: number, amount: number, currency: string): Promise<Observable<AccountPosition>> => {
    var toAdd = JSON.stringify({playerId: playerId, amount: amount, currency: currency});
    return this.kc.getToken().then(token => {
      return this.http
        .post(this.playersCommandUrl + playerId + '/accountpositions/', toAdd, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getBalance = (playerId: number): Promise<Observable<Balance>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersQueryUrl + playerId + '/balance', new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getAccountPositions = (playerId: number): Promise<Observable<AccountPosition[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersQueryUrl + playerId + '/accountpositions/', new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getAccountHistoryForPlayer = (playerId: number): Promise<Observable<TimeEntry[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersQueryUrl + playerId + '/accounthistory/' + '?summedUp=true', new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
    });
  }

  public getAccountHistory = (timeUnit: string, maxEntries: number): Promise<Observable<HistoryEntry[]>> => {
    return this.kc.getToken().then(token => {
      return this.http
        .get(this.playersQueryUrl + 'accounthistory/' + '?summedUp=true&timeUnit=' + timeUnit + '&maxEntries=' + maxEntries, new RequestOptions({headers: this.getHeaders(token)}))
        .map(res => res.json());
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

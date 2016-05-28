import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Player } from './../player/player';
import { Balance } from './../player/balance';
import {AccountPosition} from "./accountPosition";
import {TimeEntry} from "./timeentry";
import {HistoryEntry} from "./historyentry";

@Injectable()
export class AccountPositionService {
  private playersUrl:string;
  private headers:Headers;

  constructor(private http:Http) {
    let baseUrl:string = process.env.POKERTRACKER_URL;
    let api:string = 'resources/';
    this.playersUrl = baseUrl + api + 'players/';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public create = (playerId:number, amount:number, currency:string):Observable<AccountPosition> => {
    var toAdd = JSON.stringify({playerId: playerId, amount: amount, currency: currency});
    return this.http
      .post(this.playersUrl + playerId + '/accountpositions/', toAdd, {headers: this.headers})
      .map(res => res.json());
  }

  public getBalance = (playerId:number):Observable<Balance> => {
    return this.http
      .get(this.playersUrl + playerId + '/balance')
      .map(res => res.json());
  }

  public getAccountPositions = (playerId:number):Observable<AccountPosition[]> => {
    return this.http
      .get(this.playersUrl + playerId + '/accountpositions/')
      .map(res => res.json());
  }

  public getAccountHistoryForPlayer = (playerId:number):Observable<TimeEntry[]> => {
    return this.http
      .get(this.playersUrl + playerId + '/accounthistory/' + '?summedUp=true')
      .map(res => res.json());
  }

  public getAccountHistory = (timeUnit:string, maxEntries:number):Observable<HistoryEntry[]> => {
    return this.http
      .get(this.playersUrl + 'accounthistory/' + '?summedUp=true&timeUnit=' + timeUnit + '&maxEntries=' + maxEntries)
      .map(res => res.json());
  }

}

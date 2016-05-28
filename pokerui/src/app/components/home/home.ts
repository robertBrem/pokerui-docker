import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Player} from './../player/player';
import {Balance} from './../player/balance';
import {AccountPosition} from './../accountPosition/accountPosition';
import {PlayerService} from './../player/player-service';
import {AccountPositionService} from './../accountPosition/accountposition-service';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [PlayerService, AccountPositionService],
  directives: [],
  pipes: []
})
export class Home {
  private players:Player[];
  private selectedPlayer:Player;
  private accountPositions:AccountPosition[];

  constructor(private playerService:PlayerService, private accountPositionService:AccountPositionService) {
  }

  ngOnInit() {
    this.getPlayers();
  }

  createPlayer(firstName:string, lastName:string) {
    return this.playerService
      .create(firstName, lastName)
      .subscribe((data:Player) => {
          let player:Player = data;
          this.updatePlayerWithBalance(player);
          this.players.push(player);
        },
        error => console.log(error),
        () => console.log('Player created!!')
      );
  }

  createAccountPosition(prefix:string, bigCurrency:number, smallCurrency:number) {
    let inSmallCurrency:number = (+bigCurrency * 100);
    let amount:number = +inSmallCurrency + +smallCurrency;
    if (prefix == '-') {
      amount = -amount;
    }
    return this.accountPositionService
      .create(this.selectedPlayer.id, amount, 'CHF')
      .subscribe((data:AccountPosition) => {
          this.updatePlayerWithBalance(this.selectedPlayer);
          let position:AccountPosition = data;
          let bigCurrencyAmount = position.amount / 100;
          position.formattedAmount = bigCurrencyAmount.toLocaleString('DE-CH', {minimumFractionDigits: 2}) + ' ' + position.currency;
          let date:Date = new Date(position.creationDate.toString());
          position.formattedDate = date.toLocaleDateString('DE-CH') + ' ' + date.toLocaleTimeString('DE-CH');
          this.accountPositions.push(position);
        },
        error => console.log(error),
        () => console.log('AccountPosition created!!')
      );
  }

  showAccountPositions(player:Player) {
    this.selectedPlayer = player;
    this.accountPositionService
      .getAccountPositions(player.id)
      .subscribe((data:AccountPosition[]) => {
          this.accountPositions = data;
          let key;
          for (key in data) {
            let position:AccountPosition = this.accountPositions[key];
            let bigCurrencyAmount = position.amount / 100;
            position.formattedAmount = bigCurrencyAmount.toLocaleString('DE-CH', {minimumFractionDigits: 2}) + ' ' + position.currency;
            let date:Date = new Date(position.creationDate.toString());
            position.formattedDate = date.toLocaleDateString('DE-CH') + ' ' + date.toLocaleTimeString('DE-CH');
          }
        },
        error => console.log(error),
        () => console.log('AccountPositions loaded!!')
      );
  }

  private getPlayers() {
    this.playerService
      .getAll()
      .subscribe((data:Player[]) => {
          this.players = data;
          let key;
          for (key in data) {
            let player:Player = this.players[key];
            this.updatePlayerWithBalance(player);
          }
        },
        error => console.log(error),
        () => console.log('Players loaded!!')
      );
  }

  private updatePlayerWithBalance(player:Player) {
    this.accountPositionService
      .getBalance(player.id)
      .subscribe((data:Balance) => {
          let totalSmallCurrencyAmount:number = data.value;
          let balance = totalSmallCurrencyAmount / 100;
          player.balance = balance.toLocaleString('DE-CH', {minimumFractionDigits: 2});
          player.currency = data.currency;
        },
        error => console.log(error),
        () => console.log('Balance loaded!!' + player.balance)
      );
  };

}

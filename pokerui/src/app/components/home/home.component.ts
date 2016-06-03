import {Component} from '@angular/core';

import {Player} from './../player/player';
import {Balance} from './../player/balance';
import {AccountPosition} from './../accountPosition/accountPosition';
import {PlayerService} from './../player/player-service';
import {AccountPositionService} from './../accountPosition/accountposition-service';
import {KeycloakService} from "../../../keycloak";

@Component({
  selector: 'pui-home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [PlayerService, AccountPositionService, KeycloakService],
  directives: [],
  pipes: []
})
export class Home {
  private players:Player[];
  private selectedPlayer:Player;
  private accountPositions:AccountPosition[];
  private roles:string[];

  constructor(private playerService:PlayerService, private accountPositionService:AccountPositionService) {
    let roleText:string = KeycloakService.auth.authz['realmAccess']['roles'] + '';
    this.roles = roleText.split(",");
  }

  ngOnInit() {
    this.getPlayers();
  }

  createPlayer(firstName:string, lastName:string) {
    return this.playerService
      .create(firstName, lastName)
      .then(pro => {
        pro.subscribe((data:Player) => {
            let player:Player = data;
            this.updatePlayerWithBalance(player);
            this.players.push(player);
          },
          error => console.log(error),
          () => console.log('Player created!!')
        );
      });
  }

  createAccountPosition(prefix:string, bigCurrency:number, smallCurrency:number) {
    let inSmallCurrency:number = (+bigCurrency * 100);
    let amount:number = +inSmallCurrency + +smallCurrency;
    if (prefix == '-') {
      amount = -amount;
    }
    return this.accountPositionService
      .create(this.selectedPlayer.id, amount, 'CHF')
      .then(pro => {
        pro.subscribe((data:AccountPosition) => {
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
      });
  }

  showAccountPositions(player:Player) {
    this.selectedPlayer = player;
    this.accountPositionService
      .getAccountPositions(player.id)
      .then(pro => {
        pro.subscribe((data:AccountPosition[]) => {
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
      });
  }

  private getPlayers() {
    this.playerService
      .getAll()
      .then(pro => {
        pro.subscribe((data:Player[]) => {
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
      });
  }

  private updatePlayerWithBalance(player:Player) {
    this.accountPositionService
      .getBalance(player.id)
      .then(pro => {
        pro.subscribe((data:Balance) => {
            let totalSmallCurrencyAmount:number = data.value;
            let balance = totalSmallCurrencyAmount / 100;
            player.balance = balance.toLocaleString('DE-CH', {minimumFractionDigits: 2});
            player.currency = data.currency;
          },
          error => console.log(error),
          () => console.log('Balance loaded!!' + player.balance)
        );
      });
  };

}

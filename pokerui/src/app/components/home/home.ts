import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Player} from './player';
import {AccountPosition} from './accountPosition';
import {PlayerService} from './player-service';
import {AccountPositionService} from './accountposition-service';

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

  constructor(private service:PlayerService, private accountPositionService:AccountPositionService) {
  }

  ngOnInit() {
    this.getPlayers();
  }

  createPlayer(firstName:string, lastName:string) {
    return this.service
      .create(firstName, lastName)
      .subscribe((data:Player) => this.players.push(data),
        error => console.log(error),
        () => console.log('Player created!!')
      );
  }

  createAccountPosition(amount:number, currency:string) {
    return this.accountPositionService
      .create(this.selectedPlayer.id, amount, currency)
      .subscribe((data:AccountPosition) => this.accountPositions.push(data),
        error => console.log(error),
        () => console.log('AccountPosition created!!')
      );
  }

  showAccountPositions(player:Player) {
    this.selectedPlayer = player;
    this.accountPositionService
      .getAccountPositions(player.id)
      .subscribe((data:AccountPosition[]) => this.accountPositions = data,
        error => console.log(error),
        () => console.log('AccountPositions loaded!!')
      );
  }

  private getPlayers() {
    this.service
      .getAll()
      .subscribe((data:Player[]) => this.players = data,
        error => console.log(error),
        () => console.log('Players loaded!!')
      );
  }

}

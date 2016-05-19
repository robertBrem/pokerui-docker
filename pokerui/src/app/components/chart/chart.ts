import {Component} from '@angular/core';
import {LineChart, Message} from 'primeng/primeng';

import {Player} from './../player/player';
import {Balance} from './../player/balance';
import {AccountPosition} from './../accountPosition/accountPosition';
import {TimeEntry} from './../accountPosition/timeentry';
import {HistoryEntry} from './../accountPosition/historyentry';
import {PlayerService} from './../player/player-service';
import {AccountPositionService} from './../accountPosition/accountposition-service';

@Component({
  selector: 'home',
  templateUrl: 'app/components/chart/chart.html',
  styleUrls: ['app/components/chart/chart.css'],
  providers: [PlayerService, AccountPositionService],
  directives: [LineChart],
  pipes: []
})
export class LineChartDemo {
  private data:any;
  private history:HistoryEntry[];

  constructor(private playerService:PlayerService, private accountPositionService:AccountPositionService) {
    this.updateGraph('MINUTES');
  }

  private updateGraph(timeUnit:string) {
    this.accountPositionService
      .getAccountHistory(timeUnit)
      .subscribe((data:HistoryEntry[]) => {
          this.history = data;
          this.redraw();
        },
        error => console.log(error),
        () => console.log('Players loaded!!')
      );
  }

  private redraw() {
    let labels = [];
    let datasets = [];
    let key;
    for (key in this.history) {
      let player:HistoryEntry = this.history[key];
      let playerData = [];
      let historyKey;
      labels = [];
      for (historyKey in player.history) {
        let accountHistory:TimeEntry = player.history[historyKey];
        console.log(accountHistory);
        if (accountHistory.balance == null) {
          playerData.push(null);
        } else {
          playerData.push(accountHistory.balance / 100);
        }
        labels.push(accountHistory.date);
      }
      console.log(player.playerName);
      console.log(playerData);

      datasets.push({
        label: player.playerName,
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: playerData
      });
    }

    this.data = {
      labels: labels,
      datasets: datasets
    }
  };
}

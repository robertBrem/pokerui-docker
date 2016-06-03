import {Component} from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import {TimeEntry} from './../accountPosition/timeentry';
import {HistoryEntry} from './../accountPosition/historyentry';
import {AccountPositionService} from './../accountPosition/accountposition-service';

@Component({
  selector: 'pui-chart',
  templateUrl: 'app/components/chart/chart.html',
  styleUrls: ['app/components/chart/chart.css'],
  providers: [AccountPositionService],
  directives: [CHART_DIRECTIVES],
  pipes: []
})
export class Chart {
  private history:HistoryEntry[];
  private maxEntriesDefault:number = 20;
  private options:Object;

  constructor(private accountPositionService:AccountPositionService) {
    this.options = {
      title : { text : 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
    this.updateGraph('MINUTES', this.maxEntriesDefault);
  }

  private updateGraph(timeUnit:string, maxEntries:number) {
    if (maxEntries <= 0) {
      maxEntries = this.maxEntriesDefault;
    }
    console.log('maxEntries: ' + maxEntries);
    this.accountPositionService
      .getAccountHistory(timeUnit, maxEntries)
      .then(pro => {
        pro.subscribe((data:HistoryEntry[]) => {
            this.history = data;
            this.redraw();
          },
          error => console.log(error),
          () => console.log('Players loaded!!')
        );
      });
  }

  private redraw() {
    let labels = [];
    let datasets = [];
    let series = [];
    let colors:string[] = [];
    colors.push('255, 150, 150');
    colors.push('150, 255, 150');
    colors.push('150, 150, 255');
    colors.push('255, 255, 150');
    colors.push('150, 255, 255');
    colors.push('255, 150, 255');

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

      let currentColor = colors.pop();

      datasets.push({
        name: player.playerName,
        fillColor: 'rgba(' + currentColor + ',0.2)',
        strokeColor: 'rgba(' + currentColor + ',1)',
        pointColor: 'rgba(' + currentColor + ',1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(' + currentColor + ',1)',
        data: playerData
      });
    }

    console.log('datasets: ' + datasets);
    this.options = {
      chart: {
        type: 'spline'
      },
      title : {
        text : 'Cool Chart'
      },
      xAxis: {
        categories: labels
      },
      plotOptions: {
        series: {
          connectNulls: true
        }
      },
      series: datasets
    }
  };
}

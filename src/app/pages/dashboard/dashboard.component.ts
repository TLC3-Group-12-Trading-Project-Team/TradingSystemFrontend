import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;



  public UserData = JSON.parse(localStorage.getItem('userData'));
  public balance: number = 0;

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router) {}

  public activePortfolio = this.UserData.portfolios[0];
  public activePortfolioStocks = this.UserData.portfolios[1].orders;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

      this.getBalance()

    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getBalance(){
    // console.log("Submitted");
    this.http.get('http://18.159.170.1:25000/client/balance/'+this.UserData.id, {responseType: "text"}).subscribe(
      (response) => this.balance=Number(response),
      (error) => console.log(error)
    );
  }
  getOrders(){
    return 'Unknown';
  }
  getProfit(){
    return '0';
  }

}

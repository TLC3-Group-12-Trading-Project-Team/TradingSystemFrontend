import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  public UserData = JSON.parse(localStorage.getItem('userData'));

  public portfolios = this.UserData.portfolios;
  public activePortfolio = this.UserData.portfolios[0];
  public activePortfolioStocks = this.UserData.portfolios[1].orders;

  public newPortfolio = {
    name: "",
    clientEmail: this.UserData.email
  }

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router) {}

  closeResult = '';
  open(portfolioContent) {
    this.modalService.open(portfolioContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    this.getPortfolios();
    this.getPortfoliosStocks(this.UserData.portfolios[0].id);

    // console.log(this.activePortfolio);
    // console.log(this.activePortfolioStocks);
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

  getPortfolios(){
    // console.log("Submitted");
    this.http.get('http://18.159.170.1:25000/portfolio/'+this.UserData.id).subscribe(
      (response) => this.portfolios=response,
      (error) => this.promptOnError(error)
    );
  }

  private promptOnError(error) {
    alert("Error Occurred, You might be having connectivity issues")
  }

  createNewPortfolio() {
    // console.log("Submitted");
    this.http.post('http://18.159.170.1:25000/portfolio/create', { clientEmail: this.newPortfolio.clientEmail, name: this.newPortfolio.name}).subscribe(
      (response) => this.successAction(response),
      (error) => this.promptOnError(error)
    );
  }

  private successAction(response) {
    // console.log(response)
    alert("New Portfolio made Successfully")
    this.getPortfolios();
  }


  getPortfoliosStocks(id: any) {
    // console.log(id);
    this.http.get('http://18.159.170.1:25000/portfolio/single/' + id).subscribe(
      (response) =>  this.activePortfolioStocks= response,
      (error) => this.promptOnError(error)
    );

  }
}

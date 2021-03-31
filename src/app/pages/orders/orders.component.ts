import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public copy: string;
  public UserData = JSON.parse(localStorage.getItem('userData'));

  closeResult = '';


  public activePortfolio = this.UserData.portfolios[0];
  public activePortfolioStocks = this.UserData.portfolios[0].orders;

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router) {}

  open(orderContent) {
    this.modalService.open(orderContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  public newOrder = {
    portfolioId: 0,
    product: "",
    quantity: 0,
    price: 0.0,
    side: "BUY"
  }
  public portfolios = this.UserData.portfolios;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    this.getPortfolios();
    var chartOrders = document.getElementById('chart-orders');

    this.getPortfolios();
    this.getPortfoliosStocks(this.UserData.portfolios[0].id);

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

  getPortfoliosStocks(id: any) {
    // console.log(id);
    this.http.get('http://18.159.170.1:25000/portfolio/single/' + id).subscribe(
      (response) =>  this.activePortfolioStocks= response,
      (error) => this.promptOnError(error)
    );

  }


  recommendNewOrderPrice() {

  }

  createNewOrder() {
    // console.log("Submitted");
    this.http.post('http://18.159.170.1:25000/order/getOrderStatus', { portfolioId: this.newOrder.portfolioId, product: this.newOrder.product, quantity: this.newOrder.quantity, price: this.newOrder.price, side: this.newOrder.side, action: "create" }).subscribe(
      (response) => this.successAction(response),
      (error) => this.promptOnError(error)
    );
  }

  private successAction(response) {
    console.log(response)
    alert("New Order made Successfully")
    this.router.navigate([this.router.url]);
  }

  private promptOnError(error) {
    console.log(error)
    alert("New Order could not be completed please check internet access");
  }
}

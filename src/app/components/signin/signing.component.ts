import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signin',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent  {

  log(x: NgModel): void { console.log(x); }

}

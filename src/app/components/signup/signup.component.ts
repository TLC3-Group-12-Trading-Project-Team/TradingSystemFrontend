import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  log(x: NgModel): void { console.log(x); }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }

  submitForm() {
    // console.log("Submitted");
    console.log(this.form.get('email').value);
    console.log(this.form.get('password').value)
    this.http.post('http://18.159.170.1:25000/client/login', { email: this.form.get('email').value, password: this.form.get('password').value }).subscribe(
      (response) => this.loginAction(response),
      (error) => this.promptOnError(error)

    )
  }

  promptOnError(error) {
    // log Error and maybe send to reporting service
    console.log(error)
    // Alert for Error
    alert("Login Failed, This may be due to Bad Credentials or connectivity issues") //Replace with toast
  }

  loginAction(response) {
    //Check status code if Successful 200
    console.log(response.code);
    if(response.code == 200){
      //Find a way to store info
      console.log(response)

      let key='userData';
      localStorage.setItem(key, JSON.stringify(response.data));

      // let getLocalDataItem = JSON.parse(localStorage.getItem(key));
      // console.log(getLocalDataItem);

      //redirect to dashboard
      this.router.navigate(['dashboard']);
    } else {
      this.promptOnError(response);
    }

  }

}

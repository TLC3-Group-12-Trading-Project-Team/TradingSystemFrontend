import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: ['']
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }

  createAccount() {
    // console.log("Submitted");
     this.http.post('http://18.159.170.1:25000/client/signup', { firstname: this.form.get('firstname').value, lastname: this.form.get('lastname').value, email: this.form.get('email').value, password: this.form.get('password').value }).subscribe(
      (response) => this.signupAction(response),
      (error) => this.promptOnError(error),
    );

  }

  promptOnError(error) {
    console.log(error);
    alert("Failed To Sign Up");
    // this.router.navigate(['dashboard']); // Replace with toast
  }

  signupAction(response) {
    console.log(response);``
    // register client
    this.http.post('http://18.159.170.1:25000/client/login', { email: this.form.get('email').value, password: this.form.get('password').value }).subscribe(
      (response) => this.loginAction(response),
      (error) => this.router.navigate(['login']),
    );
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

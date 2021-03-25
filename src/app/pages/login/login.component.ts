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
    var formData: any = new FormData();
    formData.append("email", this.form.get('email').value);
    formData.append("password", this.form.get('password').value);

    this.http.post('http://18.159.170.1:25000', formData).subscribe(
      (response) => this.loginAction(response),
      (error) => this.promptOnError(error)

    )
  }

  promptOnError(error) {
    console.log(error)
    alert("Login Failed ooo Elijah, Bestie, ")
    this.router.navigate(['dashboard']); //Replace with toast
  }

  loginAction(response) {
    console.log(response)
    //Check status code if Successful 200
    //Find a way to store info

    //redirect to dashboard
    // this.router.navigate(['dashboard']);
  }

}

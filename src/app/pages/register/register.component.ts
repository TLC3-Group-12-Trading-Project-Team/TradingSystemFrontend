
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
      name: [''],
      email: [''],
      password: ['']
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }

  CreateAccount() {
    // console.log("Submitted");
    const formData: any = new FormData();
    formData.append('email', this.form.get('email').value);
    formData.append('firstname', this.form.get('firstname').value);
    formData.append('lastname', this.form.get('lastname').value);
    formData.append('password', this.form.get('password').value);

    this.http.post('http://18.159.170.1:25000', formData).subscribe(
      (response) => this.signupAction(response),
      (error) => this.promptOnError(error),

    );
  }

  promptOnError(error) {
    console.log(error);
    this.router.navigate(['dashboard']); // Replace with toast
  }

  signupAction(response) {
    console.log(response);
    // Check status code if Successful 200
    // Find a way to store info

    // redirect to dashboard
    this.router.navigate(['login']);
  }

}

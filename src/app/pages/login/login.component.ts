import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
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

    this.http.post('http://18.193.123.168:25000', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

}

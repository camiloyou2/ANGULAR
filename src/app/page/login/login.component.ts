import { Component, OnInit, ViewChild } from '@angular/core';
import { user } from '../../modules/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';

import { loginmodule } from '../../modules/modulelogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private http: LoginService, private router: Router) {}

  ngOnInit() {}

  validar_usuario() {
    const userlogin = new loginmodule();
    userlogin.username = this.profileForm.value.username ?? '';
    userlogin.password = this.profileForm.value.password ?? '';
    this.router.navigate(['load_file']);
    this.http.get_token(userlogin).subscribe(() => {
      console.log(this.http.getToken());
      this.http.isAuth().subscribe(dato => {
        if (dato === true) {
          this.router.navigate(['load_file']);
          console.log(dato);
        }
      });
    });
  }
}

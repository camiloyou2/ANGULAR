import { Component, OnInit, ViewChild } from '@angular/core';
import { user } from '../../modules/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { loginmodule } from '../../modules/modulelogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


listauser!:user[];
title = 'Login';
puntero_tabla :any;
disable_prev :any;
disable_next:any = false;
password:string  ="";

 profileForm = new FormGroup({
   username: new FormControl('', [Validators.required]),
   password: new FormControl('', [Validators.required])
   
 });




 totalPages: any;


 constructor(private http: LoginService , private router: Router){

 }
 ngOnInit() {

  
 }


 validar_usuario(){  
  alert("d")
 var  userlogin  = new loginmodule ;
 userlogin.username = this.profileForm.value.username ?? '';
 userlogin.password = this.profileForm.value.password ?? '';
  this.http.get_token(userlogin).subscribe(dato => {
    console.log( this.http.getToken());
    this.http.isAuth().subscribe(dato => {

      if (dato == true){
        this.router.navigate(['load_file'])
        console.log(dato);
      }
    });
  });

  

 

 


 }

}

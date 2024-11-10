import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { datos_pasantia } from '../../modules/datos_pasantia';
import { datos_docente } from '../../modules/datos_docente';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-banner-docentes',
  standalone: true,
  imports: [DataTablesModule, CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './banner-docentes.component.html',
  styleUrl: './banner-docentes.component.css'
})
export class BannerDocentesComponent {
  ocultar_nav = false
  filestwo: any = {
    exceltwo: null,

  };
  files: any = {
    excel: null
  };
     
  constructor(private http: LoginService) {

  } toggleMenu(): void {
    const menu = document.querySelector('.menu');

    if (menu instanceof HTMLElement) {
      // Alterna la clase 'hidden' para controlar la visibilidad
      if (this.ocultar_nav == false) {
        menu.style.transform = 'translateX(-100%)';
        this.ocultar_nav = true
      } else {

        menu.style.transform = 'translateX(0%)';
        this.ocultar_nav = false
      }
    }
    else {

      console.error('Menu element not found or not an HTMLElement.');

    }
  }
 
  ngOnInit() {
   
  }
  onFileChangetwo(event: any, field: string) {
    this.filestwo[field] = event.target.files[0];

  }
  onSubmittwo() {

    const formData = new FormData();
    

    // Agregar archivos al FormData
    for (let key in this.filestwo) {
      
      if (this.filestwo[key]) {
      
        formData.append(key, this.filestwo[key]);
      }

   
    }
     this.http.cargar_exceltwo(formData).subscribe(dato => {

 
    });
    }

    onFileChange(event: any, field: string) {
      this.files[field] = event.target.files[0];
  
    }
    onSubmit() {
       
      const formData = new FormData();
      
  
      // Agregar archivos al FormData
      for (let key in this.files) {
        if (this.files[key]) {
          formData.append(key, this.files[key]);
        }
  
     
      }
      console.log(formData)
       this.http.cargar_excel(formData).subscribe(dato => {
  
      });
      }
}

import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { user } from '../../modules/user';
import { datos_monografia } from '../../modules/datos_monografia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-powerbi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ],
  templateUrl: './powerbi.component.html',
  styleUrl: './powerbi.component.css'
})
export class PowerbiComponent {
  constructor(private http: LoginService) {

  }
  docente = {
    numero_documento: '',
    nombre_uno: '',
    nombre_dos: '',
    apellido_uno: '',
    apellido_dos: '',
  };

  onSubmit(): void {
    if (this.docente.numero_documento && this.docente.nombre_uno && this.docente.apellido_uno) {
      this.http.insertar_datos_docentes(this.docente).subscribe(data => {

        console.log(data); // Aquí mostramos la respuesta en la consola
        
              // Verificamos el mensaje del servidor
              if (data.message === 'Estudiante y Proyecto creados correctamente') {
                
                Swal.fire({
                  icon: 'success',
                  title: '¡Todo salió bien!',
                  text: "Ningun problema en los datos enviados" ,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Algun problema en los datos enviado" ,
                });   }
      }
        
        
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  ocultar_nav = false
  ngOnInit() { }
  toggleMenu(): void {
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
  }}

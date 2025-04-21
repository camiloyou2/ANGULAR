import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { datos_pasantia } from '../../modules/datos_pasantia';
import { user } from '../../modules/user';
import { datos_monografia } from '../../modules/datos_monografia';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-insetar-usuario',
  standalone: true,
  imports: [DataTablesModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './insetar-usuario.component.html',
  styleUrl: './insetar-usuario.component.css'
})
export class InsetarUsuarioComponent {


    proyecto = {
      nombre_proyecto: '',
      profundizacion_id: null,
      estado_id: null,
      modalida_id: null,
      acta_id: null,
    }

  estudiante = {
    numero_documento: '',
    nombre_uno: '',
    nombre_dos: '',
    apellido_uno: '',
    apellido_dos: '',
    codigo: '',
    semestre: '',
    creditos: '',
    estado: '',
    ano_grado: null,
    periodo_grado: null
  };
  
ocultar_nav = false
  mostrarProyecto: boolean = false; // Control de visibilidad
  estados = ['Egresado no graduado','Graduado','Estudiante']; // Enum para 'estado'
  modalida = {
    nombre_modalida: ''
  };
  profundizaciones = [
    { id_profundizacion: 1, nombre: 'Software' },
    { id_profundizacion: 2, nombre: 'Telecomunicaciones' },
    { id_profundizacion: 3, nombre: 'Otro' },
  ];
  modalidades = [
    { id_modalida: 1, nombre: 'Articulo publicado' },
    { id_modalida: 2, nombre: 'Monografia' },
    { id_modalida: 3, nombre: 'Pasantia' },
    { id_modalida: 4, nombre: 'Auxiliar de investigacion' },
    { id_modalida: 5, nombre: 'Semestre avanzado' },
  ];
  
  estados_proyecto = [
    { id_estado: 1, nombre: 'En Proceso' },
    { id_estado: 2, nombre: 'Finalizado' },
  
  ];
  constructor(private http: LoginService) {}
 // Alternar visibilidad de la sección de proyecto
 toggleProyecto() {
  this.mostrarProyecto = !this.mostrarProyecto;
}
  ngOnInit(): void {}
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
  }
  onSubmit(): void {


  }

  onSubmitmodalidad() {
    console.log('Modalidad guardada:', this.modalida);
    // Aquí puedes enviar los datos al backend usando un servicio
    this.guardarModalidad();
  }

  // Simulación de guardar la modalidad (reemplazar con servicio real)
  guardarModalidad() {
    
    this.http.CrearModalidadnueva(this.modalida).subscribe(data => {
      console.log(data)
  });
    this.limpiarFormulario(); // Limpiar el formulario después de guardar
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.modalida = { nombre_modalida: '' };
  }
}

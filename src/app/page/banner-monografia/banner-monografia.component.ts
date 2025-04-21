import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { datos_pasantia } from '../../modules/datos_pasantia';
import { user } from '../../modules/user';
import { datos_monografia } from '../../modules/datos_monografia';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-banner-monografia',
  standalone: true,
  imports: [DataTablesModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './banner-monografia.component.html',
  styleUrl: './banner-monografia.component.css'
})
export class BannerMonografiaComponent {

  // 📁 Datos de usuario
  datosUsuario = {
    numero_documento: "",
    nombre_completo: "",
    codigo: "",
    estado: "",
    creditos: null,
    solicitudes_sis: null,
    tipo_documento: "",
    estado_descripcion: null,
    opcion_grado: null
  };

  // 📁 Datos del formulario del estudiante
  estudiante = {
    numero_documento: '',
    nombre_uno: '',
    nombre_dos: '',
    apellido_uno: '',
    apellido_dos: '',
    codigo: '',
    semestre: '',
    creditos: '',
    estado: 'Estudiante'
  };

  // 📁 Datos del formulario de proyecto
  today = new Date();
  form: any = {
    nombre: '',
    fecha_inicio: this.today.toLocaleDateString(),
    terminada: false,
    id_profesor: null
  };

  // 📂 Archivos cargados
  files: { [key: string]: File | null } = {
    anteproyecto: null,
    documento_final: null
  };

  // 📋 Listas de soporte (catálogos)
  estados: any[] = [];
  tiposDocumento: any[] = [];
  opcionesGrado: any[] = [];

  // 📊 Listados
  data!: user[];
  listausertwo!: datos_monografia[];

  // 🔢 Paginación
  puntero_tabla: any;
  totalPages: any;
  disable_prev: any;
  disable_next: any = false;

  // 🧭 UI
  ocultar_nav = false;
  datatable: any;
  mostrarDiv1 = true;
  mostrarDiv2 = true;

  constructor(private http: LoginService) {}

  ngOnInit(): void {
    // Inicialización si se requiere
  }

  toggleMenu(): void {
    const menu = document.querySelector('.menu');

    if (menu instanceof HTMLElement) {
      this.ocultar_nav = !this.ocultar_nav;
      menu.style.transform = this.ocultar_nav ? 'translateX(-100%)' : 'translateX(0%)';
    } else {
      console.error('Menu element not found or not an HTMLElement.');
    }
  }

  toggleDiv1(): void {
    this.mostrarDiv1 = !this.mostrarDiv1;
  }

  toggleDiv2(): void {
    this.mostrarDiv2 = !this.mostrarDiv2;
  }

  enviarFormulario(): void {
    this.http.crear_estudiante_proyecto(this.estudiante).subscribe(
      (data: any) => {
        if (data.message === `Cédula con N:${this.estudiante.numero_documento} ya está registrada.`) {
          Swal.fire({
            icon: 'warning',
            title: 'Cédula ya registrada',
            text: data.message,
          });
        } else if (data.message === 'Estudiante creado correctamente') {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: data.message,
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al insertar: ${error.message || 'Ocurrió un problema inesperado.'}`,
        });
      }
    );
  }

}

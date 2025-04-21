import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insertar-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './insertar-proyecto.component.html',
  styleUrl: './insertar-proyecto.component.css'
})
export class InsertarProyectoComponent implements OnInit {
  

  // 🔧 Proyecto
  proyecto = {
    nombre_empresa: "",
    nombre_proyecto: '',
    profundizacion_id: null,
    estado_id: null,
    modalida_id: null,
    especializacion_id: null,
    acta_aprobacion: null,
    acta_sustentacion: null,
    fecha_aprovacion: null,
    fecha_sustentacion: null,
    cedula_director: null,
    cedula_tutor: null,
    estudiantes: [] as number[],
  };

  // Búsqueda y selección
  searchTerm: string = '';
  searchTermDirector: string = '';
  visual_estudiantes: string[] = [];
  directores: any[] = [{ nombre_completo: null, numero_documento: null }];
  jurados_ascesores: any[] = [{ nombre_completo: null, numero_documento: null }];
  filteredJuradosAsesores: any[] = [];
  filteredDirectores: any[] = [];

  // Catálogos
  profundizaciones = [
    { id_profundizacion: 1, nombre: 'Software' },
    { id_profundizacion: 2, nombre: 'Telecomunicaciones' },
    { id_profundizacion: 3, nombre: 'Otro' },
  ];

  especializaciones = [
    { id_especializaciones: 17, nombre: 'Infraestructura y seguridad de redes' },
    { id_especializaciones: 18, nombre: 'Analítica de datos' },
  ];
  modalidades: any[] = [{ id_modalida: null, nombre: null }];
  estados_proyecto = [{ id_estado: 1, nombre: 'En Proceso' }];
  nuevoEstudiante: number | null = null;
  ocultar_nav = false;

  constructor(private http: LoginService) {}

  ngOnInit(): void {
    this.cargarModalidades();
    this.cargarJurados();
    this.cargarDirectores();
  }

  cargarModalidades(): void {
    this.http.total_modalidades().subscribe((data: any) => {
      let dataArray = JSON.parse(data);
      for (let i = 0; i < dataArray.length; i++) {
        let object = JSON.parse(dataArray[i].replace(/'/g, '"'));
        if (object.id_modalida !== null && object.nombre_modalida !== null) {
          this.modalidades.push({
            id_modalida: object.id_modalida,
            nombre: object.nombre_modalida
          });
        }
      }
    });
  }

  cargarJurados(): void {
    this.http.obtener_jurados_ascesores().subscribe((data: any) => {
      let dataArray = JSON.parse(data);
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].numero_documento && dataArray[i].nombre_completo) {
          this.jurados_ascesores.push({
            numero_documento: dataArray[i].numero_documento,
            nombre_completo: dataArray[i].nombre_completo
          });
        }
      }
      this.filteredJuradosAsesores = this.jurados_ascesores.slice();
    });
  }

  cargarDirectores(): void {
    this.http.all_docentes_directoes().subscribe((data: any) => {
      let dataArray = JSON.parse(data);
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].numero_documento && dataArray[i].nombre_completo) {
          this.directores.push({
            numero_documento: dataArray[i].numero_documento,
            nombre_completo: dataArray[i].nombre_completo
          });
        }
      }
      this.filteredDirectores = this.directores.slice();
    });
  }

  // Filtros sin usar `.filter()`
  filterOptions(): void {
    this.filteredJuradosAsesores = [];
    const filterValue = this.searchTerm.toLowerCase();

    for (let i = 0; i < this.jurados_ascesores.length; i++) {
      const asesor = this.jurados_ascesores[i];
      if (asesor.nombre_completo && asesor.nombre_completo.toLowerCase().includes(filterValue)) {
        this.filteredJuradosAsesores.push(asesor);
      }
    }
  }

  filterDirectores(): void {
    this.filteredDirectores = [];
    const filterValue = this.searchTermDirector.toLowerCase();

    for (let i = 0; i < this.directores.length; i++) {
      const director = this.directores[i];
      if (director.nombre_completo && director.nombre_completo.toLowerCase().includes(filterValue)) {
        this.filteredDirectores.push(director);
      }
    }
  }

  selectAsesor(asesor: any): void {
    this.proyecto.cedula_tutor = asesor.numero_documento;
    this.searchTerm = asesor.nombre_completo;
    this.filteredJuradosAsesores = [];
  }

  selectDirector(director: any): void {
    this.proyecto.cedula_director = director.numero_documento;
    this.searchTermDirector = director.nombre_completo;
    this.filteredDirectores = [];
  }

  agregarEstudiante(): void {
    if (this.nuevoEstudiante && this.proyecto.estudiantes.length < 2) {
      this.http.obtener_nombre_completo_por_cedula(this.nuevoEstudiante).subscribe((data: any) => {
        this.visual_estudiantes.push(data.nombre_completo);
      });
      this.proyecto.estudiantes.push(this.nuevoEstudiante);
      this.nuevoEstudiante = null;
    }
  }

  eliminarEstudiante(index: number): void {
    this.proyecto.estudiantes.splice(index, 1);
    this.visual_estudiantes.splice(index, 1);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const proyectoJSON = JSON.stringify(this.proyecto, null, 2);
      console.log('Proyecto guardado:', proyectoJSON);

      this.http.guardarProyecto(this.proyecto).subscribe(
        (data: any) => {
          if (data.message.startsWith('La cédula con N:')) {
            Swal.fire({
              icon: 'warning',
              title: 'Cédula no registrada',
              text: data.message,
            });
          } else if (data.message.startsWith('Ya esta registrada la cedula')) {
            Swal.fire({
              icon: 'warning',
              title: 'Cédula ya registrada',
              text: data.message,
            });
          } else if (data.message === 'Proyecto guardado correctamente') {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: data.message,
            });
          }
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Ocurrió un problema: ${error.message || 'Error inesperado.'}`,
          });
        }
      );
    }
  }

  toggleMenu(): void {
    const menu = document.querySelector('.menu');
    if (menu instanceof HTMLElement) {
      this.ocultar_nav = !this.ocultar_nav;
      menu.style.transform = this.ocultar_nav ? 'translateX(-100%)' : 'translateX(0%)';
    } else {
      console.error('No se encontró el elemento .menu');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-usuario',
  standalone: true,
  imports: [DataTablesModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './modificar-usuario.component.html',
  styleUrl: './modificar-usuario.component.css'
})
export class ModificarUsuarioComponent implements OnInit {
  proyecto = {
    acta_aprobados: '',
    acta_sustentacion: '',
    ascesor: null,
    ascesorNombre: '',
    director: null,
    directorNombre: '',
    estado_id: null,
    fecha_aprovados: null,
    fecha_sustentacion: null,
    id_proyecto: null,
    jurado_dos: null,
    juradoDosNombre: '',
    jurado_uno: null,
    juradoUnoNombre: '',
    modalidad_id: null,
    nombre_proyecto: null,
    profundizacion_id: null,
    ascesor_dos: null,
    ascesorDosNombre: '',
    jurado_tres: null,
    juradoTresNombre: ''
  };

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

  ocultar_nav = false;
  mostrarProyecto: boolean = false;
  estados = ['Egresado no graduado', 'Graduado', 'Estudiante'];
  profundizaciones = [
    { id_profundizacion: 1, nombre: 'Software' },
    { id_profundizacion: 2, nombre: 'Telecomunicaciones' },
    { id_profundizacion: 3, nombre: 'Otro' }
  ];
  modalidades = [
    { id_modalida: null, nombre: null }
  ];
  directores = [
    { nombre_completo: null, numero_documento: null }
  ];
  jurados_ascesores = [
    { nombre_completo: null, numero_documento: null }
  ];
  estados_proyecto = [
    { id_estado: 1, nombre: 'En Proceso' },
    { id_estado: 2, nombre: 'Finalizado' }
  ];
  fecha: any;
  fecha_ddos: any;
  searchTerm: string = '';
  filteredJuradosAsesores: any[] = [];

  constructor(private http: LoginService) { }

  ngOnInit() {
    this.http.total_modalidades().subscribe((data: any) => {
      let dataArray = JSON.parse(data);
      for (let i = 0; i < dataArray.length; i++) {
        let object = JSON.parse(dataArray[i].replace(/'/g, '"'));
        this.modalidades.push({ id_modalida: object.id_modalida, nombre: object.nombre_modalida });
      }
      this.modalidades = this.modalidades.filter(item => item.id_modalida !== null || item.nombre !== null);
    });

    this.http.obtener_jurados_ascesores().subscribe((data: any) => {
      let dataArray = JSON.parse(data);
      for (let i = 0; i < dataArray.length; i++) {
        this.jurados_ascesores.push({
          numero_documento: dataArray[i].numero_documento,
          nombre_completo: dataArray[i].nombre_completo
        });
      }
      this.jurados_ascesores = this.jurados_ascesores.filter(item => item.numero_documento !== null || item.nombre_completo !== null);
      this.filteredJuradosAsesores = [...this.jurados_ascesores];

      // Mostrar por defecto el asesor ya seleccionado
      if (this.proyecto.ascesor) {
        const selectedAsesor = this.jurados_ascesores.find(asesor => asesor.numero_documento === this.proyecto.ascesor);
        if (selectedAsesor) {
          this.proyecto.ascesorNombre = selectedAsesor.nombre_completo ?? 'Sin asignar';
        }
      }

      // Mostrar por defecto el asesor externo ya seleccionado
      if (this.proyecto.ascesor_dos) {
        const selectedAsesorExterno = this.jurados_ascesores.find(asesor => asesor.numero_documento === this.proyecto.ascesor_dos);
        if (selectedAsesorExterno) {
          this.proyecto.ascesorDosNombre = selectedAsesorExterno.nombre_completo ?? 'Sin asignar';
        }
      }

      // Mostrar por defecto el jurado 1 ya seleccionado
      if (this.proyecto.jurado_uno) {
        const selectedJuradoUno = this.jurados_ascesores.find(jurado => jurado.numero_documento === this.proyecto.jurado_uno);
        if (selectedJuradoUno) {
          this.proyecto.juradoUnoNombre = selectedJuradoUno.nombre_completo ?? 'Sin asignar';
        }
      }

      // Mostrar por defecto el jurado 2 ya seleccionado
      if (this.proyecto.jurado_dos) {
        const selectedJuradoDos = this.jurados_ascesores.find(jurado => jurado.numero_documento === this.proyecto.jurado_dos);
        if (selectedJuradoDos) {
          this.proyecto.juradoDosNombre = selectedJuradoDos.nombre_completo ?? 'Sin asignar';
        }
      }

      // Mostrar por defecto el jurado externo ya seleccionado
      if (this.proyecto.jurado_tres) {
        const selectedJuradoTres = this.jurados_ascesores.find(jurado => jurado.numero_documento === this.proyecto.jurado_tres);
        if (selectedJuradoTres) {
          this.proyecto.juradoTresNombre = selectedJuradoTres.nombre_completo ?? 'Sin asignar';
        }
      }
    });

    this.http.all_docentes_directoes().subscribe((data: any) => {
      let dataArray = JSON.parse(data);
      for (let i = 0; i < dataArray.length; i++) {
        this.directores.push({
          numero_documento: dataArray[i].numero_documento,
          nombre_completo: dataArray[i].nombre_completo
        });
      }
      this.directores = this.directores.filter(item => item.numero_documento !== null || item.nombre_completo !== null);

      // Mostrar por defecto el director ya seleccionado
      if (this.proyecto.director) {
        const selectedDirector = this.directores.find(director => director.numero_documento === this.proyecto.director);
        if (selectedDirector) {
          this.proyecto.directorNombre = selectedDirector.nombre_completo ?? 'Sin asignar';
        }
      }
    });
  }

  filterOptions() {
    const filterValue = this.searchTerm.toLowerCase();
    this.filteredJuradosAsesores = this.jurados_ascesores.filter(asesor =>
      (asesor.nombre_completo ?? '').toLowerCase().includes(filterValue)
    );
  }

  selectAsesor(asesor: any) {
    this.proyecto.ascesor = asesor.numero_documento;
    this.proyecto.ascesorNombre = asesor.nombre_completo ?? 'Sin asignar';
    this.searchTerm = '';
    this.filteredJuradosAsesores = [];
  }

  onSubmit(): void {
    console.log('Formulario combinado enviado:');
    console.log(typeof this.estudiante);
    console.log(typeof this.proyecto);
    this.http.modificarEstudianteProyecto(this.estudiante, this.proyecto).subscribe(data => {
      console.log(data);
      if (data.message === 'Estudiante y Proyecto creados correctamente') {
        Swal.fire({
          icon: 'success',
          title: '¡Todo salió bien!',
          text: 'Ningún problema en los datos enviados',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algún problema en los datos enviados',
        });
      }
    });
  }

  toggleMenu(): void {
    const menu = document.querySelector('.menu');
    if (menu instanceof HTMLElement) {
      if (this.ocultar_nav == false) {
        menu.style.transform = 'translateX(-100%)';
        this.ocultar_nav = true;
      } else {
        menu.style.transform = 'translateX(0%)';
        this.ocultar_nav = false;
      }
    } else {
      console.error('Menu element not found or not an HTMLElement.');
    }
  }

  buscarEstudiante() {
    const documento = this.estudiante.numero_documento;
    this.fecha = "";
    this.fecha_ddos = "";
    this.http.consultar_estudiante_por_cedula(documento).subscribe(data => {
      console.log(data)
      const firstRecord = JSON.parse(data);
      if (firstRecord.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: firstRecord.error,
        });
        this.mostrarProyecto = false;
      } else {
        if (data && data.length > 0) {
          this.mostrarProyecto = true;
          this.estudiante = firstRecord[0].estudiante;

          console.log(firstRecord[0].proyecto.estado_id)
          console.log(firstRecord[0].estudiante.estado)
          console.log(firstRecord[0].estudiante.semestre)
          this.proyecto = firstRecord[0].proyecto;
          if (this.proyecto.fecha_sustentacion) {
            const fecha = new Date(this.proyecto.fecha_sustentacion);
            if (!isNaN(fecha.getTime())) {
              const año = fecha.getFullYear();
              let mes = fecha.getMonth() + 1;
              let dia = fecha.getDate();
              this.fecha = `${año}-${mes}-${dia}`;
            }
          }
          if (this.proyecto.fecha_aprovados) {
            const fecha = new Date(this.proyecto.fecha_aprovados);
            if (!isNaN(fecha.getTime())) {
              const año = fecha.getFullYear();
              let mes = fecha.getMonth() + 1;
              let dia = fecha.getDate();
              this.fecha_ddos = `${año}-${mes}-${dia}`;
            }
          }

          // Actualizar nombres de los asesores, director y jurados
          this.actualizarNombres();
        }
      }
    }, error => {
      alert("Error en la comunicación con el servidor. Intente nuevamente más tarde.");
    });
  }

  buscarProyecto() {
    const acta = this.proyecto.acta_aprobados;
    this.fecha = "";
    this.fecha_ddos = "";
    this.http.consultar_proyecto_por_acta(acta).subscribe(data => {
      const firstRecord = JSON.parse(data);
      if (firstRecord.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: firstRecord.error,
        });
        this.mostrarProyecto = false;
      } else {
        if (data && data.length > 0) {
          this.mostrarProyecto = true;
          this.estudiante = firstRecord[0].estudiante;
          this.proyecto = firstRecord[0].proyecto;
          if (this.proyecto.fecha_sustentacion) {
            const fecha = new Date(this.proyecto.fecha_sustentacion);
            if (!isNaN(fecha.getTime())) {
              const año = fecha.getFullYear();
              let mes = fecha.getMonth() + 1;
              let dia = fecha.getDate();
              this.fecha = `${año}-${mes}-${dia}`;
            }
          }
          if (this.proyecto.fecha_aprovados) {
            const fecha = new Date(this.proyecto.fecha_aprovados);
            if (!isNaN(fecha.getTime())) {
              const año = fecha.getFullYear();
              let mes = fecha.getMonth() + 1;
              let dia = fecha.getDate();
              this.fecha_ddos = `${año}-${mes}-${dia}`;
            }
          }

          // Actualizar nombres de los asesores, director y jurados
          this.actualizarNombres();
        }
      }
    }, error => {
      alert("Error en la comunicación con el servidor. Intente nuevamente más tarde.");
    });
  }

  actualizarNombres() {
    // Actualizar nombre del asesor
    if (this.proyecto.ascesor) {
      const selectedAsesor = this.jurados_ascesores.find(asesor => asesor.numero_documento === this.proyecto.ascesor);
      if (selectedAsesor) {
        this.proyecto.ascesorNombre = selectedAsesor.nombre_completo ?? 'Sin asignar';
      }
    }

    // Actualizar nombre del asesor externo
    if (this.proyecto.ascesor_dos) {
      const selectedAsesorExterno = this.jurados_ascesores.find(asesor => asesor.numero_documento === this.proyecto.ascesor_dos);
      if (selectedAsesorExterno) {
        this.proyecto.ascesorDosNombre = selectedAsesorExterno.nombre_completo ?? 'Sin asignar';
      }
    }

    // Actualizar nombre del director
    if (this.proyecto.director) {
      const selectedDirector = this.directores.find(director => director.numero_documento === this.proyecto.director);
      if (selectedDirector) {
        this.proyecto.directorNombre = selectedDirector.nombre_completo ?? 'Sin asignar';
      }
    }

    // Actualizar nombre del jurado 1
    if (this.proyecto.jurado_uno) {
      const selectedJuradoUno = this.jurados_ascesores.find(jurado => jurado.numero_documento === this.proyecto.jurado_uno);
      if (selectedJuradoUno) {
        this.proyecto.juradoUnoNombre = selectedJuradoUno.nombre_completo ?? 'Sin asignar';
      }
    }

    // Actualizar nombre del jurado 2
    if (this.proyecto.jurado_dos) {
      const selectedJuradoDos = this.jurados_ascesores.find(jurado => jurado.numero_documento === this.proyecto.jurado_dos);
      if (selectedJuradoDos) {
        this.proyecto.juradoDosNombre = selectedJuradoDos.nombre_completo ?? 'Sin asignar';
      }
    }

    // Actualizar nombre del jurado externo
    if (this.proyecto.jurado_tres) {
      const selectedJuradoTres = this.jurados_ascesores.find(jurado => jurado.numero_documento === this.proyecto.jurado_tres);
      if (selectedJuradoTres) {
        this.proyecto.juradoTresNombre = selectedJuradoTres.nombre_completo ?? 'Sin asignar';
      }
    }
  }
}
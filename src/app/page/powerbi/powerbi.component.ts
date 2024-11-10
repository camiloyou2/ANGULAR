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
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet ],
  templateUrl: './powerbi.component.html',
  styleUrl: './powerbi.component.css'
})
export class PowerbiComponent {


  listausertwo!: datos_monografia[];

  disable_prev: any;
  disable_next: any = false;
  puntero_tabla: any;
  totalPages: any;
  data !: user[]
  ocultar_nav = false
  datatable: any;
  

today = new Date();
form: any = {
  nombre: '',
  fecha_inicio: this.today.toLocaleDateString(),
  terminada: false,
  id_profesor:null
};
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

files: any = {
  excel: null
};

estados: any[] = [];
  tiposDocumento: any[] = [];
  opcionesGrado: any[] = [];

  constructor(private http: LoginService) {

  }

  mostrarDiv1 = true;
  mostrarDiv2 = true;

  toggleDiv1() {
    this.mostrarDiv1 = !this.mostrarDiv1;
  }

  toggleDiv2() {
    this.mostrarDiv2 = !this.mostrarDiv2;
  }
  ngOnInit() {

    this.http.getAllEstado().subscribe(data => {
      this.estados = data;
    });

    this.http.getAllTipoDocumento().subscribe(data => {
      this.tiposDocumento = data;
    });

    this.http.getAllOpcionesDeGrado().subscribe(data => {
      this.opcionesGrado = data;
    });

    this.disable_prev = true;
    this.puntero_tabla = 1;
    this.get_sin_opciones_component(false, false, this.puntero_tabla)
    $(document).ready(() => {
      this.datatable = $('#example').DataTable(

        {
          columnDefs: [
            {
                targets: 0, // Primera columna
                data: null, // No vinculada a un campo específico
                render: (data, type, row) => {
                    // `row` contiene toda la fila de datos
                    const numero_documento = row.numero_documento; // Obtén el valor de la columna `codigo`
                    return `<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn-datos-monografia btn btn-outline-success" data-numero_documento="${numero_documento}">Ver a detalle</button>`; // Modifica el href según sea necesario
                },
                className: 'text-center' // Opcional, para centrar el botón
            },
           
            { className: "centered", targets:"_all" },
            { orderable: false, targets: [0,1,2,4,5,6] },
           // { width: "20%", targets: "_all" },
            { searchable: false, targets: [0,6] }
        ],
          data: this.listausertwo,
          columns: [
            { data: null, title: 'Pasantia' }, // Título para la primera columna
            { data: 'codigo', title: 'codigo' },
            { data: 'numero_documento', title: 'numero_documento' },
            { data: 'nombre', title: 'nombre' },
            { data: 'creditos', title: 'creditos' },
            { data: 'semestre', title: 'semestre' },
            { data: 'solicitudes_sis', title: 'solicitudes_sis' },
          //  { data: 'id_opcion', title: 'id_opcion Encargado' },
          //  { data: 'id_documento', title: 'id_documento del Proyecto' },
  //          { data: 'id_estado', title: 'id_estado' },

          ],

          pagingType: 'full_numbers',
          paging: false,
          lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
          pageLength: 10,
          autoWidth: true,
          destroy: true,
          language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No se encontraron resultados",
            info: "Total de registros: _TOTAL_",
            infoEmpty: "No hay datos disponibles",
            infoFiltered: "(filtrado de _MAX_ registros totales)",
            search: "Buscar:",
            paginate: {
              first: "Primero",
              last: "Último",
              next: "Siguiente",
              previous: "Anterior"
            }
          }
        }
      );
    });
    $('#example').on('click', '.btn-datos-monografia', (event) => {
      const numero_documento = $(event.currentTarget).data('numero_documento');
      this.datos_monografia(numero_documento);
    });


  }

  get_sin_opciones_component(previo: boolean, next: boolean, poscion: any) {

    this.http.get_con_opciones(previo, next, poscion).subscribe(dato => {

      
      const jsonString = JSON.stringify(dato);
  
      const jsonArray = JSON.parse(jsonString);
     


      const userList: datos_monografia[] = jsonArray.map((item: any) => new datos_monografia(item.codigo, item.creditos
        , item.id_documento ,item.id_estado , item.id_opcion , item.nombre , item.numero_documento, item.semestre , item.solicitudes_sis 
      ));

      this.listausertwo = userList;
      this.reloadData()
    });

  }


  reloadData(): void {

    if (this.datatable) {

      this.datatable.clear().draw(); // Limpiar datos existentes
      this.datatable.rows.add(this.listausertwo); // Añadir nuevos datos
      this.datatable.columns.adjust().draw(); // Ajustar columnas y redibujar la tabla
    }
  }

  
  next() {

    if (this.totalPages == this.puntero_tabla + 1) {
      this.disable_next = true;
    }


    if (this.puntero_tabla == 1) {
      this.disable_prev = false
    }


    this.puntero_tabla = this.puntero_tabla + 1;

    this.get_sin_opciones_component(false, false, this.puntero_tabla)



  }

  prev() {

    if (this.puntero_tabla + 1 > this.totalPages) {
      this.disable_next = false;
    }
    if (this.puntero_tabla == 2) {
      this.disable_prev = true

    }
    this.puntero_tabla = this.puntero_tabla - 1;
    this.get_sin_opciones_component(false, false, this.puntero_tabla)



  }

  datos_monografia(numero_documento: string ): void {

    const objeto = { "numero_documento": numero_documento };
    this.http.monografia_especifica(objeto).subscribe(dato => {
     


    
      const aux = JSON.parse(dato); // Convierte la cadena JSON a un array de objetos

      this.datosUsuario.numero_documento =aux[0].numero_documento
      this.datosUsuario.nombre_completo =aux[0].nombre_completo
      this.datosUsuario.codigo =aux[0].codigo
      this.datosUsuario.estado =aux[0].estado
      this.datosUsuario.creditos =aux[0].creditos
      this.datosUsuario.solicitudes_sis =aux[0].solicitudes_sis
      this.datosUsuario.tipo_documento =aux[0].tipo_documento
      this.datosUsuario.estado_descripcion =aux[0].estado_descripcion
      this.datosUsuario.opcion_grado =aux[0].opcion_grado
   
     
    });
    
    
      }
     
      onSubmitt(): void {
        const { numero_documento, nombre_completo, codigo, estado, tipo_documento, creditos, estado_descripcion, solicitudes_sis, opcion_grado } = this.datosUsuario;

  if (
    !numero_documento ||
    !nombre_completo ||
    !codigo ||
    !estado ||
    !tipo_documento ||
    !creditos ||
    !estado_descripcion ||
    !solicitudes_sis ||
    !opcion_grado
  ) {
 
    Swal.fire({
      title: 'Error!',
      text: 'Por favor, completa todos los campos antes de enviar.',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    return;
  }
        this.http.enviarFormulario(this.datosUsuario).subscribe(response => {
       Swal.fire({
            title: "Formulario enviado exitosamente:",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
        }, error => {
 
          Swal.fire({
            title: "Error al enviar el formulario:",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
        });
        
        this.ngOnInit();
        
      }



    
      
        filestwo: any = {
          exceltwo: null,
      
        };
      
       
      
        onFileChange(event: any, field: string) {
          this.files[field] = event.target.files[0];
      
        }
      
       
          onFileChangetwo(event: any, field: string) {
            this.filestwo[field] = event.target.files[0];
        
          }
      
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
      
}

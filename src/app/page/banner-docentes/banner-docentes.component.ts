import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-banner-docentes',
  standalone: true,
  imports: [DataTablesModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './banner-docentes.component.html',
  styleUrl: './banner-docentes.component.css'
})
export class BannerDocentesComponent {
  ocultar_nav: boolean = false;
  // Carga de archivos
  files: { [key: string]: File } = {};
  filestwo: { [key: string]: File } = {};
  // Dirección de PowerBI
  direccion: string = 'https://app.powerbi.com/view?r=eyJrIjoiYzVjNmI0MzMtZDNmZC00NzVlLThhOTgtZDNiN2RiMDk2MGFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9';
 
  constructor(private http: LoginService) {}

  ngOnInit(): void {
    // Si necesitas lógica al cargar, puedes colocarla aquí
  }

  toggleMenu(): void {
    const menu = document.querySelector('.menu') as HTMLElement;

    if (menu) {
      this.ocultar_nav = !this.ocultar_nav;
      menu.style.transform = this.ocultar_nav ? 'translateX(-100%)' : 'translateX(0%)';
    } else {
      console.error('Menu element not found or not an HTMLElement.');
    }
  }

  copiarDireccion(): void {
    navigator.clipboard.writeText(this.direccion)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Copiado!',
          text: 'La dirección fue copiada al portapapeles',
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al copiar',
          text: `No se pudo copiar la dirección: ${err}`
        });
      });
  }

  onFileChange(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.files[field] = input.files[0];
    }
  }

  onFileChangetwo(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.filestwo[field] = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    for (let key in this.files) {
      if (this.files[key]) {
        formData.append(key, this.files[key]);
      }
    }

    this.http.cargar_excel(formData).subscribe(
      (response: any) => {
        if (response.status === "bad") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema al subir el archivo.",
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Archivo subido con éxito",
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      error => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error inesperado',
          text: 'Ocurrió un error al procesar la solicitud.'
        });
      }
    );
  }

  onSubmittwo(): void {
    const formData = new FormData();

    for (let key in this.filestwo) {
      if (this.filestwo[key]) {
        formData.append(key, this.filestwo[key]);
      }
    }

    this.http.cargar_excel_graduados(formData).subscribe((dato: any) => {
      if (dato.message?.startsWith("Error")) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: dato.message
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: '¡Todo salió bien!',
          text: dato.message
        });
      }
    });
  }
}

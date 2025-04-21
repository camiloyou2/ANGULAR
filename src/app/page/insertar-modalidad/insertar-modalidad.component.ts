import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertar-modalidad',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './insertar-modalidad.component.html',
  styleUrl: './insertar-modalidad.component.css'
})
export class InsertarModalidadComponent {
  
  modalidad: { nombre: string } = { nombre: '' };
  ocultar_nav = false;

  constructor(private http: LoginService) {}

  // Método para alternar la visibilidad del menú
  toggleMenu(): void {
    const menu = document.querySelector('.menu');

    if (menu instanceof HTMLElement) {
      this.ocultar_nav = !this.ocultar_nav;
      menu.style.transform = this.ocultar_nav ? 'translateX(-100%)' : 'translateX(0%)';
    } else {
      console.error('Menu element not found or not an HTMLElement.');
    }
  }

  // Método para manejar el formulario de creación de modalidad
  onSubmit(): void {
    if (this.modalidad.nombre.trim()) { // Verifica que el nombre no esté vacío
      this.http.CrearModalidadnueva(this.modalidad).subscribe(
        (response) => {
          console.log('Modalidad creada:', response);
          // Aquí puedes manejar la respuesta de la API
          // Ejemplo: mostrar un mensaje de éxito o redirigir
        },
        (error) => {
          console.error('Error al crear modalidad:', error);
          // Aquí puedes manejar el error (mostrar mensaje de error, etc.)
        }
      );
    } else {
      console.error('El nombre de modalidad es obligatorio');
      // Puedes mostrar un mensaje al usuario si el nombre está vacío
    }
  }
}

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { user } from '../modules/user';
import { loginmodule } from '../modules/modulelogin';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
API_URL : string  = "http://127.0.0.1:8000/user/get_datos_pasantia";
URL_docente : string = "http://127.0.0.1:8000/user/docente";
API_URL_docentes : string  = "http://127.0.0.1:8000/user/get_datos_pasantia";
URL_get_sin_opciones : string  = "http://127.0.0.1:8000/user/get_sin_opciones";
URL_get_con_opciones : string  = "http://127.0.0.1:8000/user/get_con_opciones";
URL_auxiliar  : string  = "http://127.0.0.1:8000/user/get_datos_auxiliar";
URL_GET_PAGES : string  = "http://127.0.0.1:8000/user/get_pages_number";
URL_login : string = "http://127.0.0.1:8000/api/login";
URL_pasantia_especifica : string =  "http://127.0.0.1:8000/user/pasantia_especifica";
URL_docente_pasantia : string =  "http://127.0.0.1:8000/user/docente_pasantia";

URL_asignaciones_docente :string = "http://127.0.0.1:8000/user/asignaciones_docente";
URL_monografia_especifica  : string =  "http://127.0.0.1:8000/user/get_datos_monografia_individual";
URL_auxiliar_especifica  : string =  "http://127.0.0.1:8000/user/get_datos_auxiliar_individual";
URL_pasantia_convenio : string =  "http://127.0.0.1:8000/user/get_datos_convenio_concreto";

URL_docentes : string =  "http://127.0.0.1:8000/user/get_all_profesores";
URL_convenios : string =  "http://127.0.0.1:8000/user/get_all_convenios";

URL_isAuth : string = "http://127.0.0.1:8000/api/verificar/token";
private tokenKey = 'auth_token';
  constructor(private http: HttpClient) { }

  getProducts(previo:boolean , next:boolean, poscion:any ): Observable<any>{
    // Crear una instancia de HttpParams
    let params = new HttpParams();
    params = params.append('previo', previo);
    params = params.append('next', next);
    params = params.append('poscion', poscion);

    return this.http.get<any>(`${this.API_URL}`, { params });
  }


  getDocentes(previo:boolean , next:boolean, poscion:any ): Observable<any>{
    // Crear una instancia de HttpParams
    let params = new HttpParams();
    params = params.append('previo', previo);
    params = params.append('next', next);
    params = params.append('poscion', poscion);

    return this.http.get<any>(`${this.URL_docente}`, { params });
  }


  get_sin_opciones(previo:boolean , next:boolean, poscion:any ): Observable<any>{
    // Crear una instancia de HttpParams
    let params = new HttpParams();
    params = params.append('previo', previo);
    params = params.append('next', next);
    params = params.append('poscion', poscion);

    return this.http.get<any>(`${this.URL_get_sin_opciones}`, { params });
  }

  get_con_opciones(previo:boolean , next:boolean, poscion:any ): Observable<any>{
    // Crear una instancia de HttpParams
    let params = new HttpParams();
    params = params.append('previo', previo);
    params = params.append('next', next);
    params = params.append('poscion', poscion);

    return this.http.get<any>(`${this.URL_get_con_opciones}`, { params });
  }

  getAuxiliar(previo:boolean , next:boolean, poscion:any ): Observable<any>{
    // Crear una instancia de HttpParams
    let params = new HttpParams();
    params = params.append('previo', previo);
    params = params.append('next', next);
    params = params.append('poscion', poscion);

    return this.http.get<any>(`${this.URL_auxiliar}`, { params });
  }

  getPages(objeto:any): Observable<any>{
  
    return this.http.post<any>(`${this.URL_GET_PAGES}`,objeto);
  }

 // Método para decodificar el token
 get_tokenn(user:loginmodule): Observable<any> {
   return this.http.post<any>(`${this.URL_login}`, user);
}
get_token(user: loginmodule): Observable<any> {
  // Hace una solicitud HTTP POST al servidor con las credenciales del usuario
  return this.http.post<any>(this.URL_login, user ,{ observe: 'response' }).pipe(
    tap((response: HttpResponse<any>) =>  {
      // Suponiendo que el token está en response.body.token

      if (response.body && response.body.token) {
        // Si la respuesta contiene un token, lo almacena
        this.setToken(response.body.token);
      }
      if (response.body && response.body.message) {
        // Si la respuesta contiene un mensaje de error, elimina cualquier token existente
        this.delateToken();
        // Muestra una alerta de error utilizando SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña no validos",
        });
      }
    })
  );
}


private setToken(token: string): void {
  localStorage.setItem(this.tokenKey, token);
}
private delateToken(): void {
  localStorage.setItem(this.tokenKey, "");
}


getToken(): string | null {

  return localStorage.getItem(this.tokenKey)
}
 stringToBoolean(str: string | null ): boolean {
  if (str != null){
    return str.toLowerCase() === 'true';
  }
  return false;
}

test():  any {

  return true
}

getValidatepass(): any {
  this.isAuth().subscribe(dato => {
  console.log(dato +" --p-")
  });
  console.log(localStorage.getItem("vlidate_pass"))
  
  return   this.stringToBoolean( localStorage.getItem("vlidate_pass"))
}


isAuth(): Observable<any> {
  const token = this.getToken();
  if (token !="") {
  
    return this.http.post<any>(this.URL_isAuth, { token }).pipe(
      tap(response => {
       if(response == false){
        localStorage.setItem("vlidate_pass", response);
      
       }
       else{

        localStorage.setItem("vlidate_pass", response);
        
       }
        
        
      })
    );
  } else {
    localStorage.setItem("vlidate_pass", "false");
      
    return of(null); // Retorna un observable de null si no hay token
  }
}

pasantia_especifica(id:any): Observable<any> {
  return this.http.post<any>(`${this.URL_pasantia_especifica}`, id);
}

docente_pasantia(id:any): Observable<any> {
  return this.http.post<any>(`${this.URL_docente_pasantia}`, id);
}
asignaciones_docente(id:any): Observable<any> {
  return this.http.post<any>(`${this.URL_asignaciones_docente}`, id);
}

monografia_especifica(numero_documento:any): Observable<any> {

  return this.http.post<any>(`${this.URL_monografia_especifica}`, numero_documento);
}

auxiliar_especifica(id:any): Observable<any> {
  return this.http.post<any>(`${this.URL_monografia_especifica}`, id);
}

datos_convenio(id:any): Observable<any> {
  return this.http.post<any>(`${this.URL_pasantia_convenio}`, id);
}
private estadoUrl = 'http://127.0.0.1:8000/user/get_all_Estado'; // URL de ejemplo
  private tipoDocumentoUrl = 'http://127.0.0.1:8000/user/get_all_tipo_documento';
  private opcionesGradoUrl = 'http://127.0.0.1:8000/user/get_all_opciones_de_grado';



  getAllEstado(): Observable<any[]> {
    return this.http.get<any[]>(this.estadoUrl);
  }
  enviarFormulario(datosUsuario: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/user/enviar_formulario`, datosUsuario);
  }
  getAllTipoDocumento(): Observable<any[]> {
    return this.http.get<any[]>(this.tipoDocumentoUrl);
  }
  getAllOpcionesDeGrado(): Observable<any[]> {
    return this.http.get<any[]>(this.opcionesGradoUrl);
  }
docentes(): Observable<any> {
  return this.http.get<any>(`${this.URL_docentes}`);
}
convenio(): Observable<any> {
  return this.http.get<any>(`${this.URL_convenios}`);
}


cargar_pasantia(formData:any): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/user/upload`, formData);
}

cargar_excel(formData:any): Observable<any> {

  return this.http.post<any>(`http://127.0.0.1:8000/power/load_excel`, formData);
}

cargar_exceltwo(formData:any): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/power/load_graduados`, formData);
}

cargar_monografia(formData:any): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/user/uploadmonografia`, formData);
}
cargar_auxiliar(formData:any): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/user/uploadauxiliar`, formData);
}

cargar_docente(formData:any): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8000/user/uploaddocente`, formData);
}



}

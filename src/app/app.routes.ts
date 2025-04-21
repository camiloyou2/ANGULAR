import { Routes } from '@angular/router';

import { LoginComponent } from './page/login/login.component';

import { guardloginGuard } from './guard/guardlogin.guard';
import { BannerMonografiaComponent } from './page/banner-monografia/banner-monografia.component';

import { BannerDocentesComponent } from './page/banner-docentes/banner-docentes.component';
import { PowerbiComponent } from './page/powerbi/powerbi.component';
import { InsetarUsuarioComponent } from './page/insetar-usuario/insetar-usuario.component';
import { ModificarUsuarioComponent } from './page/modificar-usuario/modificar-usuario.component';
import { InsertarProyectoComponent } from './page/insertar-proyecto/insertar-proyecto.component';
import { InsertarModalidadComponent } from './page/insertar-modalidad/insertar-modalidad.component';
// , canActivate: [guardloginGuard] 

export const routes: Routes = [
    
    { path: 'insertar_docente', component: PowerbiComponent },
    { path: 'modificar', component: ModificarUsuarioComponent },
    { path: 'insertar_modalidad', component: InsertarModalidadComponent },
    { path: 'insertar_proyecto', component: InsertarProyectoComponent },
    { path: 'insertar_estudiante', component: BannerMonografiaComponent },
    { path: 'load_file', component: BannerDocentesComponent },//
    { path: 'login', component: LoginComponent  },//
    { path: '', redirectTo: '/login', pathMatch: 'full'}
//, canActivate:[guardloginGuard]  
];

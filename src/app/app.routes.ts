import { Routes } from '@angular/router';

import { LoginComponent } from './page/login/login.component';

import { guardloginGuard } from './guard/guardlogin.guard';
import { BannerMonografiaComponent } from './page/banner-monografia/banner-monografia.component';

import { BannerDocentesComponent } from './page/banner-docentes/banner-docentes.component';
import { PowerbiComponent } from './page/powerbi/powerbi.component';
// , canActivate: [guardloginGuard] 

export const routes: Routes = [
    
    { path: 'sin_proceso', component: BannerMonografiaComponent },
    { path: 'load_file', component: BannerDocentesComponent , canActivate:[guardloginGuard]  },
    { path: 'login', component: LoginComponent  },
    { path: 'con_opcion', component: PowerbiComponent , canActivate:[guardloginGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full'}

];

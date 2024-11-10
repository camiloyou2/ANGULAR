import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const guardloginGuard: CanActivateFn = (route, state) => {

const loginServics = inject(LoginService)
  
  return loginServics.getValidatepass();
};

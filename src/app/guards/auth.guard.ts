import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  inject(Router).navigate(['/login']);  //redirige a la pagina de login en caso de no estar autenticado
  return false;
};

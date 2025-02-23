import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../pages/authentication/auth_services/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/authentication/login']);
    return false;
  }
};

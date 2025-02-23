import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth_services/auth.service';
import { StorageService } from '../auth_services/storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/helpers/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
})
export class UserLoginComponent implements OnInit {
  loginForm;
  isLoggedIn = false;
  loading = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private snackbar:SnackbarService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    this.loading = true;

    const { username, password } = this.loginForm.value;
    this.authService.login(username!, password!).subscribe({
      next: (data) => {
        window.sessionStorage.removeItem(data);
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.loading = false;
        this.snackbar.openSnackbar('Welcome to PaySky dashboard')
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.snackbar.openSnackbar('one of username or password is incorrect!')
        this.errorMessage = err.error.message;
        this.loading = false;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}

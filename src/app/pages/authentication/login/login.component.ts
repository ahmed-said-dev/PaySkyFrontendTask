import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth_services/auth.service';
import { StorageService } from '../auth_services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/helpers/snackbar.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faCircleCheck,
  faQuestionCircle,
  faRightToBracket,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../assets/scss/pages/authentication/login/login.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppSideLoginComponent implements OnInit {

  loginForm: FormGroup;
  isPasswordHidden = true;
  isLoading = false;
  isAuthenticated = false;


  userRoles: string[] = [];


  readonly userIcon = faUser;
  readonly lockIcon = faLock;
  readonly showPasswordIcon = faEye;
  readonly hidePasswordIcon = faEyeSlash;
  readonly successIcon = faCircleCheck;
  readonly helpIcon = faQuestionCircle;
  readonly loginIcon = faRightToBracket;
  readonly registerIcon = faUserPlus;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isAuthenticated = true;
      this.userRoles = this.storageService.getUser().roles;
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (userData) => {
        window.sessionStorage.removeItem(userData);
        this.storageService.saveUser(userData);
        this.isAuthenticated = true;
        this.isLoading = false;
        this.snackbarService.openSnackbar('Welcome to PaySky dashboard')
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.isLoading = false;
        this.snackbarService.openSnackbar(error.error.message || 'Login failed. Please try again.');
      }
    });
  }

  getFormFieldError(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (!control?.errors) return '';

    if (control.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (control.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}

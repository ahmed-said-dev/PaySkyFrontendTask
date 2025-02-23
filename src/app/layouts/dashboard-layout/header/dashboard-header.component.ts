import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/authentication/auth_services/auth.service';
import { 
  faBars, 
  faBell, 
  faChevronDown, 
  faCircleInfo, 
  faRightFromBracket,
  faUser,
  faGear
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['../../../../assets/scss/layouts/dashboard-layout/header/dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();

  // Font Awesome Icons
  faBars = faBars;
  faBell = faBell;
  faChevronDown = faChevronDown;
  faCircleInfo = faCircleInfo;
  faRightFromBracket = faRightFromBracket;
  faUser = faUser;
  faGear = faGear;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}

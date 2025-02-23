import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/authentication/auth_services/auth.service';


@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MainHeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(public dialog: MatDialog,private auth:AuthService) {}

  logout(){
    this.auth.logout()
  }
}

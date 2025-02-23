import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-branding',
  template: `
    <div class="branding">
      <h2>PaySky</h2>
    </div>
  `,
  styles: [
    `
      .branding {
        padding: 20px;
        text-align: center;
      }
      h2 {
        margin: 0;
        font-weight: bold;
        color: #333;
      }
    `,
  ],
})
export class SidebarBrandingComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
        src="https://paysky.io/wp-content/uploads/2023/12/Paysky-logo.png"
        class="align-middle m-2"
          alt="logo"
          height=100
          width=150
          style="object-fit:contain"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}

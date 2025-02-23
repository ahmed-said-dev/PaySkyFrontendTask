import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDialogComponentComponent } from './product-dialog-component.component';

describe('ProductDialogComponentComponent', () => {
  let component: ProductDialogComponentComponent;
  let fixture: ComponentFixture<ProductDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

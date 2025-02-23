import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/product-management/products.service';
import { SnackbarService } from 'src/app/helpers/snackbar.service';
import { product } from '../models/product';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './add-update-product-dialog.component.html',
  styleUrls: ['./add-update-product-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  productForm: FormGroup;
  subscriptions: Subscription[] = [];
  categories = [
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing",
  ];
  add_update_status: boolean = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private snackBar: SnackbarService,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.add_update_status = data._add_update_status;
    this.productForm = this.fb.group({
      id: [data._product ? data._product.id : undefined],
      title: [data._product ? data._product.title : '', Validators.required],
      price: [
        data._product ? data._product.price : '',
        [Validators.required, Validators.min(0)],
      ],
      description: [data._product ? data._product.description : ''],
      category: [
        data._product ? data._product.category : '',
        Validators.required,
      ],
      image: [
        data._product ? data._product.image : 'https://i.pravatar.cc',
        Validators.required,
      ],
      rating: this.fb.group({
        rate: [
          data._product ? data._product.rating.rate : 0,
          [Validators.required, Validators.min(0)],
        ],
        count: [
          data._product ? data._product.rating.count : 0,
          [Validators.required, Validators.min(0)],
        ],
      }),
    });

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.add_update_status == true
        ? this.addProductHTTPRequest(this.productForm.value)
        : this.updateProductRequest(this.productForm.value);
      this.productForm.reset();
    }
  }

  addProductHTTPRequest(product: product) {
    this.subscriptions.push(
      this.productService.addProduct(product).subscribe(
        (response: any) => {
          product.id=response.id;
          this.sendDataBack(product);
        },
        (error: any) => {
          this.snackBar.openSnackbar('an error occured!');
        }
      )
    );
  }

  updateProductRequest(product: product) {
    this.subscriptions.push(
      this.productService.updateProduct(product).subscribe(
        (response: any) => {
          this.sendDataBack(product);
        },
        (error: any) => {
          this.snackBar.openSnackbar('an error occured!');
        }
      )
    );
  }

  sendDataBack(product: product): void {
    const resultData = {
      _product: product,
      _add_update_status: this.add_update_status,
    };

    this.snackBar.openSnackbar(
      `product has been ${
        this.add_update_status == true ? 'added' : 'updated'
      } successfully!`
    );

    this.dialogRef.close(resultData);
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  close(): void {
    this.dialogRef.close();
  }
}

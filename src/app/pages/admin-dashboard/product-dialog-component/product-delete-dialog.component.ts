import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/helpers/snackbar.service';
import { ProductsService } from 'src/app/services/product-management/products.service';

@Component({
  selector: 'app-product-delete-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './product-dialog-component.component.html',
  styleUrls: ['./product-dialog-component.component.scss'],
})
export class ProductDeleteDialogComponent implements OnInit {
  product_id: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private snackBar: SnackbarService
  ) {
    this.product_id = data.id;
  }

  ngOnInit(): void {
  }

  delete() {
    this.subscriptions.push(
      this.productService.deleteProduct(this.product_id).subscribe(
        (response: any) => {
          this.snackBar.openSnackbar('product has been deleted successfully!');
          this.sendDataBack(this.product_id);
        },
        (error: any) => {
          this.snackBar.openSnackbar('An error occured!');
        }
      )
    );
  }

  sendDataBack(product_id: number): void {
    const resultData = { product_id: product_id };
    this.dialogRef.close(resultData);
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  close(): void {
    this.dialogRef.close();
  }
}

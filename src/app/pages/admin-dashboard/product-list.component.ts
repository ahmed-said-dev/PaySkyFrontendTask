import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ProductsService } from 'src/app/services/product-management/products.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponentComponent } from './product-dialog-component/product-dialog-component.component';
import { debounceTime, Subscription } from 'rxjs';
import { AddUpdateProductDialogComponent } from './add-update-product-dialog/add-update-product-dialog.component';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { product } from './models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatDialogModule,
    LazyLoadImageModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'products',
    'price',
    'category',
    'rating',
    'actions',
  ];
  public dataSource: product[] = [];
  private subscriptions: Subscription[] = [];
  searchForm: FormGroup;
  filteredProducts: any[] = [];
  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.searchForm
      .get('searchTerm')!
      .valueChanges.pipe(
        debounceTime(300)
      )
      .subscribe((searchTerm) => {
        this.findFilterProducts(searchTerm);
      });

    this.getAllProducts();
  }

  findFilterProducts(searchTerm: string) {
    if (!searchTerm) {
      this.filteredProducts = this.dataSource;
    } else {
      this.filteredProducts = this.dataSource.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  getAllProducts() {
    this.subscriptions.push(
      this.productService.getAllProducts().subscribe((response: any) => {
        this.dataSource = response;
        this.filteredProducts = this.dataSource;
      })
    );
  }

  openDialog(product: product): void {
    const dialogRef = this.dialog.open(ProductDialogComponentComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = this.dataSource.filter(
          (element) => element.id !== result.product_id
        );
        this.filteredProducts = this.dataSource;
      }
    });
  }

  openProductDialog(product: product | undefined): void {
    const add_update_status: boolean = product === undefined;
    const dialogRef = this.dialog.open(AddUpdateProductDialogComponent, {
      data: { _product: product, _add_update_status: add_update_status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result._add_update_status) {
          this.dataSource = [result._product, ...this.dataSource];
          this.filteredProducts = this.dataSource;
        } else {
          const productIndex = this.dataSource.findIndex(
            (product) => product.id === result._product.id
          );

          if (productIndex !== -1) {
            const updatedProduct = {
              ...this.dataSource[productIndex],
              ...result._product,
            };

            this.dataSource = [
              ...this.dataSource.slice(0, productIndex),
              updatedProduct,
              ...this.dataSource.slice(productIndex + 1),
            ];
            this.filteredProducts = this.dataSource;
          }
        }
      }
    });
  }

  trackById(index: number, product: product): number {
    return product.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

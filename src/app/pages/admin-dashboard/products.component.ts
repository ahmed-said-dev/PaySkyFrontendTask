import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ProductsService } from 'src/app/services/product-management/products.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponentComponent } from './product-dialog-component/product-dialog-component.component';
import { AddUpdateProductDialogComponent } from './add-update-product-dialog/add-update-product-dialog.component';
import { debounceTime, Subscription } from 'rxjs';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { product } from './models/product';
import { FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faSearch,
  faPencilAlt,
  faTrash,
  faStar as faStarSolid,
  faBox
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './products.component.html',
  styleUrls: ['../../../assets/scss/pages/admin-dashboard/products.component.scss'],
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
    FontAwesomeModule
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }]
})
export class AppDashboardComponent implements OnInit, OnDestroy {
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
  products: product[] = [];


  faPlus = faPlus;
  faSearch = faSearch;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faStarSolid = faStarSolid;
  faStarRegular = faStarRegular;
  faBox = faBox;

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });


    this.searchForm.get('searchTerm')?.valueChanges.subscribe((term) => {
      this.filterProducts(term);
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }


  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      "men's clothing": '#2196F3',
      "women's clothing": '#E91E63',
      'jewelery': '#FFC107',
      'electronics': '#4CAF50',
      'default': '#9C27B0'
    };
    return colors[category.toLowerCase()] || colors['default'];
  }


  filterProducts(term: string) {
    if (!term) {
      this.filteredProducts = [...this.dataSource];
      return;
    }

    term = term.toLowerCase();
    this.filteredProducts = this.dataSource.filter((product) =>
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }


  getAllProducts() {
    const sub = this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.dataSource = res;
        this.filteredProducts = res;
      }
    );
    this.subscriptions.push(sub);
  }


  openDialog(product: product): void {
    const dialogRef = this.dialog.open(ProductDialogComponentComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(
          element => element.id !== result.product_id
        );
        this.filteredProducts = this.dataSource;
      }
    });
  }


  openProductDialog(product: product | undefined): void {
    const add_update_status: boolean = product === undefined;
    const dialogRef = this.dialog.open(AddUpdateProductDialogComponent, {
      data: { _product: product, _add_update_status: add_update_status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._add_update_status) {
          this.dataSource = [result._product, ...this.dataSource];
          this.filteredProducts = this.dataSource;
        } else {
          const productIndex = this.dataSource.findIndex(
            p => p.id === result._product.id
          );

          if (productIndex !== -1) {
            const updatedProduct = {
              ...this.dataSource[productIndex],
              ...result._product
            };

            this.dataSource = [
              ...this.dataSource.slice(0, productIndex),
              updatedProduct,
              ...this.dataSource.slice(productIndex + 1)
            ];
            this.filteredProducts = this.dataSource;
          }
        }
      }
    });
  }


  trackById(index: number, item: any): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

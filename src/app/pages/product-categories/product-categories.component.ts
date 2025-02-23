import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/category-management/categories.service';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [MatCardModule, MatListModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  categories: string[] = [];
  unsubscribe: Subscription[] = [];
  constructor(private categoryService: CategoriesService) {}
  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.unsubscribe.push(
      this.categoryService.getAllCategories().subscribe((response: any) => {
        this.categories = response;
      })
    );
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

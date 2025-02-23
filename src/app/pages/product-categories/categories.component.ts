import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLaptop,
  faGem,
  faTshirt,
  faShirt,
  faArrowRight,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['../../../assets/scss/pages/product-categories/categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  faArrowRight = faArrowRight;
  faBoxOpen = faBoxOpen;

  constructor() {}

  ngOnInit(): void {
    this.categories = [
      'electronics',
      'jewelery',
      'men\'s clothing',
      'women\'s clothing'
    ];
  }

  getCategoryIcon(category: string) {
    const icons: { [key: string]: any } = {
      'electronics': faLaptop,
      'jewelery': faGem,
      'men\'s clothing': faTshirt,
      'women\'s clothing': faShirt
    };
    return icons[category] || faBoxOpen;
  }

  getCategoryColor(category: string) {
    const colors: { [key: string]: string } = {
      'electronics': '#4CAF50',
      'jewelery': '#FFC107',
      'men\'s clothing': '#2196F3',
      'women\'s clothing': '#E91E63'
    };
    return colors[category] || '#757575';
  }
}

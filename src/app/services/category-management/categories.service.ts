import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesBaseUrl = `${environment.apiURL}/products/categories`;

  constructor(private http: HttpClient) {}
  getAllCategories(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.categoriesBaseUrl}`)
      .pipe(map((response: string[]) => response));
  }
}

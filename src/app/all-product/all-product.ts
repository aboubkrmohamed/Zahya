import { Product } from './product.model';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

@Component({
  selector: 'app-all-product',
  imports: [TranslateModule, CommonModule, FormsModule, RouterModule, NgxPaginationModule],
  templateUrl: './all-product.html',
  styleUrl: './all-product.scss',
})
export class AllProduct implements OnInit {
  private productService = inject(ProductService);
  private translate = inject(TranslateService);

  // --- state ---
  searchQuery = signal('');
  selectedCategory = signal('ALL');
  selectedSort = signal<SortOption>('default');
  showInStockOnly = signal(false);
  showOnSaleOnly = signal(false);

  page = 1;
  pageSize = 10;

  allProducts: Product[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.allProducts = this.productService.getAll();
    this.categories = ['ALL', ...this.productService.getCategories()];
  }

  filteredProducts = computed(() => {
    let list = [...this.allProducts];

    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }

    if (this.selectedCategory() !== 'ALL') {
      list = list.filter((p) => p.category === this.selectedCategory());
    }

    if (this.showInStockOnly()) {
      list = list.filter((p) => !p.outOfStock);
    }

    if (this.showOnSaleOnly()) {
      list = list.filter((p) => !!p.discount);
    }

    switch (this.selectedSort()) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  });

  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.pageSize);
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    this.page = 1; // ارجع للأول عند البحث
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
    this.page = 1;
  }

  setSort(val: string) {
    this.selectedSort.set(val as SortOption);
    this.page = 1;
  }

  toggleInStock() {
    this.showInStockOnly.update((v) => !v);
    this.page = 1;
  }

  toggleOnSale() {
    this.showOnSaleOnly.update((v) => !v);
    this.page = 1;
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('ALL');
    this.selectedSort.set('default');
    this.showInStockOnly.set(false);
    this.showOnSaleOnly.set(false);
    this.page = 1;
  }

  get hasActiveFilters(): boolean {
    return (
      this.searchQuery() !== '' ||
      this.selectedCategory() !== 'ALL' ||
      this.selectedSort() !== 'default' ||
      this.showInStockOnly() ||
      this.showOnSaleOnly()
    );
  }

  starsArray(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1);
  }
}

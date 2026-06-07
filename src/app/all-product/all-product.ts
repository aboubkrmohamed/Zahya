import { Product } from './product.model';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

@Component({
  selector: 'app-all-product',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './all-product.html',
  styleUrl: './all-product.scss',
})
export class AllProduct implements OnInit {
  private productService = inject(ProductService);

  // --- state ---
  searchQuery = signal('');
  selectedCategory = signal('ALL');
  selectedSort = signal<SortOption>('default');
  showInStockOnly = signal(false);
  showOnSaleOnly = signal(false);

  allProducts: Product[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.allProducts = this.productService.getAll();
    this.categories = ['ALL', ...this.productService.getCategories()];
  }

  // --- computed filtered list ---
  filteredProducts = computed(() => {
    let list = [...this.allProducts];

    // search
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // category
    if (this.selectedCategory() !== 'ALL') {
      list = list.filter((p) => p.category === this.selectedCategory());
    }

    // in-stock
    if (this.showInStockOnly()) {
      list = list.filter((p) => !p.outOfStock);
    }

    // on sale
    if (this.showOnSaleOnly()) {
      list = list.filter((p) => !!p.discount);
    }

    // sort
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

  // --- helpers ---
  onSearch(value: string) {
    this.searchQuery.set(value);
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  setSort(val: string) {
    this.selectedSort.set(val as SortOption);
  }

  toggleInStock() {
    this.showInStockOnly.update((v) => !v);
  }

  toggleOnSale() {
    this.showOnSaleOnly.update((v) => !v);
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('ALL');
    this.selectedSort.set('default');
    this.showInStockOnly.set(false);
    this.showOnSaleOnly.set(false);
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

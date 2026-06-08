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

  // --- pagination ---
  currentPage = signal(1);
  readonly pageSize = 10;

  allProducts: Product[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.allProducts = this.productService.getAll();
    this.categories = ['ALL', ...this.productService.getCategories()];
  }

  // --- كل المنتجات بعد الفلترة والـ sort (بدون pagination) ---
  filteredProducts = computed(() => {
    let list = [...this.allProducts];

    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
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

  // --- المنتجات اللي بتتعرض في الصفحة الحالية بس ---
  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  // --- عدد الصفحات الكلي ---
  totalPages = computed(() =>
    Math.ceil(this.filteredProducts().length / this.pageSize)
  );

  // --- أرقام الصفحات اللي بتظهر في الـ pagination ---
  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // عرض: 1 ... X X X ... N
    const pages: (number | '...')[] = [1];

    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('...');
    pages.push(total);

    return pages;
  });

  // --- helpers ---
  onSearch(value: string) {
    this.searchQuery.set(value);
    this.currentPage.set(1); // ارجع للأول عند البحث
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
    this.currentPage.set(1);
  }

  setSort(val: string) {
    this.selectedSort.set(val as SortOption);
    this.currentPage.set(1);
  }

  toggleInStock() {
    this.showInStockOnly.update((v) => !v);
    this.currentPage.set(1);
  }

  toggleOnSale() {
    this.showOnSaleOnly.update((v) => !v);
    this.currentPage.set(1);
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('ALL');
    this.selectedSort.set('default');
    this.showInStockOnly.set(false);
    this.showOnSaleOnly.set(false);
    this.currentPage.set(1);
  }

  goToPage(page: number | '...') {
    if (page === '...') return;
    this.currentPage.set(page);
    // scroll للأعلى عشان المستخدم يشوف المنتجات الجديدة
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  isNumber(val: number | '...'): val is number {
    return val !== '...';
  }
}

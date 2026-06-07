# تعليمات دمج الملفات في مشروع Zahya

## الملفات الجديدة اللي هتضيفها:

```
src/app/
├── models/
│   └── product.model.ts         ← interface المنتج
├── services/
│   └── product.service.ts       ← كل بيانات المنتجات هنا
└── all-product/
    ├── all-product.ts           ← component منقح كامل
    ├── all-product.html         ← template مع search + filters
    └── all-product.scss         ← styles متناسقة مع Zahya
```

---

## الخطوة 1 — أنشئ مجلد models

```
src/app/models/product.model.ts
```
انسخ محتوى product.model.ts

---

## الخطوة 2 — أنشئ مجلد services

```
src/app/services/product.service.ts
```
انسخ محتوى product.service.ts

---

## الخطوة 3 — استبدل ملفات all-product الـ 3

استبدل المحتوى الحالي لـ:
- `src/app/all-product/all-product.ts`
- `src/app/all-product/all-product.html`
- `src/app/all-product/all-product.scss`

---

## الخطوة 4 — أضف Bootstrap Icons في index.html

```html
<!-- في <head> في index.html -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
```

---

## الخطوة 5 — حدّث home.ts يستخدم الـ service

في `src/app/home/home.ts` — استبدل:

```typescript
// قبل:
import { Component } from '@angular/core';
// ...وكل بيانات المنتجات hard-coded

// بعد:
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  products: Product[] = [];
  featuredProducts: Product[] = [];

  ngOnInit() {
    this.products = this.productService.getAll();
    this.featuredProducts = this.products.slice(0, 8);
  }
}
```

---

## الخطوة 6 — صلح *ngIf في home.html

غيّر `*ngIf` القديمة لـ `@if` الجديدة:

```html
<!-- قبل: -->
<div class="out-stock" *ngIf="product.outOfStock">Out Of Stock</div>

<!-- بعد: -->
@if (product.outOfStock) {
  <div class="out-stock">Out Of Stock</div>
}
```

---

## ملاحظات مهمة

- الـ `ProductService` فيه `providedIn: 'root'` — مش محتاج تضيفه في app.config.ts
- الـ `computed()` في all-product.ts بيعمل الفلترة تلقائياً مع أي تغيير
- Bootstrap Icons محتاج الـ CDN link في index.html وإلا الأيقونات مش هتظهر

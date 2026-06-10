import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private translate = inject(TranslateService);

  currentLang = 'en';

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use(this.currentLang);
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = 'ltr';
  }

  changeLang(): void {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(this.currentLang);
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}

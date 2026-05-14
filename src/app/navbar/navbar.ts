  import { Component, inject, OnInit } from '@angular/core';
  import { TranslateModule, TranslateService } from '@ngx-translate/core';
  import { MatButtonModule } from '@angular/material/button';


  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';

  @Component({
    selector: 'app-navbar',
    imports: [TranslateModule,MatButtonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
  })
  export class Navbar implements OnInit {

    private translate = inject(TranslateService);

    currentLang = 'en';

    ngOnInit(): void {

      this.translate.setDefaultLang('en');

      this.translate.use(this.currentLang);

      document.documentElement.lang =
        this.currentLang;

      document.documentElement.dir =
        'ltr';
    }

    changeLang() {

      this.currentLang =
        this.currentLang === 'ar'
          ? 'en'
          : 'ar';

      this.translate.use(this.currentLang);

      document.documentElement.lang =
        this.currentLang;

      document.documentElement.dir =
        this.currentLang === 'ar'
          ? 'rtl'
          : 'ltr';
    }

    private fb =inject(FormBuilder)

    form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    submit() {
      alert(this.form.value)
    }
  }

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cs6';



  constructor(private translate: TranslateService) {
    translate.setDefaultLang('gb');
    translate.use('gb');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getLang(language: string): string {
    return this.translate.currentLang;
  }

}

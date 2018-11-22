import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorsComponent } from './errors/errors.component';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule,
  MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule,
  MatSidenavModule, MatListModule, MatSelectModule, MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

/*****************************
************ Spinner *********
******************************/
import { NgxSpinnerModule } from 'ngx-spinner';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SigninComponent } from './auth/signin/signin.component';
import { ResumeTableComponent } from './resume-table/resume-table.component';
import { RejectedsComponent } from './rejecteds/rejecteds.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { HttpCustomClient } from './services/httpCustom.service';
import { Cons } from './services/constants/cons';
import { Url } from './services/constants/url';
import { FooterComponent } from './footer/footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FooterComponent,
    ResumeTableComponent,
    RejectedsComponent,
    SigninComponent,
    AppComponent,
    ErrorsComponent,
    HomeComponent,
    HeaderComponent,
    ErrorPageComponent

  ],
  imports: [
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AuthService, AuthGuard, HttpCustomClient, Cons, Url],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdministrationComponent } from './routes/administration/administration.component';
import { MeetingsComponent } from './routes/meetings/meetings.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './routes/notfound/notfound.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

import { HttpErrorHandler } from './http-error-handling.service';
import { MeetingsService } from './services/meetings.service';
import { BbbComponent } from './components/bbb/bbb.component';

import { CommonModule } from '@angular/common';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.sanitize(SecurityContext.URL, url);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdministrationComponent,
    MeetingsComponent,
    NotfoundComponent,
    DashboardComponent,
    BbbComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [HttpErrorHandler, MeetingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

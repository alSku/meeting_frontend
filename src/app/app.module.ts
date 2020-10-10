import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdministrationComponent,
    MeetingsComponent,
    NotfoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [HttpErrorHandler, MeetingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

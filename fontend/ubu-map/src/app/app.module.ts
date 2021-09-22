import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OwlModule } from 'ngx-owl-carousel';
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { DialogDataComponent } from './toolbar/dialog-data/dialog-data.component';
import { DialogDataNameComponent } from './toolbar/dialog-data-name/dialog-data-name.component';
import { HomeComponent } from './layouts/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ViewComponent } from './layouts/view/view.component';
import { EditComponent } from './layouts/edit/edit.component';
import { FileListComponent } from './layouts/file-list/file-list.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { VideosComponent } from './layouts/videos/videos.component';

@NgModule({
  declarations: [
    AppComponent, 
    MapPageComponent, 
    LayoutComponent, 
    LoginComponent, 
    RegisterComponent, 
    ToolbarComponent, 
    DialogDataComponent, 
    DialogDataNameComponent, 
    HomeComponent, 
    AdminComponent, 
    ViewComponent, 
    EditComponent, 
    FileListComponent, 
    FooterComponent, 
    VideosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByxAxM_f64MaGCNie0y3joCJmUUA_TRZE',
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    OwlModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }

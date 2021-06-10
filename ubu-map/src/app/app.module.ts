import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [AppComponent, MapPageComponent, LayoutComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByxAxM_f64MaGCNie0y3joCJmUUA_TRZE',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

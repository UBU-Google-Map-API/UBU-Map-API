import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthGuard } from "./services/auth-guard.service";
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './layouts/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ViewComponent } from './layouts/view/view.component';
import { EditComponent } from './layouts/edit/edit.component';
import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
  { path: '', component:  MainComponent},
  { path: 'map', component: MapPageComponent, },
  { path: 'detail/:name', component: LayoutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard]},
  { path: 'views/:id', component: ViewComponent,canActivate: [AuthGuard]},
  { path: 'edit/:name', component: EditComponent,canActivate: [AuthGuard]},
  { path: 'signup', component: RegisterComponent,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: "**", redirectTo: "" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  AdminComponent,
  ViewComponent,
  EditComponent
]

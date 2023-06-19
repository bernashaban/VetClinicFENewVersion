import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListingComponent } from './userlisting/user-listing.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import {AppRouterModule} from "../app-routing.module";
import {AddAppointmentComponent} from "./appointments-all/add-appointment/add-appointment.component";
import {AssistanceListComponent} from "./assistances-all/assistance-list/assistance-list.component";
import {ArticleListComponent} from "./articles-all/article-list/article-list.component";
import {OwnerProfilePageComponent} from "./profile-pages/owner-profile-page/owner-profile-page.component";
import {AdminProfilePageComponent} from "./profile-pages/admin-profile-page/admin-profile-page.component";
import {VetProfilePageComponent} from "./profile-pages/vet-profile-page/vet-profile-page.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserListingComponent,
    UpdatepopupComponent,
    AddAppointmentComponent,
    AssistanceListComponent,
    ArticleListComponent,
    OwnerProfilePageComponent,
    AdminProfilePageComponent,
    VetProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

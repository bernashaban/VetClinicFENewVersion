import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from "ngx-toastr";
import { HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListingComponent } from './userlisting/user-listing.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { MaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRouterModule} from "../app-routing.module";
import { AddAppointmentComponent} from "./appointments-all/add-appointment/add-appointment.component";
import { AssistanceListComponent} from "./assistances-all/assistance-list/assistance-list.component";
import { ArticleListComponent} from "./articles-all/article-list/article-list.component";
import { OwnerProfilePageComponent} from "./profile-pages/owner-profile-page/owner-profile-page.component";
import { AdminProfilePageComponent} from "./profile-pages/admin-profile-page/admin-profile-page.component";
import { VetProfilePageComponent} from "./profile-pages/vet-profile-page/vet-profile-page.component";
import { AddArticlePopupComponent } from './articles-all/add-article-popup/add-article-popup.component';
import { UpdateArticlePopupComponent } from './articles-all/update-article-popup/update-article-popup.component';
import { AddAssistancePopupComponent } from './assistances-all/add-assistance-popup/add-assistance-popup.component';
import { UpdateAssistancePopupComponent } from './assistances-all/update-assistance-popup/update-assistance-popup.component';
import { AddPetPopupComponent } from './pet-all/add-pet-popup/add-pet-popup.component';
import { UpdatePetPopupComponent } from './pet-all/update-pet-popup/update-pet-popup.component';
import { MatDividerModule} from "@angular/material/divider";
import { UpdatePopupPersonalInfoComponent } from './update-popup-personal-info/update-popup-personal-info.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import { AddDescriptionPopUpComponent } from './appointments-all/add-description-pop-up/add-description-pop-up.component';
import { UpdateAppointmentPopupComponent } from './appointments-all/update-appointment-popup/update-appointment-popup.component';
import { AdditionalVetInfoPopupComponent } from './vet-all/additional-vet-info-popup/additional-vet-info-popup.component';


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
    VetProfilePageComponent,
    AddArticlePopupComponent,
    UpdateArticlePopupComponent,
    AddAssistancePopupComponent,
    UpdateAssistancePopupComponent,
    AddPetPopupComponent,
    UpdatePetPopupComponent,
    UpdatePopupPersonalInfoComponent,
    AddDescriptionPopUpComponent,
    UpdateAppointmentPopupComponent,
    AdditionalVetInfoPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./app/home/home.component";
import {RegisterComponent} from "./app/register/register.component";
import {LoginComponent} from "./app/login/login.component";
import {UserListingComponent} from "./app/userlisting/user-listing.component";
import {AuthGuard} from "./app/guard/auth.guard";
import {AddAppointmentComponent} from "./app/appointments-all/add-appointment/add-appointment.component";
import {AssistanceListComponent} from "./app/assistances-all/assistance-list/assistance-list.component";
import {ArticleListComponent} from "./app/articles-all/article-list/article-list.component";
import {OwnerProfilePageComponent} from "./app/profile-pages/owner-profile-page/owner-profile-page.component";
import {AdminProfilePageComponent} from "./app/profile-pages/admin-profile-page/admin-profile-page.component";
import {VetProfilePageComponent} from "./app/profile-pages/vet-profile-page/vet-profile-page.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'add-appointment',component:AddAppointmentComponent},
  {path:'list-services',component:AssistanceListComponent},
  {path:'list-articles',component:ArticleListComponent},
  {path:'owner-profile-page',component:OwnerProfilePageComponent},
  {path:'admin-profile-page',component:AdminProfilePageComponent},
  {path:'vet-profile-page',component:VetProfilePageComponent},
  {path:'user',component:UserListingComponent,canActivate:[AuthGuard]},
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRouterModule{}

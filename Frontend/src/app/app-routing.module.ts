import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CategoryComponent } from './category/category.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { LoginComponent } from './login/login.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';
import { SignupComponent } from './signup/signup.component';
import { SingleblogComponent } from './singleblog/singleblog.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';

const routes: Routes = [
  {path:'',component:BlogComponent},
  {path:'singleblog',component:SingleblogComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'superadmin',component:SuperadminComponent},
  {path:'createpost',component:CreatepostComponent},
  {path:'managecategory',component:ManagecategoryComponent},
  {path:'category/:cat',component:CategoryComponent},
  {path:'updateblog',component:UpdateblogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

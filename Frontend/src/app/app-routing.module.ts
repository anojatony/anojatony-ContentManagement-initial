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
import { YourpostsComponent } from './yourposts/yourposts.component';

const routes: Routes = [
  {path:'blog',component:BlogComponent},
  {path:'singleblog',component:SingleblogComponent},
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'superadmin',component:SuperadminComponent},
  {path:'createpost',component:CreatepostComponent},
  {path:'managecategory',component:ManagecategoryComponent},
  {path:'category/:cat',component:CategoryComponent},
  {path:'updateblog',component:UpdateblogComponent},
  {path:'yourposts',component:YourpostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

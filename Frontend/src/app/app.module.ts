import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import{HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { BlogComponent } from './blog/blog.component';
import { TokenInterceptorService} from './token-interceptor.service';
import { BlogService } from './blog.service';
import { AuthService } from './auth.service';
import { CreatepostComponent } from './createpost/createpost.component';
import { CategoryComponent } from './category/category.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';
import { SingleblogComponent } from './singleblog/singleblog.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';
import { FooterComponent } from './footer/footer.component';
import { YourpostsComponent } from './yourposts/yourposts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SuperadminComponent,
    BlogComponent,
    CreatepostComponent,
    CategoryComponent,
    ManagecategoryComponent,
    SingleblogComponent,
    UpdateblogComponent,
    FooterComponent,
    YourpostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [BlogService,AuthService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

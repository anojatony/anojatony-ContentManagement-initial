import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.css']
})
export class ManagecategoryComponent implements OnInit {

cat:any
toggle:Boolean=false;
updatetoggle:Boolean=false;
event:any;
updatecategory:any;
checkIfOthersAreSelected:Boolean = false;
cate:any

categorys=[{
  catname:''
}]

updatecate={
  catname:''
}

  constructor(public blogService:BlogService, private router:Router) { }

  ngOnInit(): void {
    this.blogService.getCategory().subscribe((data)=>{
    this.categorys=JSON.parse(JSON.stringify(data));
    })

    let categoryid = localStorage.getItem("editcategoryid");
    this.blogService.updateCat(categoryid).subscribe((data)=>{
    this.updatecate=JSON.parse(JSON.stringify(data));
  })

  }

addcat(){
this.toggle=true;
}

add(){
  this.toggle=false;
  console.log(this.cat)
  this.blogService.addcat(this.cat);
  this.cat='';
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/managecategory']);
}

check(category:any){
  this.updatecategory=category._id;
  this.cate=category;

}

change(event:any){
  this.event=event.target.checked;
  this.checkIfOthersAreSelected = true;
  
}

update(){

  if(this.event){
    localStorage.setItem("editcategoryid", this.updatecategory.toString());
    this.updatetoggle=true;

    }
  
    else{
      alert("Choose a Category and Click Update");
    }

}

updatecat(){
this.updatetoggle=false;
this.blogService.updateCategory(this.updatecate.catname,this.updatecategory)
this.updatecate.catname='';
alert("Updated Successfully");
this.router.routeReuseStrategy.shouldReuseRoute = () => false;
this.router.onSameUrlNavigation = 'reload';
this.router.navigate(['/managecategory']);
}
anothercat(){
this.router.routeReuseStrategy.shouldReuseRoute = () => false;
this.router.onSameUrlNavigation = 'reload';
this.router.navigate(['/managecategory']);
}

delete(){
  if(this.event){
        this.blogService.deleteCat(this.updatecategory)
        alert("Deleted Successfully");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/managecategory']);
  }
  else{
    alert("Choose a Blog Post");
  }
 

}

logout()
{
localStorage.removeItem('rootuser');
localStorage.removeItem('userid');
localStorage.removeItem('admin');
this.router.navigate(['/']);
}


}

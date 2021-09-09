import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts=[{
    id:'',
    title:'',
    author:'',
    email:'',
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:''
  }]

  user={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    role:''
  }

  categorys=[{
    catname:''
  }]

 

  constructor(public blogService:BlogService,private router:Router) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((data)=>{
      this.posts=JSON.parse(JSON.stringify(data));
    })

    this.blogService.getCategory().subscribe((data)=>{
      this.categorys=JSON.parse(JSON.stringify(data));
        })

        let userid = localStorage.getItem("userid");
        this.blogService.getuser(userid).subscribe((data)=>{
        this.user=JSON.parse(JSON.stringify(data));
        })

  }

  
singleBlog(post:any){
  localStorage.setItem("singleblog", post._id.toString());
  this.router.navigate(['singleblog']);
}

update(post:any){
  localStorage.setItem("updateblog", post._id.toString());
   this.router.navigate(['updateblog']);
  // let admin=localStorage.getItem("admin")
  // if(admin!=null){
  //   this.router.navigate(['updateblog']);
  // }
  // else if(this.user.email==post.email){
  //   this.router.navigate(['updateblog']);
  // }
  // else if(this.user.email!=post.email){
  //   alert("You are not the owner of this post!")
  // }
}
  


delete(post:any){

    this.blogService.deleteBlog(post._id)
    .subscribe((data) => {
     this.posts = this.posts.filter(p => p !== post);
    })
    alert("Deleted Successfully");
  
}


logout()
{
localStorage.removeItem('rootuser');
localStorage.removeItem('userid');
localStorage.removeItem('admin');
this.router.navigate(['/login']);
}

}

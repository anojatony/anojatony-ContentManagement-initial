import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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

cat:any;

  constructor(public blogService:BlogService, private router: ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.cat=params.cat;
      console.log(this.cat)  
      this.blogService.searchCategory(this.cat).subscribe((data)=>{
        this.posts=JSON.parse(JSON.stringify(data));
      })
    });

    let userid = localStorage.getItem("userid");
        this.blogService.getuser(userid).subscribe((data)=>{
        this.user=JSON.parse(JSON.stringify(data));
        })


  }

  singleBlog(post:any){
    localStorage.setItem("singleblog", post._id.toString());
    this._router.navigate(['singleblog']);
  }

  update(post:any){
    localStorage.setItem("updateblog", post._id.toString());
     this._router.navigate(['updateblog']);
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
  this._router.navigate(['/']);
  }


}

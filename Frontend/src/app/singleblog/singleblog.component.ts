import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.css']
})
export class SingleblogComponent implements OnInit {

  post={
    id:'',
    title:'',
    author:'',
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:''
  }

  categorys=[{
    catname:''
  }]

  constructor(public blogService:BlogService, private router:Router) { }

  ngOnInit(): void {
    let postid = localStorage.getItem("singleblog");
    this.blogService.getBlog(postid).subscribe((data)=>{
      this.post=JSON.parse(JSON.stringify(data));
  })

  this.blogService.getCategory().subscribe((data)=>{
  this.categorys=JSON.parse(JSON.stringify(data));
      })

  }

  logout()
  {
  localStorage.removeItem('rootuser');
  localStorage.removeItem('userid');
  localStorage.removeItem('admin');
  this.router.navigate(['/']);
  }

}

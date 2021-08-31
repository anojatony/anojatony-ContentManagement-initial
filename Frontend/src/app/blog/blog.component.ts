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
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:''
  }]

  constructor(private blogService:BlogService,private router:Router) { }

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((data)=>{
      this.posts=JSON.parse(JSON.stringify(data));
    })

  }

}

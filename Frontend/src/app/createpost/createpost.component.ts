import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  posts={
    title:'',
    author:'',
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:''
  }
  name = 'ng2-ckeditor'; 
  ckeConfig:any;

  cats=["JavaScript","HTML","CSS","Full Stack Development","Others"];

  constructor(private blogService:BlogService, private router:Router) { }

  ngOnInit(): void {

    this.ckeConfig = {    
            allowedContent: false,    
            extraPlugins: 'divarea',    
            forcePasteAsPlainText: true    
          };   
  }

  selectImage(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.posts.image=file;
    }
     }

     selectCat(event:any){
     this.posts.category=event.target.value;
       }
   
     createpost(){
       const formData=new FormData();
       formData.append('image', this.posts.image)
       formData.append('title',this.posts.title)
       formData.append('author',this.posts.author)
       formData.append('introduction',this.posts.introduction)
       formData.append('content',this.posts.content)
       formData.append('category',this.posts.category)
       formData.append('date',this.posts.date)
       this.blogService.newPost(formData);
       console.log("Called");
       alert("Thank you, your post be will be uploaded soon!!!");
       this.router.navigate(['/']);
     }

}

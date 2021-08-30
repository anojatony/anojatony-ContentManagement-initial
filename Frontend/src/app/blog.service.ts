import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get("http://localhost:8000/users")
  }

  // approve admin

  approve(user:any){
    return this.http.put("http://localhost:8000/approve",user)
    .subscribe(data=>{
      console.log(data);
    })
  }



// deleteadmin

delete(user:any){
  return this.http.put("http://localhost:8000/deleteadmin",user)
  .subscribe(data=>{
    console.log(data);
  })
}

//new post
newPost(post:any){
  return this.http.post("http://localhost:8000/post", post)
  .subscribe(data=>{console.log(data)})
}


}

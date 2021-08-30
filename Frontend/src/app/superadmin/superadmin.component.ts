import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  users=[{
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    role:''
  }]

  approvedisable:Boolean=true;

  constructor(private blogService:BlogService,private router:Router) { }

  ngOnInit(): void {

    this.blogService.getUsers().subscribe((data)=>{
      this.users=JSON.parse(JSON.stringify(data));
    })

  }

  approve(user:any){
    this.blogService.approve(user);
    alert("Approved successfully");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/superadmin']);


  }

  delete(user:any){
    this.blogService.delete(user);
    alert("Deleted successfully");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/superadmin']);
  }

  logout()
  {
  localStorage.removeItem('rootuser');
  localStorage.removeItem('user');
  localStorage.removeItem('admin');
  this.router.navigate(['/']);
  }

}

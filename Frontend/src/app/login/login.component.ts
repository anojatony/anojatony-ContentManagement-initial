import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    role:''
  }

  constructor(private auth:AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.auth.loginUser(this.user)
   .subscribe(
    (res:any) => {
    
    if(res.rootuser){
    localStorage.setItem('rootuser', res.rootuser)
    this._router.navigate(['/superadmin'])
    }
    else if(res.user){
      localStorage.setItem('user', res.user)
      this._router.navigate(['/'])
    }
    else if(res.token){
      localStorage.setItem('admin', res.token)
      this._router.navigate(['/'])
    }
  },
  (err:any) => {

    if(err.status === 401){
    alert("Invalid Email or Password! Please try again.")
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/login']);
    }
  }
) 
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css'],
})
export class SuperadminComponent implements OnInit {
  users = [
    {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      role: '',
    },
  ];

  approvedisable: Boolean = true;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getUsers().subscribe((data) => {
      this.users = JSON.parse(JSON.stringify(data));
    });
  }

  approve(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve admin privilege for this account!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.approve(user);
        // alert("Approved successfully");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/superadmin']);

        //
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Approved successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.router.navigate(['/superadmin']);
      }
    });
  }

  delete(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete admin privilege for this account!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.delete(user);
        // alert("Deleted successfully");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/superadmin']);

        //
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Removed successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.router.navigate(['/superadmin']);
      }
    });
  }

  logout() {
    localStorage.removeItem('rootuser');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }
}

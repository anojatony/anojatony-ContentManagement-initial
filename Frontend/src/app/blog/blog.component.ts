import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts = [
    {
      id: '',
      title: '',
      author: '',
      email: '',
      introduction: '',
      content: '',
      category: '',
      date: '',
      image: '',
    },
  ];

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  };

  categorys = [
    {
      catname: '',
    },
  ];

  constructor(public blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((data) => {
      this.posts = JSON.parse(JSON.stringify(data));
    });

    this.blogService.getCategory().subscribe((data) => {
      this.categorys = JSON.parse(JSON.stringify(data));
    });

    let userid = localStorage.getItem('userid');
    this.blogService.getuser(userid).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
    });
  }

  singleBlog(post: any) {
    localStorage.setItem('singleblog', post._id.toString());
    this.router.navigate(['singleblog']);
  }

  update(post: any) {
    localStorage.setItem('updateblog', post._id.toString());
    this.router.navigate(['updateblog']);
  }

  delete(post: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete the post!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(post._id).subscribe((data) => {
          this.posts = this.posts.filter((p) => p !== post);
        });

        // Swal.fire('Deleted!','Your imaginary file has been deleted.','success')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.router.navigate(['/blog']);
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

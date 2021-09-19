import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.css'],
})
export class ManagecategoryComponent implements OnInit {
  cat: any;
  updatetoggle: Boolean = false;
  event: any;
  updatecategory: any;
  checkIfOthersAreSelected: Boolean = false;
  cate: any;

  categorys = [
    {
      catname: '',
    },
  ];

  updatecate = {
    catname: '',
  };

  constructor(public blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getCategory().subscribe((data) => {
      this.categorys = JSON.parse(JSON.stringify(data));
    });

    //   let categoryid = localStorage.getItem("editcategoryid");
    //   this.blogService.updateCat(categoryid).subscribe((data)=>{
    //   this.updatecate=JSON.parse(JSON.stringify(data));
    // })
  }

  add() {
    this.blogService.addcat(this.cat);
    this.cat = '';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/managecategory']);
  }

  check(category: any) {
    this.updatecategory = category._id;
    this.cate = category;
  }

  change(event: any) {
    this.event = event.target.checked;
    this.checkIfOthersAreSelected = true;
  }

  update() {
    if (this.event) {
      localStorage.setItem('editcategoryid', this.updatecategory.toString());
      this.updatetoggle = true;
      let categoryid = localStorage.getItem('editcategoryid');
      this.blogService.updateCat(categoryid).subscribe((data) => {
        this.updatecate = JSON.parse(JSON.stringify(data));
      });
    } else {
      alert('Choose a Category and Click Update');
    }
  }

  updatecat() {
    this.updatetoggle = false;
    this.blogService.updateCategory(
      this.updatecate.catname,
      this.updatecategory
    );
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Updated successfully',
      showConfirmButton: false,
      timer: 1500,
    });
    // alert("Updated Successfully");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/managecategory']);
  }
  // anothercat(){
  // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  // this.router.onSameUrlNavigation = 'reload';
  // this.router.navigate(['/managecategory']);
  // }

  delete() {
    if (this.event) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this category!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.blogService.deleteCat(this.updatecategory);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/managecategory']);

          // Swal.fire('Deleted!','Your imaginary file has been deleted.','success')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Deleted successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/managecategory']);
        }
      });
    } else {
      alert('Choose a category and Click Delete');
    }
  }

  logout() {
    localStorage.removeItem('rootuser');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }
}

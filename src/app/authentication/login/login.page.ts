import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';
import {StorageService} from '../storage.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading = false;
  constructor(private authService : AuthenticationService, private router : Router, private storageService : StorageService) { }

  ngOnInit() {
    
  }
  login(form){
    this.loading = true;
    this.authService.authenticate(form.value).subscribe(
      (res)=>{
        console.log(res);
        this.storageService.storeJWToken(res.token).then(() => {
          this.loading = false;
          this.router.navigateByUrl('dashboard')
        });


      },
      (err) => {
        console.log(err);
      }
      );
  }
}

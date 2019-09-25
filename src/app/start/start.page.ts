import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StorageService} from '../authentication/storage.service'; 
import { AuthenticationService } from '../authentication/authentication.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  private loading = true;
  constructor(private router : Router, private storageService : StorageService, private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.storageService.getJWToken().then( token => {
      if(token == null) this.router.navigateByUrl('/login');
      else {
        this.authenticationService.verify({"token" : token}).subscribe(
          (res)=>{
            console.log(res);
            this.loading=false
            this.router.navigateByUrl("/dashboard");
    
          },
          (err) => {
            console.log(err);
          }
        )
      } 
    });
  }

}

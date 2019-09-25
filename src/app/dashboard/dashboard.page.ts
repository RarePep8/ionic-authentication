import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import {StorageService} from '../authentication/storage.service';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private decodedString;
  private jwtoken;
  constructor(private router : Router, private storageService : StorageService) {

   }

  ngOnInit() {
    console.log("???");
    this.router.events.subscribe(
      (event: Event) => {
             if (event instanceof NavigationEnd && event.urlAfterRedirects == "/dashboard") {
                  this.storageService.getJWToken().then(token => {
                    this.jwtoken = token
                    this.decodedString = jwt_decode(token);
                  });
             }
      });
  }
  logout() {
    this.storageService.clearJWToken().then(() => {
      console.log("cleared");
      this.router.navigateByUrl('login')
    });
  }

}

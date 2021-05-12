import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoArtistLogin(){
    this.router.navigateByUrl('/artist-login');
  }

  gotoUserLogin(){
    this.router.navigateByUrl('/user-login');

  }
}

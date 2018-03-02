import { Component, OnInit } from '@angular/core';
import { SessionService } from "./../services/session.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-private-page',
  templateUrl: './my-private-page.component.html',
  styleUrls: ['./my-private-page.component.css']
})
export class MyPrivatePageComponent implements OnInit {
  BASE_URL: string = 'http://localhost:3000';
  currentUser: any;
  error: string;

  constructor(private session: SessionService, private router: Router ) { }

  ngOnInit() {
    this.session.isLogged()
      .subscribe(
      (user) => {
        if (!user) {
          this.router.navigate(['/login']);
        } else {
          this.currentUser = user;
        }
      });
  }
}

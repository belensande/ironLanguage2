import { Component, OnInit } from '@angular/core';
import { SessionService } from "./../services/session.service";
import { MeetupService } from "./../services/meetup.service";
import { CollectionsService } from "./../services/collections.service";
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.css']
})
export class MeetupComponent implements OnInit {
  error: String;
  meetupInfo: any = {
		description: "",
		place: ""
  };
  date: Date;
  city: String = "";
  languages: String[] = [];
  now: Date = new Date();

  cities: String[];
  availableLanguages: String[];

  constructor(private meetupService: MeetupService, private session: SessionService, private collectionsService: CollectionsService, private router: Router) { }

  ngOnInit() {
    this.session.isLogged()
      .subscribe(
      (user) => {
        if (!user) {
          this.router.navigate(['/login']);
        } else {

          this.collectionsService.getLanguages()
            .subscribe(
            (languages) => {
              this.availableLanguages = languages;
            });

          this.collectionsService.getCities()
            .subscribe(
            (cities) => {
              this.cities = cities;
            });
        }
      });
  }

  toogleSelectedLanguage(language: string) {
    this.languages = _.indexOf(this.languages, language) == -1 ? _.union(this.languages, [language]) : _.without(this.languages, language);
  }

  create() {
    if (!this.meetupInfo.description || !this.meetupInfo.place || ! this.date) {
      this.error = "Description, place and date are mandatory";
    } else {
      delete this.meetupInfo['languages'];
      delete this.meetupInfo['city'];
      delete this.meetupInfo['date'];

      if (this.city) {
        this.meetupInfo['city'] = this.city;
      }
      if (this.languages.length) {
        this.meetupInfo['languages'] = JSON.stringify(this.languages);
      }
      if (this.date) {
        this.meetupInfo['date'] = this.date;
      }

      this.meetupService.create(this.meetupInfo)
        .subscribe(
        (meetup) => { this.router.navigate(['/meetup/list']); },
        (err) => { this.error = err; });
    }

  }

}

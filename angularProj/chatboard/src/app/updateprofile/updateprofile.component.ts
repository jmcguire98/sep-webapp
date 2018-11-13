import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Profile } from './../domain/models/profile';
import { AlertService } from '../domain/services/alert.service';
import { Router } from '@angular/router';
import { ProfileRepository } from '../domain/profile-repository.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  @Input()
  public profile: Profile;
  public currentUser: Profile;

  constructor(
    private alertService: AlertService,
    public router: Router,
    public profileRepository: ProfileRepository,
  ) {

   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);
    // I'm uncertain that the entire user is stored locally, should be a route.
    this.profileRepository.getAccount(this.currentUser.username).subscribe(user => {
      this.currentUser = user;
      this.currentUser.track = user.track;
    });
    this.profile = {};
  }


  update() {
    if (!(this.profile.email)) {
      this.profile.email = this.currentUser.email;
    }
    if (!(this.profile.firstname)) {
      console.log('here');
      this.profile.firstname = this.currentUser.firstname;
    }
    if (!this.profile.lastname) {
      this.profile.lastname = this.currentUser.lastname;
    }
    if (!this.profile.track) {
      this.profile.track = this.currentUser.track;
    }
      console.log(this.profile);
      this.profileRepository.update(`/api/updateProfile/${this.currentUser.username}`, this.profile).subscribe(x => {
      this.alertService.clear();
      this.alertService.success('Your profile has been updated');
      this.router.navigateByUrl(`/home/profile/${this.currentUser.username}`);
    });
    // console.log(this.profile);
    this.profile = {};
  }

}

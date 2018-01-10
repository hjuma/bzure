import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout().subscribe(response => {
      return this.router.navigate(['/login']);
    });
  }

  get isSuperUser() {
    return this.authenticationService.isSuperUser;
  }

  get isDataUser() {
    return this.authenticationService.isDatarUser;
  }

}

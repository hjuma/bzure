import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-no-application-data',
  templateUrl: './no-application-data.component.html',
  styleUrls: ['./no-application-data.component.scss']
})
export class NoApplicationDataComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  get isSuperUser() {
    return this.authenticationService.isSuperUser;
  }


}

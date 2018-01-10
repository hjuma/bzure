import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { Role } from '../../core/models/role';
import { BusinessUnit } from '../../core/models/business-unit';
import { UserService } from '../../core/services/user.service';
import { ToasterService } from 'angular2-toaster';
import { PasswordValidation } from './password-validation';
import { BusinessUnits } from '../../core/constants/business-units';
import { Roles } from '../../core/constants/roles';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  users: Array<User>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, private userService: UserService, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.initializeUserList();
  }

  private initializeUserList() {
    this.userService.getUsers().subscribe((response: Array<User>) => {
      this.users = response;
    });
  }

















}

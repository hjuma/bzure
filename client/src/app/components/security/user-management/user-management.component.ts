import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PasswordValidation } from '../password-validation';
import { BusinessUnits } from '../../../core/constants/business-units';
import { Roles } from '../../../core/constants/roles';
import { Role } from '../../../core/models/role';
import { BusinessUnit } from '../../../core/models/business-unit';
import { ToasterService } from 'angular2-toaster';
import { CanComponentDeactivate } from '../../../core/guards/can-component-deactivate';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, CanComponentDeactivate  {

    isNew: boolean;
    user: User;
    userForm: FormGroup;
    businessUnits: Array<BusinessUnit>;
    roles: Array<Role>;
    status: boolean;
    submitted: boolean;
    originalUser: User;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private toasterService: ToasterService) { }

    ngOnInit() {
        this.initializeForm();
        this.businessUnits = BusinessUnits;
        this.roles = Roles;

        this.isNew =  this.route.snapshot.data['isNew'];

        if (!this.isNew) {
            this.user = this.route.snapshot.data['user'];
            this.originalUser = JSON.parse(JSON.stringify(this.user));
            this.userForm.controls['password'].setErrors(null);
            this.userForm.controls['confirmPassword'].setErrors(null);
            this.status = (this.user.status === 'active');
        } else {
            this.user = this.initializeCurrentUser();
        }

    }

    discardChanges() {
      if (this.isNew) {
        this.initializeForm();
        this.initializeCurrentUser();
      } else {
        this.user = this.originalUser;
        this.originalUser = JSON.parse(JSON.stringify(this.user));
      }
        this.userForm.markAsUntouched();
        this.userForm.markAsPristine();
    }

    canDeactivate() {
      return !this.userForm.dirty;
    }

    private initializeForm() {
        this.userForm = this.formBuilder.group({
                username: ['', Validators.required],
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                email: ['', Validators.email],
                businessunit: ['', Validators.required],
                role: ['', Validators.required],
                status: [''],
                password: [''],
                confirmPassword: ['']
            }, {
                validator: PasswordValidation.MatchPassword
            }
        );
    }

    private initializeCurrentUser() {
        return {
            id: null,
            business_unit_id: null,
            BusinessUnit: null,
            Role: null,
            role_id: null,
            first_name: null,
            last_name: null,
            username: null,
            password: null,
            confirm_password: null,
            email: null,
            last_login: null,
            status: 'active',
            created_at: null,
            updated_at: null,
        };
    }

    get errors() {
      return this.getFormValidationErrors();
    }

    private getFormValidationErrors(): string {
        let errors = '';
        Object.keys(this.userForm.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.userForm.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    errors += key + ' is ' + keyError + ',' + controlErrors[keyError] + '<br>';
                });
            }
        });
        return errors;
    }
    onStatusChange(event: Event) {
        const checked = event.target['checked'];
        this.user.status = (checked) ? 'active' : 'inactive';
    }

    changeBusinessUnit(even: Event, id: any) {
        const selectedIndex = event.target['selectedIndex'];
        this.user.BusinessUnit = this.businessUnits.filter(business =>
            business.id === selectedIndex
        )[0];
    }

    changeRoleDetails(event: Event, id: any) {
        const selectedIndex = event.target['selectedIndex'];
        this.user.Role = this.roles.filter(role =>
            role.id === selectedIndex
        )[0];
    }

    private generatePayload(currentUser: User) {
        const user: any = {};
        user['business_unit_id'] = currentUser.business_unit_id;
        user['role_id'] = currentUser.role_id;
        user['first_name'] = currentUser.first_name;
        user['last_name'] = currentUser.last_name;
        user['username'] = currentUser.username;
        user['email'] = currentUser.email;
        user['status'] = currentUser.status;
        if (this.isNew) {
            user['password'] = currentUser.password;
        }
        if (!this.isNew) {
            user['id'] = currentUser.id;
        }
        return user;
    }

    saveUser() {
        this.submitted = true;
        if (this.userForm.valid) {
            const payload = this.generatePayload(this.user);
            if (this.isNew) {
                this.userService.addUser(payload).subscribe((response) => {
                    this.toasterService.pop('success', response.message);
                    this.userForm.markAsUntouched();
                    this.userForm.markAsPristine();
                    this.router.navigate(['/home/security']);
                });
            } else {
                this.userService.saveUser(payload).subscribe((response) => {
                    this.toasterService.pop('success', response.message);
                    this.userForm.markAsUntouched();
                    this.userForm.markAsPristine();
                    this.router.navigate(['/home/security']);
                });
            }

        } else {
            this.toasterService.pop('error', this.getFormValidationErrors());
        }
    }

}

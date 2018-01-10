import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder,
                private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(response => {
                if (response === true) {
                    const redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/';
                    return this.router.navigate([redirect]);
                } else {
                    this.loginForm.controls['password'].setValue('');
                }
            });
    }

}

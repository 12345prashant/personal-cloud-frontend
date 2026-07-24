import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({

    selector: 'app-login',

    standalone: true,

    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],

    templateUrl: './login.component.html',

    styleUrls: ['./login.component.css']

})
export class LoginComponent {

    email = '';

    password = '';

    loading = false;

    error = '';

    constructor(

        private authService: AuthService,

        private router: Router

    ) {
    }

    login() {

        this.error = '';

        this.loading = true;

        this.authService.login({

            email: this.email,

            password: this.password

        }).subscribe({

            next: (response) => {

                this.loading = false;

                this.authService.saveToken(
                    response.token
                );

                this.router.navigate(['/']);

            },

            error: (err) => {

                this.loading = false;

                this.error =
                        err.error?.message ??
                        "Invalid credentials";

            }

        });

    }

}
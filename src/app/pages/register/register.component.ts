import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    name = '';

    email = '';

    password = '';

    loading = false;

    error = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    register() {

        this.error = '';

        this.loading = true;

        this.authService.register({

            name: this.name,

            email: this.email,

            password: this.password

        }).subscribe({

            next: (response) => {

                this.loading = false;

                alert(response.message);

                this.router.navigate(['/login']);

            },

            error: (err) => {

                this.loading = false;

                this.error =
                    err.error?.message ??
                    'Registration failed';

            }

        });

    }

}
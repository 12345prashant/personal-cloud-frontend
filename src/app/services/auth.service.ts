import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterRequest } from '../shared/models/register-request';
import { RegisterResponse } from '../shared/models/register-response';
import { LoginRequest } from '../shared/models/login-request';
import { LoginResponse } from '../shared/models/login-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly BASE_URL =
        `${environment.apiUrl}/api/v1/auth`;

    constructor(
        private http: HttpClient
    ) {}

    register(
        request: RegisterRequest
    ): Observable<RegisterResponse> {

        return this.http.post<RegisterResponse>(
            `${this.BASE_URL}/register`,
            request
        );

    }

    login(
        request: LoginRequest
    ) {

        return this.http.post<LoginResponse>(
            `${this.BASE_URL}/login`,
            request
        );

    }

    saveToken(token: string) {

        localStorage.setItem('token', token);

    }

    getToken(): string | null {

        return localStorage.getItem('token');

    }

    logout() {

        localStorage.removeItem('token');

    }

    isLoggedIn(): boolean {

        return this.getToken() != null;

    }

}
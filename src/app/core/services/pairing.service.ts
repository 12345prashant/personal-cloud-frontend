import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PairingService {

    private readonly BASE_URL =
        `${environment.apiUrl}/api/v1/pairing`;

    constructor(
        private http: HttpClient
    ) {}

    generateCode() {

        return this.http.post<any>(
            `${this.BASE_URL}/create`,
            {}
        );

    }

}
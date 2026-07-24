import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { DashboardResponse } from '../../shared/models/dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private readonly BASE_URL =
        `${environment.apiUrl}/api/v1/dashboard`;

    constructor(
        private http: HttpClient
    ) {}

    getDashboard(): Observable<DashboardResponse> {

        return this.http.get<DashboardResponse>(
            this.BASE_URL
        );

    }

}
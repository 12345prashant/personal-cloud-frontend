import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { DashboardService } from '../../core/services/dashboard.service';

import { PairingService } from '../../core/services/pairing.service';

import { DashboardResponse } from '../../shared/models/dashboard.model';

@Component({

    selector: 'app-dashboard',

    standalone: true,

    imports: [
        RouterLink,
        CommonModule
    ],

    templateUrl: './dashboard.component.html',

    styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

    dashboard?: DashboardResponse;

   pairingCode?: string;

    countdown = 0;

    loading = true;

    constructor(

        private dashboardService: DashboardService,

        private pairingService: PairingService

    ) {}

    ngOnInit(): void {

        this.loadDashboard();

    }

    loadDashboard() {

        this.dashboardService
            .getDashboard()
            .subscribe(response => {

                this.dashboard = response;

                this.loading = false;

            });

    }

    generateCode() {
        console.log("Generating pairing code...");
        this.pairingService
            .generateCode()
            .subscribe((response: any) => {


              console.log("SUCCESS", response);
                this.pairingCode = response.code;

                this.startTimer();

            });

    }

    startTimer() {

        this.countdown = 300;

        const timer = setInterval(() => {

            this.countdown--;

            if (this.countdown <= 0) {

                clearInterval(timer);

                this.pairingCode = undefined;

            }

        }, 1000);

    }

    getProgress(node: any): number {

        return (node.usedSpace / node.totalSpace) * 100;

    }

    formatGB(bytes: number): string {

        return (bytes / 1024 / 1024 / 1024)
            .toFixed(1);

    }
    getFormattedTime(): string {

    const minutes = Math.floor(this.countdown / 60);

    const seconds = this.countdown % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;

}

copyCode() {

    if (!this.pairingCode) {

        return;

    }

    navigator.clipboard.writeText(this.pairingCode);

}

}
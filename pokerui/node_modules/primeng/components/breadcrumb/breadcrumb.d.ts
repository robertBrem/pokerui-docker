import { OnDestroy } from '@angular/core';
import { MenuItem } from '../api/menumodel';
import { Location } from '@angular/common';
import { Router } from '@angular/router-deprecated';
export declare class Breadcrumb implements OnDestroy {
    private router;
    private location;
    model: MenuItem[];
    style: any;
    styleClass: string;
    constructor(router: Router, location: Location);
    itemClick(event: any, item: MenuItem): void;
    getItemUrl(item: MenuItem): string;
    ngOnDestroy(): void;
}

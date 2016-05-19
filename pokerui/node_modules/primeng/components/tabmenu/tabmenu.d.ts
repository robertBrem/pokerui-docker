import { OnDestroy } from '@angular/core';
import { MenuItem } from '../api/menumodel';
import { Location } from '@angular/common';
import { Router } from '@angular/router-deprecated';
export declare class TabMenu implements OnDestroy {
    private router;
    private location;
    model: MenuItem[];
    activeItem: MenuItem;
    popup: boolean;
    style: any;
    styleClass: string;
    constructor(router: Router, location: Location);
    hoveredItem: MenuItem;
    ngOnInit(): void;
    itemClick(event: any, item: MenuItem): void;
    ngOnDestroy(): void;
    getItemUrl(item: MenuItem): string;
    unsubscribe(item: any): void;
}

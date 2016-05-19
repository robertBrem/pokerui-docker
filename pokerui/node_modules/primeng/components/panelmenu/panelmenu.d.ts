import { ElementRef } from '@angular/core';
import { MenuItem } from '../api/menumodel';
import { Location } from '@angular/common';
import { Router } from '@angular/router-deprecated';
export declare class PanelMenuSub {
    private router;
    private location;
    item: MenuItem;
    expanded: boolean;
    constructor(router: Router, location: Location);
    activeItems: MenuItem[];
    onClick(event: any, item: MenuItem): void;
    isActive(item: MenuItem): boolean;
    getItemUrl(item: MenuItem): string;
}
export declare class PanelMenu {
    private el;
    model: MenuItem[];
    style: any;
    styleClass: string;
    activeItems: MenuItem[];
    constructor(el: ElementRef);
    headerClick(event: any, item: any): void;
    unsubscribe(item: any): void;
    isActive(item: MenuItem): boolean;
    ngOnDestroy(): void;
}

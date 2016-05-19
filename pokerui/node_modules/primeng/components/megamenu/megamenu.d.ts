import { ElementRef, OnDestroy, Renderer } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../api/menumodel';
import { Location } from '@angular/common';
import { Router } from '@angular/router-deprecated';
export declare class MegaMenu implements OnDestroy {
    private el;
    private domHandler;
    private renderer;
    private router;
    private location;
    model: MenuItem[];
    style: any;
    styleClass: string;
    orientation: string;
    activeItem: any;
    activeLink: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer, router: Router, location: Location);
    onItemMouseEnter(event: any, item: any): void;
    onItemMouseLeave(event: any, link: any): void;
    itemClick(event: any, item: MenuItem): void;
    unsubscribe(item: any): void;
    ngOnDestroy(): void;
    getColumnClass(menuitem: MenuItem): any;
    getItemUrl(item: MenuItem): string;
}

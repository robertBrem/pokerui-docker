import { ElementRef, AfterViewInit, OnDestroy, Renderer } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../api/menumodel';
import { Location } from '@angular/common';
import { Router } from '@angular/router-deprecated';
export declare class Menu implements AfterViewInit, OnDestroy {
    private el;
    private domHandler;
    private renderer;
    private router;
    private location;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    container: any;
    documentClickListener: any;
    preventDocumentDefault: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer, router: Router, location: Location);
    ngAfterViewInit(): void;
    toggle(event: any): void;
    show(event: any): void;
    hide(): void;
    itemClick(event: any, item: MenuItem): void;
    ngOnDestroy(): void;
    hasSubMenu(): boolean;
    unsubscribe(item: any): void;
    getItemUrl(item: MenuItem): string;
}

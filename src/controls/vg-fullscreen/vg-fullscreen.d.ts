import { ElementRef, OnInit } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
export declare class VgFullscreen implements OnInit {
    API: VgAPI;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    isFullscreen: boolean;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onChangeFullscreen(fsState: boolean): void;
    onClick(): void;
}

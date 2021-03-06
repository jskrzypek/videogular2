import { ElementRef, SimpleChanges, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { VgAPI } from "../../core/services/vg-api";
export declare class VgHLS implements OnInit, OnChanges, OnDestroy {
    private ref;
    API: VgAPI;
    vgHls: string;
    vgFor: string;
    target: any;
    hls: any;
    preload: boolean;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createPlayer(): void;
    destroyPlayer(): void;
    ngOnDestroy(): void;
}

/// <reference path="google.ima.d.ts" />
/// <reference types="es6-shim" />
import { ElementRef } from '@angular/core';
import { IPlayable } from '../core/vg-media/i-playable';
import { VgAPI } from '../core/services/vg-api';
export declare class VgImaAds {
    API: VgAPI;
    vgFor: string;
    vgNetwork: string;
    vgUnitPath: string;
    vgCompanion: string;
    vgCompanionSize: Array<Number>;
    vgAdTagUrl: string;
    vgSkipButton: string;
    elem: HTMLElement;
    target: IPlayable;
    ima: Ima;
    subscriptions: any;
    isFullscreen: boolean;
    skipButton: HTMLElement;
    displayState: string;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    initializations(): void;
    loadAds(): void;
    onUpdateState(event: any): void;
    requestAds(adTagUrl: string): void;
    onAdsManagerLoaded(evt: google.ima.AdsManagerLoadedEvent): void;
    processAdsManager(adsManager: google.ima.AdsManager): void;
    onSkippableStateChanged(): void;
    onClickSkip(): void;
    onContentPauseRequested(): void;
    onContentResumeRequested(): void;
    onAdError(evt: any): void;
    onAllAdsComplete(): void;
    onAdComplete(): void;
    show(): void;
    hide(): void;
    onContentEnded(): void;
    onChangeFullscreen(fsState: boolean): void;
}
export declare class Ima {
    adDisplayContainer: google.ima.AdDisplayContainer;
    adsLoader: google.ima.AdsLoader;
    adsManager: google.ima.AdsManager;
    adsLoaded: boolean;
    currentAd: number;
    constructor(imaAdsElement: HTMLElement);
}

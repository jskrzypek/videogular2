import { ElementRef, OnInit, OnDestroy } from "@angular/core";
import { IPlayable, IMediaSubscriptions } from "./i-playable";
import { Subscription } from "rxjs/Subscription";
import { Observer } from "rxjs/Observer";
import { VgAPI } from '../services/vg-api';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';
export declare class VgMedia implements OnInit, OnDestroy, IPlayable {
    private api;
    elem: any;
    vgMedia: string;
    state: string;
    time: any;
    buffer: any;
    subscriptions: IMediaSubscriptions | any;
    canPlay: boolean;
    canPlayThrough: boolean;
    isBufferDetected: boolean;
    isMetadataLoaded: boolean;
    isReadyToPlay: boolean;
    isWaiting: boolean;
    isCompleted: boolean;
    isLive: boolean;
    checkInterval: number;
    currentPlayPos: number;
    lastPlayPos: number;
    bufferObserver: Observer<any>;
    checkBufferSubscription: any;
    syncSubscription: Subscription;
    canPlayAllSubscription: any;
    playAtferSync: boolean;
    mutationObs: Subscription;
    canPlayObs: Subscription;
    canPlayThroughObs: Subscription;
    loadedMetadataObs: Subscription;
    waitingObs: Subscription;
    progressObs: Subscription;
    endedObs: Subscription;
    playingObs: Subscription;
    playObs: Subscription;
    pauseObs: Subscription;
    timeUpdateObs: Subscription;
    volumeChangeObs: Subscription;
    errorObs: Subscription;
    isMaster: boolean;
    constructor(ref: ElementRef, api: VgAPI);
    ngOnInit(): void;
    prepareSync(): void;
    startSync(): void;
    onMutation(mutations: any): void;
    play(): void;
    pause(): void;
    readonly id: any;
    readonly duration: any;
    currentTime: any;
    volume: any;
    playbackRate: any;
    readonly buffered: any;
    onCanPlay(event: any): void;
    onCanPlayThrough(event: any): void;
    onLoadMetadata(event: any): void;
    onWait(event: any): void;
    onComplete(event: any): void;
    onStartPlaying(event: any): void;
    onPlay(event: any): void;
    onPause(event: any): void;
    onTimeUpdate(event: any): void;
    onProgress(event: any): void;
    onVolumeChange(event: any): void;
    onError(event: any): void;
    bufferCheck(): void;
    startBufferCheck(): void;
    stopBufferCheck(): void;
    seekTime(value: number, byPercent?: boolean): void;
    ngOnDestroy(): void;
}

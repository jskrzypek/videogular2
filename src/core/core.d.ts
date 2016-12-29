import { Provider } from '@angular/core';
import { VgPlayer } from './vg-player/vg-player';
import { VgMedia } from './vg-media/vg-media';
import { VgCuePoints } from './vg-cue-points/vg-cue-points';
export * from './vg-player/vg-player';
export * from './vg-media/vg-media';
export * from './vg-cue-points/vg-cue-points';
export * from './services/vg-api';
export * from './services/vg-fullscreen-api';
export * from './services/vg-utils';
export * from './events/vg-events';
export * from './states/vg-states';
/**
 * @internal
 */
export declare function coreDirectives(): (typeof VgMedia | typeof VgPlayer | typeof VgCuePoints)[];
export declare function coreServices(): Provider[];
export declare class VgCoreModule {
}

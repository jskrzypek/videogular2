"use strict";
var core_1 = require('@angular/core');
var vg_api_1 = require('../services/vg-api');
var vg_fullscreen_api_1 = require('../services/vg-fullscreen-api');
var vg_utils_1 = require('../services/vg-utils');
var vg_media_1 = require('../vg-media/vg-media');
var VgPlayer = (function () {
    function VgPlayer(ref, api) {
        this.isFullscreen = false;
        this.onPlayerReady = new core_1.EventEmitter();
        this.onMediaReady = new core_1.EventEmitter();
        this.api = api;
        this.elem = ref.nativeElement;
        this.api.registerElement(this.elem);
    }
    VgPlayer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.medias.toArray().forEach(function (media) {
            _this.api.registerMedia(media);
        });
        this.api.onPlayerReady();
        this.onPlayerReady.next(this.api);
        vg_fullscreen_api_1.VgFullscreenAPI.init(this.elem, this.medias);
        vg_fullscreen_api_1.VgFullscreenAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
    };
    VgPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (!vg_fullscreen_api_1.VgFullscreenAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? vg_utils_1.VgUtils.getZIndex().toString() : 'auto';
        }
    };
    VgPlayer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-player',
                    template: "<ng-content></ng-content>",
                    styles: ["\n        :host {\n            font-family: 'videogular';\n            position: relative;\n            display: flex;\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            background-color: black;\n        }\n\n        :host.fullscreen {\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n    "],
                    providers: [vg_api_1.VgAPI]
                },] },
    ];
    /** @nocollapse */
    VgPlayer.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ];
    VgPlayer.propDecorators = {
        'isFullscreen': [{ type: core_1.HostBinding, args: ['class.fullscreen',] },],
        'zIndex': [{ type: core_1.HostBinding, args: ['style.z-index',] },],
        'onPlayerReady': [{ type: core_1.Output },],
        'onMediaReady': [{ type: core_1.Output },],
        'medias': [{ type: core_1.ContentChildren, args: [vg_media_1.VgMedia,] },],
    };
    return VgPlayer;
}());
exports.VgPlayer = VgPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFTTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFBc0Isb0JBQW9CLENBQUMsQ0FBQTtBQUMzQyxrQ0FBZ0MsK0JBQStCLENBQUMsQ0FBQTtBQUNoRSx5QkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQUMvQyx5QkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQUcvQztJQWdCSSxrQkFBWSxHQUFlLEVBQUUsR0FBVTtRQVp0QyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUkvQixrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUd0RCxpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU1qRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHFDQUFrQixHQUFsQjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsbUNBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQ0FBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxrQkFBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNwRSxDQUFDO0lBQ0wsQ0FBQztJQUNFLG1CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxNQUFNLEVBQUUsQ0FBRSxxWEFnQlQsQ0FBRTtvQkFDSCxTQUFTLEVBQUUsQ0FBRSxjQUFLLENBQUU7aUJBQ3ZCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx1QkFBYyxHQUE2RDtRQUNsRixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGNBQUssR0FBRztLQUNkLENBQUM7SUFDSyx1QkFBYyxHQUEyQztRQUNoRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFHLEVBQUUsRUFBRTtRQUN0RSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRyxFQUFFLEVBQUU7UUFDN0QsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLEVBQUU7UUFDcEMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsc0JBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBTyxFQUFHLEVBQUUsRUFBRTtLQUN4RCxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUE3RUQsSUE2RUM7QUE3RVksZ0JBQVEsV0E2RXBCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIE91dHB1dCxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgUXVlcnlMaXN0LFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgVmdGdWxsc2NyZWVuQVBJIH0gZnJvbSAnLi4vc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuaW1wb3J0IHsgVmdVdGlscyB9IGZyb20gJy4uL3NlcnZpY2VzL3ZnLXV0aWxzJztcbmltcG9ydCB7IFZnTWVkaWEgfSBmcm9tICcuLi92Zy1tZWRpYS92Zy1tZWRpYSc7XG5cblxuZXhwb3J0IGNsYXNzIFZnUGxheWVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgYXBpOiBWZ0FQSTtcblxuICAgICBpc0Z1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgekluZGV4OiBzdHJpbmc7XG5cbiAgICBcbiAgICBvblBsYXllclJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIFxuICAgIG9uTWVkaWFSZWFkeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBcbiAgICBtZWRpYXM6IFF1ZXJ5TGlzdDxWZ01lZGlhPjtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgYXBpOiBWZ0FQSSkge1xuICAgICAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5hcGkucmVnaXN0ZXJFbGVtZW50KHRoaXMuZWxlbSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLm1lZGlhcy50b0FycmF5KCkuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBpLnJlZ2lzdGVyTWVkaWEobWVkaWEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFwaS5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeS5uZXh0KHRoaXMuYXBpKTtcblxuICAgICAgICBWZ0Z1bGxzY3JlZW5BUEkuaW5pdCh0aGlzLmVsZW0sIHRoaXMubWVkaWFzKTtcbiAgICAgICAgVmdGdWxsc2NyZWVuQVBJLm9uQ2hhbmdlRnVsbHNjcmVlbi5zdWJzY3JpYmUodGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VGdWxsc2NyZWVuKGZzU3RhdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCFWZ0Z1bGxzY3JlZW5BUEkubmF0aXZlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPSBmc1N0YXRlO1xuICAgICAgICAgICAgdGhpcy56SW5kZXggPSBmc1N0YXRlID8gVmdVdGlscy5nZXRaSW5kZXgoKS50b1N0cmluZygpIDogJ2F1dG8nO1xuICAgICAgICB9XG4gICAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgIHNlbGVjdG9yOiAndmctcGxheWVyJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlczogWyBgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAndmlkZW9ndWxhcic7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdC5mdWxsc2NyZWVuIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cbiAgICBgIF0sXG4gICAgcHJvdmlkZXJzOiBbIFZnQVBJIF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBWZ0FQSSwgfSxcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ2lzRnVsbHNjcmVlbic6IFt7IHR5cGU6IEhvc3RCaW5kaW5nLCBhcmdzOiBbJ2NsYXNzLmZ1bGxzY3JlZW4nLCBdIH0sXSxcbid6SW5kZXgnOiBbeyB0eXBlOiBIb3N0QmluZGluZywgYXJnczogWydzdHlsZS56LWluZGV4JywgXSB9LF0sXG4nb25QbGF5ZXJSZWFkeSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25NZWRpYVJlYWR5JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidtZWRpYXMnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGRyZW4sIGFyZ3M6IFtWZ01lZGlhLCBdIH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
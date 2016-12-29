"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require("rxjs/Observable");
var vg_api_1 = require("../core/services/vg-api");
require('rxjs/add/observable/fromEvent');
var VgControls = (function () {
    function VgControls(API, ref) {
        this.API = API;
        this.ref = ref;
        this.isAdsPlaying = 'initial';
        this.hideControls = false;
        this.vgAutohide = false;
        this.vgAutohideTime = 3;
        this.elem = ref.nativeElement;
    }
    VgControls.prototype.ngOnInit = function () {
        var _this = this;
        var mouseEnter = Observable_1.Observable.fromEvent(this.API.videogularElement, 'mouseenter');
        mouseEnter.subscribe(this.show.bind(this));
        var mouseLeave = Observable_1.Observable.fromEvent(this.API.videogularElement, 'mouseleave');
        mouseLeave.subscribe(this.hide.bind(this));
        this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); });
    };
    VgControls.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this));
        this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this));
    };
    VgControls.prototype.ngAfterViewInit = function () {
        if (this.vgAutohide) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    VgControls.prototype.onStartAds = function () {
        this.isAdsPlaying = 'none';
    };
    VgControls.prototype.onEndAds = function () {
        this.isAdsPlaying = 'initial';
    };
    VgControls.prototype.hide = function () {
        if (this.vgAutohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    };
    VgControls.prototype.show = function () {
        clearTimeout(this.timer);
        this.hideControls = false;
    };
    VgControls.prototype.hideAsync = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.hideControls = true;
        }, this.vgAutohideTime * 1000);
    };
    VgControls.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-controls',
                    template: "<ng-content></ng-content>",
                    styles: ["\n        :host {\n            position: absolute;\n            display: flex;\n            width: 100%;\n            height: 50px;\n            z-index: 300;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, 0.5);\n            -webkit-transition: bottom 1s;\n            -khtml-transition: bottom 1s;\n            -moz-transition: bottom 1s;\n            -ms-transition: bottom 1s;\n            transition: bottom 1s;\n        }\n\n        :host.hide {\n          bottom: -50px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgControls.ctorParameters = [
        { type: vg_api_1.VgAPI, },
        { type: core_1.ElementRef, },
    ];
    VgControls.propDecorators = {
        'isAdsPlaying': [{ type: core_1.HostBinding, args: ['style.pointer-events',] },],
        'hideControls': [{ type: core_1.HostBinding, args: ['class.hide',] },],
        'vgAutohide': [{ type: core_1.Input },],
        'vgAutohideTime': [{ type: core_1.Input },],
    };
    return VgControls;
}());
exports.VgControls = VgControls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1jb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQTJGLGVBQWUsQ0FBQyxDQUFBO0FBQzNHLDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLHVCQUFvQix5QkFBeUIsQ0FBQyxDQUFBO0FBRTlDLFFBQU8sK0JBQStCLENBQUMsQ0FBQTtBQUd2QztJQWFJLG9CQUFvQixHQUFTLEVBQVUsR0FBYztRQUFqQyxRQUFHLEdBQUgsR0FBRyxDQUFNO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBVztRQVJwRCxpQkFBWSxHQUFVLFNBQVMsQ0FBQztRQUNoQyxpQkFBWSxHQUFXLEtBQUssQ0FBQztRQUU3QixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLG1CQUFjLEdBQVUsQ0FBQyxDQUFDO1FBS3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRixVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsb0NBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFRCwrQkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0lBRUQseUJBQUksR0FBSjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQseUJBQUksR0FBSjtRQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVPLDhCQUFTLEdBQWpCO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0UscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLE1BQU0sRUFBRSxDQUFDLHFnQkFtQlIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gseUJBQWMsR0FBNkQ7UUFDbEYsRUFBQyxJQUFJLEVBQUUsY0FBSyxHQUFHO1FBQ2YsRUFBQyxJQUFJLEVBQUUsaUJBQVUsR0FBRztLQUNuQixDQUFDO0lBQ0sseUJBQWMsR0FBMkM7UUFDaEUsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRyxFQUFFLEVBQUU7UUFDMUUsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUcsRUFBRSxFQUFFO1FBQ2hFLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQ2hDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7S0FDbkMsQ0FBQztJQUNGLGlCQUFDO0FBQUQsQ0FBQyxBQXpHRCxJQXlHQztBQXpHWSxrQkFBVSxhQXlHdEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRWxlbWVudFJlZiwgUmVuZGVyZXIsIEhvc3RCaW5kaW5nLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7VmdBUEl9IGZyb20gXCIuLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaVwiO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcblxuXG5leHBvcnQgY2xhc3MgVmdDb250cm9scyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgZWxlbTpIVE1MRWxlbWVudDtcbiAgICB2Z0ZvcjpzdHJpbmc7XG4gICAgdGFyZ2V0OmFueTtcblxuICAgICBpc0Fkc1BsYXlpbmc6c3RyaW5nID0gJ2luaXRpYWwnO1xuICAgICBoaWRlQ29udHJvbHM6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgIHZnQXV0b2hpZGU6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICB2Z0F1dG9oaWRlVGltZTpudW1iZXIgPSAzO1xuXG4gICAgcHJpdmF0ZSB0aW1lcjphbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIEFQSTpWZ0FQSSwgcHJpdmF0ZSByZWY6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IG1vdXNlRW50ZXIgPSBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLkFQSS52aWRlb2d1bGFyRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgICAgbW91c2VFbnRlci5zdWJzY3JpYmUodGhpcy5zaG93LmJpbmQodGhpcykpO1xuXG4gICAgICAgIGxldCBtb3VzZUxlYXZlID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQodGhpcy5BUEkudmlkZW9ndWxhckVsZW1lbnQsICdtb3VzZWxlYXZlJyk7XG4gICAgICAgIG1vdXNlTGVhdmUuc3Vic2NyaWJlKHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSk7XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG5cbiAgICAgICAgdGhpcy50YXJnZXQuc3Vic2NyaXB0aW9ucy5zdGFydEFkcy5zdWJzY3JpYmUodGhpcy5vblN0YXJ0QWRzLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLmVuZEFkcy5zdWJzY3JpYmUodGhpcy5vbkVuZEFkcy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnZnQXV0b2hpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblN0YXJ0QWRzKCkge1xuICAgICAgICB0aGlzLmlzQWRzUGxheWluZyA9ICdub25lJztcbiAgICB9XG5cbiAgICBvbkVuZEFkcygpIHtcbiAgICAgICAgdGhpcy5pc0Fkc1BsYXlpbmcgPSAnaW5pdGlhbCc7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudmdBdXRvaGlkZSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgICAgdGhpcy5oaWRlQXN5bmMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy5oaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVBc3luYygpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlQ29udHJvbHMgPSB0cnVlO1xuICAgICAgICB9LCB0aGlzLnZnQXV0b2hpZGVUaW1lICogMTAwMCk7XG4gICAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgIHNlbGVjdG9yOiAndmctY29udHJvbHMnLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB6LWluZGV4OiAzMDA7XG4gICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgICAgIC1raHRtbC10cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgICAgICAtbW96LXRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgICAgIC1tcy10cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdC5oaWRlIHtcbiAgICAgICAgICBib3R0b206IC01MHB4O1xuICAgICAgICB9XG4gICAgYF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG57dHlwZTogVmdBUEksIH0sXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ2lzQWRzUGxheWluZyc6IFt7IHR5cGU6IEhvc3RCaW5kaW5nLCBhcmdzOiBbJ3N0eWxlLnBvaW50ZXItZXZlbnRzJywgXSB9LF0sXG4naGlkZUNvbnRyb2xzJzogW3sgdHlwZTogSG9zdEJpbmRpbmcsIGFyZ3M6IFsnY2xhc3MuaGlkZScsIF0gfSxdLFxuJ3ZnQXV0b2hpZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ndmdBdXRvaGlkZVRpbWUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=
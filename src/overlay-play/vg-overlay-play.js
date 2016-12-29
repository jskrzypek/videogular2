"use strict";
var core_1 = require('@angular/core');
var vg_api_1 = require('../core/services/vg-api');
var vg_states_1 = require("../core/states/vg-states");
var VgOverlayPlay = (function () {
    function VgOverlayPlay(ref, API) {
        this.API = API;
        this.elem = ref.nativeElement;
    }
    VgOverlayPlay.prototype.ngOnInit = function () {
        var _this = this;
        this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); });
    };
    VgOverlayPlay.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgOverlayPlay.prototype.onClick = function () {
        var state = this.getState();
        switch (state) {
            case vg_states_1.VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case vg_states_1.VgStates.VG_PAUSED:
                this.target.play();
                break;
        }
    };
    VgOverlayPlay.prototype.getState = function () {
        var state = vg_states_1.VgStates.VG_PAUSED;
        if (this.target) {
            if (this.target.state instanceof Array) {
                for (var i = 0, l = this.target.state.length; i < l; i++) {
                    if (this.target.state[i] === vg_states_1.VgStates.VG_PLAYING) {
                        state = vg_states_1.VgStates.VG_PLAYING;
                        break;
                    }
                }
            }
            else {
                state = this.target.state;
            }
        }
        return state;
    };
    VgOverlayPlay.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-overlay-play',
                    template: "<div class=\"vg-overlay-play\">\n            <div class=\"overlay-play-container\"\n                 [class.vg-icon-play_arrow]=\"getState() !== 'playing'\">\n            </div>\n        </div>",
                    styles: ["\n        :host {\n            z-index: 200;\n        }\n\n        .vg-overlay-play {\n            transition: all 0.5s;\n            cursor: pointer;\n            position: absolute;\n            display: block;\n            color: white;\n            width: 100%;\n            height: 100%;\n            font-size: 80px;\n            filter: alpha(opacity=60);\n            opacity: 0.6;\n        }\n\n        .vg-overlay-play .overlay-play-container.vg-icon-play_arrow {\n            pointer-events: none;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 80px;\n        }\n\n        .vg-overlay-play:hover {\n            filter: alpha(opacity=100);\n            opacity: 1;\n        }\n\n        .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before {\n            transform: scale(1.2);\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgOverlayPlay.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ];
    VgOverlayPlay.propDecorators = {
        'vgFor': [{ type: core_1.Input },],
        'onClick': [{ type: core_1.HostListener, args: ['click',] },],
    };
    return VgOverlayPlay;
}());
exports.VgOverlayPlay = VgOverlayPlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctb3ZlcmxheS1wbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctb3ZlcmxheS1wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBbUUsZUFBZSxDQUFDLENBQUE7QUFFbkYsdUJBQW9CLHlCQUF5QixDQUFDLENBQUE7QUFDOUMsMEJBQXVCLDBCQUEwQixDQUFDLENBQUE7QUFHbEQ7SUFLSSx1QkFBWSxHQUFjLEVBQVMsR0FBVTtRQUFWLFFBQUcsR0FBSCxHQUFHLENBQU87UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBRUM7UUFERyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBR0QsK0JBQU8sR0FBUDtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSyxvQkFBUSxDQUFDLFVBQVU7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssQ0FBQztZQUVWLEtBQUssb0JBQVEsQ0FBQyxTQUFTO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQixLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLEtBQUssR0FBRyxvQkFBUSxDQUFDLFNBQVMsQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxVQUFVLENBQUM7d0JBQzVCLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0Usd0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUNKLG1NQUlPO29CQUNYLE1BQU0sRUFBRSxDQUFDLDY5QkFxQ1IsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBNkQ7UUFDbEYsRUFBQyxJQUFJLEVBQUUsaUJBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxjQUFLLEdBQUc7S0FDZCxDQUFDO0lBQ0ssNEJBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUcsRUFBRSxFQUFFO0tBQ3RELENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUE3R0QsSUE2R0M7QUE3R1kscUJBQWEsZ0JBNkd6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtWZ0FQSX0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHtWZ1N0YXRlc30gZnJvbSBcIi4uL2NvcmUvc3RhdGVzL3ZnLXN0YXRlc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBWZ092ZXJsYXlQbGF5IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAgdmdGb3I6IHN0cmluZztcbiAgICBlbGVtOkhUTUxFbGVtZW50O1xuICAgIHRhcmdldDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocmVmOkVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSk7XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgVmdTdGF0ZXMuVkdfUExBWUlORzpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFZnU3RhdGVzLlZHX1BBVVNFRDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gVmdTdGF0ZXMuVkdfUEFVU0VEO1xuXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0LnN0YXRlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMudGFyZ2V0LnN0YXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXQuc3RhdGVbaV0gPT09IFZnU3RhdGVzLlZHX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gVmdTdGF0ZXMuVkdfUExBWUlORztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSB0aGlzLnRhcmdldC5zdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gICAgc2VsZWN0b3I6ICd2Zy1vdmVybGF5LXBsYXknLFxuICAgIHRlbXBsYXRlOlxuICAgICAgICBgPGRpdiBjbGFzcz1cInZnLW92ZXJsYXktcGxheVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXktcGxheS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICBbY2xhc3MudmctaWNvbi1wbGF5X2Fycm93XT1cImdldFN0YXRlKCkgIT09ICdwbGF5aW5nJ1wiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICB6LWluZGV4OiAyMDA7XG4gICAgICAgIH1cblxuICAgICAgICAudmctb3ZlcmxheS1wbGF5IHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICAgICAgICAgIGZpbHRlcjogYWxwaGEob3BhY2l0eT02MCk7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICAgIH1cblxuICAgICAgICAudmctb3ZlcmxheS1wbGF5IC5vdmVybGF5LXBsYXktY29udGFpbmVyLnZnLWljb24tcGxheV9hcnJvdyB7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC52Zy1vdmVybGF5LXBsYXk6aG92ZXIge1xuICAgICAgICAgICAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTEwMCk7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLnZnLW92ZXJsYXktcGxheTpob3ZlciAub3ZlcmxheS1wbGF5LWNvbnRhaW5lci52Zy1pY29uLXBsYXlfYXJyb3c6YmVmb3JlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgICAgICAgfVxuICAgIGBdXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG57dHlwZTogVmdBUEksIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbid2Z0Zvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbidvbkNsaWNrJzogW3sgdHlwZTogSG9zdExpc3RlbmVyLCBhcmdzOiBbJ2NsaWNrJywgXSB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=
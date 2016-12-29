"use strict";
var core_1 = require("@angular/core");
var vg_api_1 = require("../../core/services/vg-api");
var VgHLS = (function () {
    function VgHLS(ref, API) {
        this.ref = ref;
        this.API = API;
    }
    VgHLS.prototype.ngOnInit = function () {
        var _this = this;
        this.API.playerReadyEvent.subscribe(function (api) { return _this.onPlayerReady(); });
    };
    VgHLS.prototype.onPlayerReady = function () {
        var _this = this;
        this.preload = this.ref.nativeElement.getAttribute('preload') !== 'none';
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();
        if (!this.preload) {
            this.API.subscriptions.play.subscribe(function () {
                if (_this.hls) {
                    _this.hls.startLoad(0);
                }
            });
        }
    };
    VgHLS.prototype.ngOnChanges = function (changes) {
        if (changes['vgHls'].currentValue) {
            this.createPlayer();
        }
        else {
            this.destroyPlayer();
        }
    };
    VgHLS.prototype.createPlayer = function () {
        if (this.hls) {
            this.destroyPlayer();
        }
        // It's a HLS source
        if (this.vgHls && this.vgHls.indexOf('.m3u8') > -1 && Hls.isSupported()) {
            var video = this.ref.nativeElement;
            this.hls = new Hls({
                autoStartLoad: this.preload
            });
            this.hls.loadSource(this.vgHls);
            this.hls.attachMedia(video);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgHls;
            }
        }
    };
    VgHLS.prototype.destroyPlayer = function () {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
    };
    VgHLS.prototype.ngOnDestroy = function () {
        this.destroyPlayer();
    };
    VgHLS.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[vgHls]'
                },] },
    ];
    /** @nocollapse */
    VgHLS.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ];
    VgHLS.propDecorators = {
        'vgHls': [{ type: core_1.Input },],
    };
    return VgHLS;
}());
exports.VgHLS = VgHLS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctaGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctaGxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBMEYsZUFBZSxDQUFDLENBQUE7QUFDMUcsdUJBQXNCLDRCQUE0QixDQUFDLENBQUE7QUFLbkQ7SUFRSSxlQUFvQixHQUFjLEVBQVMsR0FBUztRQUFoQyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBTTtJQUFHLENBQUM7SUFFeEQsd0JBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFTLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsNkJBQWEsR0FBYjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssTUFBTSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2pDO2dCQUNJLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNYLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUFXLEdBQVgsVUFBWSxPQUFxQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBRUQsNEJBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvQkFBb0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksS0FBSyxHQUFvQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUVwRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO2dCQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTzthQUM5QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUFhLEdBQWI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztJQUNMLENBQUM7SUFFRCwyQkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRSxnQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsU0FBUztpQkFDdEIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG9CQUFjLEdBQTZEO1FBQ2xGLEVBQUMsSUFBSSxFQUFFLGlCQUFVLEdBQUc7UUFDcEIsRUFBQyxJQUFJLEVBQUUsY0FBSyxHQUFHO0tBQ2QsQ0FBQztJQUNLLG9CQUFjLEdBQTJDO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO0tBQzFCLENBQUM7SUFDRixZQUFDO0FBQUQsQ0FBQyxBQXZGRCxJQXVGQztBQXZGWSxhQUFLLFFBdUZqQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaVwiO1xuXG5kZWNsYXJlIGxldCBIbHM7XG5cblxuZXhwb3J0IGNsYXNzIFZnSExTIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgIHZnSGxzOnN0cmluZztcblxuICAgIHZnRm9yOiBzdHJpbmc7XG4gICAgdGFyZ2V0OiBhbnk7XG4gICAgaGxzOiBhbnk7XG4gICAgcHJlbG9hZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOkVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6VmdBUEkpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKGFwaTpWZ0FQSSkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpO1xuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZCA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwcmVsb2FkJykgIT09ICdub25lJztcbiAgICAgICAgdGhpcy52Z0ZvciA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2Z0ZvcicpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoKTtcblxuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZCkge1xuICAgICAgICAgICAgdGhpcy5BUEkuc3Vic2NyaXB0aW9ucy5wbGF5LnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5obHMuc3RhcnRMb2FkKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6U2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1sndmdIbHMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBsYXllcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGxzKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0J3MgYSBITFMgc291cmNlXG4gICAgICAgIGlmICh0aGlzLnZnSGxzICYmIHRoaXMudmdIbHMuaW5kZXhPZignLm0zdTgnKSA+IC0xICYmIEhscy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICBsZXQgdmlkZW86SFRNTFZpZGVvRWxlbWVudCA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHRoaXMuaGxzID0gbmV3IEhscyh7XG4gICAgICAgICAgICAgICAgYXV0b1N0YXJ0TG9hZDogdGhpcy5wcmVsb2FkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaGxzLmxvYWRTb3VyY2UodGhpcy52Z0hscyk7XG4gICAgICAgICAgICB0aGlzLmhscy5hdHRhY2hNZWRpYSh2aWRlbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNlZWtUaW1lKDApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy52Z0hscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lQbGF5ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmhscykge1xuICAgICAgICAgICAgdGhpcy5obHMuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5obHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICBzZWxlY3RvcjogJ1t2Z0hsc10nXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG57dHlwZTogVmdBUEksIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbid2Z0hscyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
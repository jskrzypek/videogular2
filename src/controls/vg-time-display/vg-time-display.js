"use strict";
var core_1 = require('@angular/core');
var vg_api_1 = require('../../core/services/vg-api');
// Workaround until we can use UTC with Angular Date Pipe
var VgUtcPipe = (function () {
    function VgUtcPipe() {
    }
    VgUtcPipe.prototype.transform = function (value, format) {
        var date = new Date(value);
        var result = format;
        var ss = date.getUTCSeconds();
        var mm = date.getUTCMinutes();
        var hh = date.getUTCHours();
        if (ss < 10) {
            ss = '0' + ss;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        result = result.replace(/ss/g, ss);
        result = result.replace(/mm/g, mm);
        result = result.replace(/hh/g, hh);
        return result;
    };
    VgUtcPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'vgUtc' },] },
    ];
    /** @nocollapse */
    VgUtcPipe.ctorParameters = [];
    return VgUtcPipe;
}());
exports.VgUtcPipe = VgUtcPipe;
var VgTimeDisplay = (function () {
    function VgTimeDisplay(ref, API) {
        this.API = API;
        this.vgProperty = 'current';
        this.vgFormat = 'mm:ss';
        this.elem = ref.nativeElement;
    }
    VgTimeDisplay.prototype.ngOnInit = function () {
        var _this = this;
        this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); });
    };
    VgTimeDisplay.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgTimeDisplay.prototype.getTime = function () {
        var t = 0;
        if (this.target) {
            t = Math.round(this.target.time[this.vgProperty]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }
        return t;
    };
    VgTimeDisplay.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-time-display',
                    template: "\n        <span *ngIf=\"target?.isLive\">LIVE</span>\n        <span *ngIf=\"!target?.isLive\">{{ getTime() | vgUtc:vgFormat }}</span>\n        <ng-content></ng-content>\n    ",
                    styles: ["\n        :host {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 60px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n            pointer-events: none;\n            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgTimeDisplay.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ];
    VgTimeDisplay.propDecorators = {
        'vgFor': [{ type: core_1.Input },],
        'vgProperty': [{ type: core_1.Input },],
        'vgFormat': [{ type: core_1.Input },],
    };
    return VgTimeDisplay;
}());
exports.VgTimeDisplay = VgTimeDisplay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdGltZS1kaXNwbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctdGltZS1kaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBMEUsZUFBZSxDQUFDLENBQUE7QUFFMUYsdUJBQW9CLDRCQUE0QixDQUFDLENBQUE7QUFFakQseURBQXlEO0FBRXpEO0lBQUE7SUF3QkEsQ0FBQztJQXZCRyw2QkFBUyxHQUFULFVBQVUsS0FBYSxFQUFFLE1BQWM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0MsSUFBSSxFQUFFLEdBQWtCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QyxJQUFJLEVBQUUsR0FBa0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTNDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBRS9CLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQVUsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNFLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFdBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsRUFBRyxFQUFFO0tBQ3hDLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUE2RCxFQUNqRixDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLGlCQUFTLFlBd0JyQixDQUFBO0FBR0Q7SUFTSSx1QkFBWSxHQUFjLEVBQVMsR0FBUztRQUFULFFBQUcsR0FBSCxHQUFHLENBQU07UUFQM0MsZUFBVSxHQUFVLFNBQVMsQ0FBQztRQUM5QixhQUFRLEdBQVUsT0FBTyxDQUFDO1FBT3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxxQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRSx3QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZ0xBSVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUMsaWtCQWtCUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw0QkFBYyxHQUE2RDtRQUNsRixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGNBQUssR0FBRztLQUNkLENBQUM7SUFDSyw0QkFBYyxHQUEyQztRQUNoRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUMzQixZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUNoQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtLQUM3QixDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBdEVELElBc0VDO0FBdEVZLHFCQUFhLGdCQXNFekIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1ZnQVBJfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5cbi8vIFdvcmthcm91bmQgdW50aWwgd2UgY2FuIHVzZSBVVEMgd2l0aCBBbmd1bGFyIERhdGUgUGlwZVxuXG5leHBvcnQgY2xhc3MgVmdVdGNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGxldCByZXN1bHQgPSBmb3JtYXQ7XG4gICAgICAgIGxldCBzczogc3RyaW5nfG51bWJlciA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICAgICAgICBsZXQgbW06IHN0cmluZ3xudW1iZXIgPSBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICAgICAgbGV0IGhoOiBzdHJpbmd8bnVtYmVyID0gZGF0ZS5nZXRVVENIb3VycygpO1xuXG4gICAgICAgIGlmIChzcyA8IDEwKSB7IHNzID0gJzAnICsgc3M7IH1cbiAgICAgICAgaWYgKG1tIDwgMTApIHsgbW0gPSAnMCcgKyBtbTsgfVxuICAgICAgICBpZiAoaGggPCAxMCkgeyBoaCA9ICcwJyArIGhoOyB9XG5cbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL3NzL2csIDxzdHJpbmc+c3MpO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvbW0vZywgPHN0cmluZz5tbSk7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9oaC9nLCA8c3RyaW5nPmhoKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IFBpcGUsIGFyZ3M6IFt7bmFtZTogJ3ZnVXRjJ30sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG5dO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBWZ1RpbWVEaXNwbGF5IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAgdmdGb3I6IHN0cmluZztcbiAgICAgdmdQcm9wZXJ0eTpzdHJpbmcgPSAnY3VycmVudCc7XG4gICAgIHZnRm9ybWF0OnN0cmluZyA9ICdtbTpzcyc7XG5cbiAgICBlbGVtOkhUTUxFbGVtZW50O1xuICAgIHRhcmdldDogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6RWxlbWVudFJlZiwgcHVibGljIEFQSTpWZ0FQSSkge1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpO1xuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgIH1cblxuICAgIGdldFRpbWUoKSB7XG4gICAgICAgIGxldCB0ID0gMDtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHQgPSBNYXRoLnJvdW5kKHRoaXMudGFyZ2V0LnRpbWVbdGhpcy52Z1Byb3BlcnR5XSk7XG4gICAgICAgICAgICB0ID0gaXNOYU4odCkgfHwgdGhpcy50YXJnZXQuaXNMaXZlID8gMCA6IHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gICAgc2VsZWN0b3I6ICd2Zy10aW1lLWRpc3BsYXknLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGFyZ2V0Py5pc0xpdmVcIj5MSVZFPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiF0YXJnZXQ/LmlzTGl2ZVwiPnt7IGdldFRpbWUoKSB8IHZnVXRjOnZnRm9ybWF0IH19PC9zcGFuPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogNjBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICBmb250LWZhbWlseTogSGVsdmV0aWNhIE5ldWUsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgICAgIH1cbiAgICBgXVxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbnt0eXBlOiBFbGVtZW50UmVmLCB9LFxue3R5cGU6IFZnQVBJLCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4ndmdGb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ndmdQcm9wZXJ0eSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z0Zvcm1hdCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==
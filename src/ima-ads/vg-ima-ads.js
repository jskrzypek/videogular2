"use strict";
///<reference path='./google.ima.ts'/>
var core_1 = require('@angular/core');
var vg_api_1 = require('../core/services/vg-api');
var vg_events_1 = require('../core/events/vg-events');
var vg_fullscreen_api_1 = require('../core/services/vg-fullscreen-api');
var VgImaAds = (function () {
    function VgImaAds(ref, API) {
        var _this = this;
        this.API = API;
        this.subscriptions = {};
        this.isFullscreen = false;
        this.displayState = 'none';
        this.elem = ref.nativeElement;
        this.onContentEnded = this.onContentEnded.bind(this);
        this.API.playerReadyEvent.subscribe(function (api) { return _this.onPlayerReady(); });
    }
    VgImaAds.prototype.ngOnInit = function () {
        var _this = this;
        this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); });
    };
    VgImaAds.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.initializations();
        this.target.subscriptions.ended.subscribe(this.onContentEnded.bind(this));
        this.target.subscriptions.play.subscribe(this.onUpdateState.bind(this));
        vg_fullscreen_api_1.VgFullscreenAPI.onChangeFullscreen
            .subscribe(this.onChangeFullscreen.bind(this));
        this.ima.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
        this.ima.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        this.loadAds();
    };
    VgImaAds.prototype.initializations = function () {
        var _this = this;
        this.ima = new Ima(this.elem);
        this.skipButton = document.querySelector(this.vgSkipButton);
        this.skipButton.style.display = 'none';
        this.skipButton.addEventListener('click', this.onClickSkip.bind(this));
        this.elem.insertBefore(this.skipButton, this.elem.firstChild);
        window.addEventListener('resize', function () {
            var w = _this.API.videogularElement.offsetWidth;
            var h = _this.API.videogularElement.offsetHeight;
            if (_this.ima.adsManager) {
                if (_this.isFullscreen) {
                    _this.ima.adsManager.resize(w, h, google.ima.ViewMode.FULLSCREEN);
                }
                else {
                    _this.ima.adsManager.resize(w, h, google.ima.ViewMode.NORMAL);
                }
            }
        });
    };
    VgImaAds.prototype.loadAds = function () {
        var _this = this;
        if (this.vgCompanion) {
            googletag.cmd.push(function () {
                var adUnitPath = '/' + _this.vgNetwork + '/' + _this.vgUnitPath;
                var slot = googletag.defineSlot(adUnitPath, _this.vgCompanionSize, _this.vgCompanion);
                slot.addService(googletag.companionAds());
                slot.addService(googletag.pubads());
                googletag
                    .companionAds()
                    .setRefreshUnfilledSlots(true);
                googletag
                    .pubads()
                    .enableVideoAds();
                googletag.enableServices();
            });
        }
    };
    VgImaAds.prototype.onUpdateState = function (event) {
        switch (event.type) {
            case vg_events_1.VgEvents.VG_PLAY:
                if (!this.ima.adsLoaded) {
                    this.API.pause();
                    this.ima.adDisplayContainer.initialize();
                    this.requestAds(this.vgAdTagUrl);
                    this.ima.adsLoaded = true;
                }
                break;
        }
    };
    VgImaAds.prototype.requestAds = function (adTagUrl) {
        // Show only to get computed style in pixels
        this.show();
        var adsRequest = new google.ima.AdsRequest();
        var computedStyle = window.getComputedStyle(this.elem);
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.linearAdSlotHeight = parseInt(computedStyle.height, 10);
        adsRequest.nonLinearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.nonLinearAdSlotHeight = parseInt(computedStyle.height, 10);
        this.ima.adsLoader.requestAds(adsRequest);
    };
    VgImaAds.prototype.onAdsManagerLoaded = function (evt) {
        this.show();
        this.ima.adsManager = evt.getAdsManager(this.target);
        this.processAdsManager(this.ima.adsManager);
    };
    VgImaAds.prototype.processAdsManager = function (adsManager) {
        var w = this.API.videogularElement.offsetWidth;
        var h = this.API.videogularElement.offsetHeight;
        // Attach the pause/resume events.
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.onSkippableStateChanged.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAllAdsComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        this.ima.adsManager.init(w, h, google.ima.ViewMode.NORMAL);
        this.ima.adsManager.start();
    };
    VgImaAds.prototype.onSkippableStateChanged = function () {
        var isSkippable = this.ima.adsManager.getAdSkippableState();
        if (isSkippable) {
            this.skipButton.style.display = 'block';
        }
        else {
            this.skipButton.style.display = 'none';
        }
    };
    VgImaAds.prototype.onClickSkip = function () {
        this.ima.adsManager.skip();
    };
    VgImaAds.prototype.onContentPauseRequested = function () {
        this.show();
        this.API.pause();
    };
    VgImaAds.prototype.onContentResumeRequested = function () {
        this.API.play();
        this.hide();
    };
    VgImaAds.prototype.onAdError = function (evt) {
        if (this.ima.adsManager) {
            this.ima.adsManager.destroy();
        }
        this.hide();
        this.API.play();
    };
    VgImaAds.prototype.onAllAdsComplete = function () {
        this.hide();
        // The last ad was a post-roll
        if (this.ima.adsManager.getCuePoints().join().indexOf('-1') >= 0) {
            this.API.pause(); // it was stop() in Videogular v1
        }
    };
    VgImaAds.prototype.onAdComplete = function () {
        // TODO: Update view with current ad count
        this.ima.currentAd++;
    };
    VgImaAds.prototype.show = function () {
        window.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_START_ADS));
        this.displayState = 'block';
    };
    VgImaAds.prototype.hide = function () {
        window.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_END_ADS));
        this.displayState = 'none';
    };
    VgImaAds.prototype.onContentEnded = function () {
        this.ima.adsLoader.contentComplete();
    };
    VgImaAds.prototype.onChangeFullscreen = function (fsState) {
        if (!vg_fullscreen_api_1.VgFullscreenAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
        }
    };
    VgImaAds.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-ima-ads',
                    template: "<div class=\"vg-ima-ads\"></div>",
                    styles: ["\n        :host {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            z-index: 300;\n        }\n        .vg-ima-ads {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgImaAds.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ];
    VgImaAds.propDecorators = {
        'vgFor': [{ type: core_1.Input },],
        'vgNetwork': [{ type: core_1.Input },],
        'vgUnitPath': [{ type: core_1.Input },],
        'vgCompanion': [{ type: core_1.Input },],
        'vgCompanionSize': [{ type: core_1.Input },],
        'vgAdTagUrl': [{ type: core_1.Input },],
        'vgSkipButton': [{ type: core_1.Input },],
        'displayState': [{ type: core_1.HostBinding, args: ['style.display',] },],
    };
    return VgImaAds;
}());
exports.VgImaAds = VgImaAds;
var Ima = (function () {
    function Ima(imaAdsElement) {
        this.adDisplayContainer = new google.ima.AdDisplayContainer(imaAdsElement);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        this.adsManager = null;
        this.adsLoaded = false;
        this.currentAd = 0;
    }
    return Ima;
}());
exports.Ima = Ima;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctaW1hLWFkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWltYS1hZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFzQztBQUN0QyxxQkFBMEQsZUFBZSxDQUFDLENBQUE7QUFFMUUsdUJBQXNCLHlCQUF5QixDQUFDLENBQUE7QUFDaEQsMEJBQXlCLDBCQUEwQixDQUFDLENBQUE7QUFDcEQsa0NBQWdDLG9DQUFvQyxDQUFDLENBQUE7QUFHckU7SUFrQkksa0JBQVksR0FBZSxFQUFTLEdBQVU7UUFsQmxELGlCQWlSQztRQS9QdUMsUUFBRyxHQUFILEdBQUcsQ0FBTztRQU45QyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUc3QixpQkFBWSxHQUFXLE1BQU0sQ0FBQztRQUczQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCwyQkFBUSxHQUFSO1FBQUEsaUJBRUM7UUFERyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV4RSxtQ0FBZSxDQUFDLGtCQUFrQjthQUM3QixTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFDeEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDbEMsS0FBSyxDQUNSLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3pCLEtBQUssQ0FDUixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxrQ0FBZSxHQUFmO1FBQUEsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFnQixDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztZQUNqRCxJQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQztZQUVsRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNwQixLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakUsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQkFBTyxHQUFQO1FBQUEsaUJBcUJDO1FBcEJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUNkO2dCQUNJLElBQU0sVUFBVSxHQUFXLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO2dCQUN4RSxJQUFNLElBQUksR0FBbUIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBRXBDLFNBQVM7cUJBQ0osWUFBWSxFQUFFO3FCQUNkLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVuQyxTQUFTO3FCQUNKLE1BQU0sRUFBRTtxQkFDUixjQUFjLEVBQUUsQ0FBQztnQkFFdEIsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQy9CLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsS0FBVTtRQUNwQixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLG9CQUFRLENBQUMsT0FBTztnQkFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsUUFBZ0I7UUFDdkIsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELFVBQVUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRS9CLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxVQUFVLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsVUFBVSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELHFDQUFrQixHQUFsQixVQUFtQixHQUFxQztRQUNwRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLFVBQWlDO1FBQy9DLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDO1FBQ2pELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO1FBRWxELGtDQUFrQztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUMvQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUN2QyxLQUFLLENBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQ2hELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3hDLEtBQUssQ0FDUixDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFDL0MsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDdkMsS0FBSyxDQUNSLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUNoQyxLQUFLLENBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDNUIsS0FBSyxDQUNSLENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3pCLEtBQUssQ0FDUixDQUFDO1FBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELDBDQUF1QixHQUF2QjtRQUNJLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFOUQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDNUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsMENBQXVCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsMkNBQXdCLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxHQUFHO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWiw4QkFBOEI7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQztRQUN2RCxDQUFDO0lBQ0wsQ0FBQztJQUVELCtCQUFZLEdBQVo7UUFDSSwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsdUJBQUksR0FBSjtRQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsb0JBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1QkFBSSxHQUFKO1FBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQscUNBQWtCLEdBQWxCLFVBQW1CLE9BQWdCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUNBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFDRSxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLGtDQUFnQztvQkFDMUMsTUFBTSxFQUFFLENBQUUsZ1RBYVQsQ0FBRTtpQkFDTixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBNkQ7UUFDbEYsRUFBQyxJQUFJLEVBQUUsaUJBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxjQUFLLEdBQUc7S0FDZCxDQUFDO0lBQ0ssdUJBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDM0IsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDL0IsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDaEMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDakMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUNyQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUNoQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUNsQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRyxFQUFFLEVBQUU7S0FDbEUsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBalJELElBaVJDO0FBalJZLGdCQUFRLFdBaVJwQixDQUFBO0FBR0Q7SUFPSSxhQUFZLGFBQTBCO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxVQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxXQUFHLE1BZWYsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD0nLi9nb29nbGUuaW1hLnRzJy8+XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBsYXlhYmxlIH0gZnJvbSAnLi4vY29yZS92Zy1tZWRpYS9pLXBsYXlhYmxlJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgVmdFdmVudHMgfSBmcm9tICcuLi9jb3JlL2V2ZW50cy92Zy1ldmVudHMnO1xuaW1wb3J0IHsgVmdGdWxsc2NyZWVuQVBJIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaSc7XG5cblxuZXhwb3J0IGNsYXNzIFZnSW1hQWRzIHtcbiAgICAgdmdGb3I6IHN0cmluZztcbiAgICAgdmdOZXR3b3JrOiBzdHJpbmc7XG4gICAgIHZnVW5pdFBhdGg6IHN0cmluZztcbiAgICAgdmdDb21wYW5pb246IHN0cmluZztcbiAgICAgdmdDb21wYW5pb25TaXplOiBBcnJheTxOdW1iZXI+O1xuICAgICB2Z0FkVGFnVXJsOiBzdHJpbmc7XG4gICAgIHZnU2tpcEJ1dHRvbjogc3RyaW5nO1xuXG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBJUGxheWFibGU7XG4gICAgaW1hOiBJbWE7XG4gICAgc3Vic2NyaXB0aW9uczogYW55ID0ge307XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tpcEJ1dHRvbjogSFRNTEVsZW1lbnQ7XG5cbiAgICAgZGlzcGxheVN0YXRlOiBzdHJpbmcgPSAnbm9uZSc7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm9uQ29udGVudEVuZGVkID0gdGhpcy5vbkNvbnRlbnRFbmRlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoYXBpKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuQVBJLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKCgpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKTtcbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemF0aW9ucygpO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0LnN1YnNjcmlwdGlvbnMuZW5kZWQuc3Vic2NyaWJlKHRoaXMub25Db250ZW50RW5kZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudGFyZ2V0LnN1YnNjcmlwdGlvbnMucGxheS5zdWJzY3JpYmUodGhpcy5vblVwZGF0ZVN0YXRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIFZnRnVsbHNjcmVlbkFQSS5vbkNoYW5nZUZ1bGxzY3JlZW5cbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5pbWEuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcbiAgICAgICAgICAgIHRoaXMub25BZHNNYW5hZ2VyTG9hZGVkLmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmltYS5hZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICAgICAgICB0aGlzLm9uQWRFcnJvci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmxvYWRBZHMoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXphdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuaW1hID0gbmV3IEltYSh0aGlzLmVsZW0pO1xuXG4gICAgICAgIHRoaXMuc2tpcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy52Z1NraXBCdXR0b24pIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB0aGlzLnNraXBCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5za2lwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrU2tpcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5lbGVtLmluc2VydEJlZm9yZSh0aGlzLnNraXBCdXR0b24sIHRoaXMuZWxlbS5maXJzdENoaWxkKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdyA9IHRoaXMuQVBJLnZpZGVvZ3VsYXJFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgaCA9IHRoaXMuQVBJLnZpZGVvZ3VsYXJFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW1hLmFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWEuYWRzTWFuYWdlci5yZXNpemUodywgaCwgZ29vZ2xlLmltYS5WaWV3TW9kZS5GVUxMU0NSRUVOKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIucmVzaXplKHcsIGgsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRBZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnZnQ29tcGFuaW9uKSB7XG4gICAgICAgICAgICBnb29nbGV0YWcuY21kLnB1c2goXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZFVuaXRQYXRoOiBzdHJpbmcgPSAnLycgKyB0aGlzLnZnTmV0d29yayArICcvJyArIHRoaXMudmdVbml0UGF0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xvdDogZ29vZ2xldGFnLlNsb3QgPSBnb29nbGV0YWcuZGVmaW5lU2xvdChhZFVuaXRQYXRoLCB0aGlzLnZnQ29tcGFuaW9uU2l6ZSwgdGhpcy52Z0NvbXBhbmlvbik7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xuICAgICAgICAgICAgICAgICAgICBzbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLnB1YmFkcygpKTtcblxuICAgICAgICAgICAgICAgICAgICBnb29nbGV0YWdcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb21wYW5pb25BZHMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldFJlZnJlc2hVbmZpbGxlZFNsb3RzKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGdvb2dsZXRhZ1xuICAgICAgICAgICAgICAgICAgICAgICAgLnB1YmFkcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5hYmxlVmlkZW9BZHMoKTtcblxuICAgICAgICAgICAgICAgICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25VcGRhdGVTdGF0ZShldmVudDogYW55KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBWZ0V2ZW50cy5WR19QTEFZOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbWEuYWRzTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQVBJLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hLmFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEFkcyh0aGlzLnZnQWRUYWdVcmwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYS5hZHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcXVlc3RBZHMoYWRUYWdVcmw6IHN0cmluZykge1xuICAgICAgICAvLyBTaG93IG9ubHkgdG8gZ2V0IGNvbXB1dGVkIHN0eWxlIGluIHBpeGVsc1xuICAgICAgICB0aGlzLnNob3coKTtcblxuICAgICAgICBjb25zdCBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtKTtcbiAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90V2lkdGggPSBwYXJzZUludChjb21wdXRlZFN0eWxlLndpZHRoLCAxMCk7XG4gICAgICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90SGVpZ2h0ID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5oZWlnaHQsIDEwKTtcbiAgICAgICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RIZWlnaHQgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmhlaWdodCwgMTApO1xuXG4gICAgICAgIHRoaXMuaW1hLmFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xuICAgIH1cblxuICAgIG9uQWRzTWFuYWdlckxvYWRlZChldnQ6IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyID0gZXZ0LmdldEFkc01hbmFnZXIodGhpcy50YXJnZXQpO1xuICAgICAgICB0aGlzLnByb2Nlc3NBZHNNYW5hZ2VyKHRoaXMuaW1hLmFkc01hbmFnZXIpO1xuICAgIH1cblxuICAgIHByb2Nlc3NBZHNNYW5hZ2VyKGFkc01hbmFnZXI6IGdvb2dsZS5pbWEuQWRzTWFuYWdlcikge1xuICAgICAgICBjb25zdCB3ID0gdGhpcy5BUEkudmlkZW9ndWxhckVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLkFQSS52aWRlb2d1bGFyRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgLy8gQXR0YWNoIHRoZSBwYXVzZS9yZXN1bWUgZXZlbnRzLlxuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCxcbiAgICAgICAgICAgIHRoaXMub25Db250ZW50UGF1c2VSZXF1ZXN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCxcbiAgICAgICAgICAgIHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkLmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEFCTEVfU1RBVEVfQ0hBTkdFRCxcbiAgICAgICAgICAgIHRoaXMub25Ta2lwcGFibGVTdGF0ZUNoYW5nZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVELFxuICAgICAgICAgICAgdGhpcy5vbkFsbEFkc0NvbXBsZXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURSxcbiAgICAgICAgICAgIHRoaXMub25BZENvbXBsZXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuICAgICAgICAgICAgdGhpcy5vbkFkRXJyb3IuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5pbWEuYWRzTWFuYWdlci5pbml0KHcsIGgsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcbiAgICAgICAgdGhpcy5pbWEuYWRzTWFuYWdlci5zdGFydCgpO1xuICAgIH1cblxuICAgIG9uU2tpcHBhYmxlU3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBpc1NraXBwYWJsZSA9IHRoaXMuaW1hLmFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpO1xuXG4gICAgICAgIGlmIChpc1NraXBwYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5za2lwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5za2lwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrU2tpcCgpIHtcbiAgICAgICAgdGhpcy5pbWEuYWRzTWFuYWdlci5za2lwKCk7XG4gICAgfVxuXG4gICAgb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLkFQSS5wYXVzZSgpO1xuICAgIH1cblxuICAgIG9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcbiAgICAgICAgdGhpcy5BUEkucGxheSgpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvbkFkRXJyb3IoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmltYS5hZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5BUEkucGxheSgpO1xuICAgIH1cblxuICAgIG9uQWxsQWRzQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAvLyBUaGUgbGFzdCBhZCB3YXMgYSBwb3N0LXJvbGxcbiAgICAgICAgaWYgKHRoaXMuaW1hLmFkc01hbmFnZXIuZ2V0Q3VlUG9pbnRzKCkuam9pbigpLmluZGV4T2YoJy0xJykgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5BUEkucGF1c2UoKTsgLy8gaXQgd2FzIHN0b3AoKSBpbiBWaWRlb2d1bGFyIHYxXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFkQ29tcGxldGUoKSB7XG4gICAgICAgIC8vIFRPRE86IFVwZGF0ZSB2aWV3IHdpdGggY3VycmVudCBhZCBjb3VudFxuICAgICAgICB0aGlzLmltYS5jdXJyZW50QWQrKztcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoVmdFdmVudHMuVkdfU1RBUlRfQURTKSk7XG4gICAgICAgIHRoaXMuZGlzcGxheVN0YXRlID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoVmdFdmVudHMuVkdfRU5EX0FEUykpO1xuICAgICAgICB0aGlzLmRpc3BsYXlTdGF0ZSA9ICdub25lJztcbiAgICB9XG5cbiAgICBvbkNvbnRlbnRFbmRlZCgpIHtcbiAgICAgICAgdGhpcy5pbWEuYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRnVsbHNjcmVlbihmc1N0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghVmdGdWxsc2NyZWVuQVBJLm5hdGl2ZUZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNGdWxsc2NyZWVuID0gZnNTdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICBzZWxlY3RvcjogJ3ZnLWltYS1hZHMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZnLWltYS1hZHNcIj48L2Rpdj5gLFxuICAgIHN0eWxlczogWyBgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgei1pbmRleDogMzAwO1xuICAgICAgICB9XG4gICAgICAgIC52Zy1pbWEtYWRzIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgIF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBWZ0FQSSwgfSxcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ3ZnRm9yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3ZnTmV0d29yayc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z1VuaXRQYXRoJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3ZnQ29tcGFuaW9uJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3ZnQ29tcGFuaW9uU2l6ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z0FkVGFnVXJsJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3ZnU2tpcEJ1dHRvbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbidkaXNwbGF5U3RhdGUnOiBbeyB0eXBlOiBIb3N0QmluZGluZywgYXJnczogWydzdHlsZS5kaXNwbGF5JywgXSB9LF0sXG59O1xufVxuXG5cbmV4cG9ydCBjbGFzcyBJbWEge1xuICAgIGFkRGlzcGxheUNvbnRhaW5lcjogZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXI7XG4gICAgYWRzTG9hZGVyOiBnb29nbGUuaW1hLkFkc0xvYWRlcjtcbiAgICBhZHNNYW5hZ2VyOiBnb29nbGUuaW1hLkFkc01hbmFnZXI7XG4gICAgYWRzTG9hZGVkOiBib29sZWFuO1xuICAgIGN1cnJlbnRBZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoaW1hQWRzRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoaW1hQWRzRWxlbWVudCk7XG4gICAgICAgIHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLmFkc01hbmFnZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmFkc0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRBZCA9IDA7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=
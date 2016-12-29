"use strict";
var vg_scrub_bar_buffering_time_1 = require("./vg-scrub-bar-buffering-time");
var vg_api_1 = require("../../../core/services/vg-api");
describe('Scrub bar buffering time', function () {
    var scrubBarBufferingTime;
    var ref;
    var api;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        api = new vg_api_1.VgAPI();
        scrubBarBufferingTime = new vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime(ref, api);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById');
        scrubBarBufferingTime.vgFor = 'test';
        scrubBarBufferingTime.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    describe('getPercentage', function () {
        it('should return 50% when buffer end is 10 and total time is 20', function () {
            scrubBarBufferingTime.target = {
                time: {
                    total: 20
                },
                buffer: {
                    end: 10
                },
                buffered: [1]
            };
            var percent = scrubBarBufferingTime.getBufferTime();
            expect(percent).toEqual('50%');
        });
        it('should return 25% when buffer end is 5 and total time is 20', function () {
            scrubBarBufferingTime.target = {
                time: {
                    total: 20
                },
                buffer: {
                    end: 5
                },
                buffered: [1]
            };
            var percent = scrubBarBufferingTime.getBufferTime();
            expect(percent).toEqual('25%');
        });
        it('should return 0% when no buffer is loaded', function () {
            scrubBarBufferingTime.target = {
                buffer: null
            };
            var percent = scrubBarBufferingTime.getBufferTime();
            expect(percent).toEqual('0%');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1zY3J1Yi1iYXItYnVmZmVyaW5nLXRpbWUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNENBQXNDLCtCQUErQixDQUFDLENBQUE7QUFDdEUsdUJBQW9CLCtCQUErQixDQUFDLENBQUE7QUFHcEQsUUFBUSxDQUFDLDBCQUEwQixFQUFFO0lBQ2pDLElBQUkscUJBQThDLENBQUM7SUFDbkQsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFFZCxVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0o7U0FDSixDQUFDO1FBRUYsR0FBRyxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFFbEIscUJBQXFCLEdBQUcsSUFBSSxxREFBdUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUU7UUFDakMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUUzQixxQkFBcUIsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3RCLEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtZQUMvRCxxQkFBcUIsQ0FBQyxNQUFNLEdBQUc7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsRUFBRTtpQkFDWjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osR0FBRyxFQUFFLEVBQUU7aUJBQ1Y7Z0JBQ0QsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hCLENBQUM7WUFFRixJQUFJLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDZEQUE2RCxFQUFFO1lBQzlELHFCQUFxQixDQUFDLE1BQU0sR0FBRztnQkFDM0IsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxFQUFFO2lCQUNaO2dCQUNELE1BQU0sRUFBRTtvQkFDSixHQUFHLEVBQUUsQ0FBQztpQkFDVDtnQkFDRCxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEIsQ0FBQztZQUVGLElBQUksT0FBTyxHQUFHLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXBELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7WUFDNUMscUJBQXFCLENBQUMsTUFBTSxHQUFHO2dCQUMzQixNQUFNLEVBQUUsSUFBSTthQUNmLENBQUM7WUFFRixJQUFJLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWV9IGZyb20gXCIuL3ZnLXNjcnViLWJhci1idWZmZXJpbmctdGltZVwiO1xuaW1wb3J0IHtWZ0FQSX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmRlc2NyaWJlKCdTY3J1YiBiYXIgYnVmZmVyaW5nIHRpbWUnLCAoKSA9PiB7XG4gICAgbGV0IHNjcnViQmFyQnVmZmVyaW5nVGltZTogVmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWU7XG4gICAgbGV0IHJlZjpFbGVtZW50UmVmO1xuICAgIGxldCBhcGk6VmdBUEk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgcmVmID0ge1xuICAgICAgICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICAgICAgICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGFwaSA9IG5ldyBWZ0FQSSgpO1xuXG4gICAgICAgIHNjcnViQmFyQnVmZmVyaW5nVGltZSA9IG5ldyBWZ1NjcnViQmFyQnVmZmVyaW5nVGltZShyZWYsIGFwaSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBtZWRpYSBieSBpZCBvbiBpbml0JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICdnZXRNZWRpYUJ5SWQnKTtcblxuICAgICAgICBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUudmdGb3IgPSAndGVzdCc7XG4gICAgICAgIHNjcnViQmFyQnVmZmVyaW5nVGltZS5vblBsYXllclJlYWR5KCk7XG5cbiAgICAgICAgZXhwZWN0KGFwaS5nZXRNZWRpYUJ5SWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd0ZXN0Jyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGVyY2VudGFnZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gNTAlIHdoZW4gYnVmZmVyIGVuZCBpcyAxMCBhbmQgdG90YWwgdGltZSBpcyAyMCcsICgpID0+IHtcbiAgICAgICAgICAgIHNjcnViQmFyQnVmZmVyaW5nVGltZS50YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgdGltZToge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMjBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ1ZmZlcjoge1xuICAgICAgICAgICAgICAgICAgICBlbmQ6IDEwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWZmZXJlZDogWzFdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgcGVyY2VudCA9IHNjcnViQmFyQnVmZmVyaW5nVGltZS5nZXRCdWZmZXJUaW1lKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwZXJjZW50KS50b0VxdWFsKCc1MCUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gMjUlIHdoZW4gYnVmZmVyIGVuZCBpcyA1IGFuZCB0b3RhbCB0aW1lIGlzIDIwJywgKCkgPT4ge1xuICAgICAgICAgICAgc2NydWJCYXJCdWZmZXJpbmdUaW1lLnRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAyMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnVmZmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGVuZDogNVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnVmZmVyZWQ6IFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUuZ2V0QnVmZmVyVGltZSgpO1xuXG4gICAgICAgICAgICBleHBlY3QocGVyY2VudCkudG9FcXVhbCgnMjUlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIDAlIHdoZW4gbm8gYnVmZmVyIGlzIGxvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNjcnViQmFyQnVmZmVyaW5nVGltZS50YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyOiBudWxsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgcGVyY2VudCA9IHNjcnViQmFyQnVmZmVyaW5nVGltZS5nZXRCdWZmZXJUaW1lKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwZXJjZW50KS50b0VxdWFsKCcwJScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=
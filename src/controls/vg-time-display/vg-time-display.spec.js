"use strict";
var vg_time_display_1 = require("./vg-time-display");
var vg_api_1 = require("../../core/services/vg-api");
describe('Time Display', function () {
    var timeDisplay;
    var ref;
    var api;
    var renderer;
    beforeEach(function () {
        api = new vg_api_1.VgAPI();
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        renderer = {
            setElementClass: function () { }
        };
        timeDisplay = new vg_time_display_1.VgTimeDisplay(ref, api);
    });
    it('Should have been defined', function () {
        expect(timeDisplay).toBeTruthy();
    });
    it('Should be initialized', function () {
        spyOn(api, 'getMediaById').and.callFake(function () { return ref.nativeElement; });
        timeDisplay.vgFor = 'test';
        timeDisplay.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
        expect(timeDisplay.target).toBe(ref.nativeElement);
    });
    describe('getTime', function () {
        it('should return 0 when no target defined', function () {
            expect(timeDisplay.getTime()).toBe(0);
        });
        it('should return 0 when target and its property cannot be evaluated to number', function () {
            timeDisplay.vgProperty = "something";
            timeDisplay.target = {
                time: {
                    "something": "abcd"
                }
            };
            expect(timeDisplay.getTime()).toBe(0);
        });
        it('should return a rounded number when target and its vgProperty can be evaluated to number', function () {
            timeDisplay.vgProperty = "something";
            timeDisplay.target = {
                time: {
                    "something": 5.3
                }
            };
            expect(timeDisplay.getTime()).toBe(5);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdGltZS1kaXNwbGF5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy10aW1lLWRpc3BsYXkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0NBQTRCLG1CQUFtQixDQUFDLENBQUE7QUFFaEQsdUJBQW9CLDRCQUE0QixDQUFDLENBQUE7QUFFakQsUUFBUSxDQUFDLGNBQWMsRUFBRTtJQUNyQixJQUFJLFdBQXlCLENBQUM7SUFDOUIsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFDZCxJQUFJLFFBQVEsQ0FBQztJQUViLFVBQVUsQ0FBQztRQUNQLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBRWxCLEdBQUcsR0FBRztZQUNGLGFBQWEsRUFBRTtnQkFDWCxZQUFZLEVBQUUsVUFBQyxJQUFJO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSjtTQUNKLENBQUM7UUFFRixRQUFRLEdBQUc7WUFDUCxlQUFlLEVBQUUsY0FBTyxDQUFDO1NBQzVCLENBQUM7UUFFRixXQUFXLEdBQUcsSUFBSSwrQkFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7UUFDeEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQVEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3RSxXQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUMzQixXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2hCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtZQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDRFQUE0RSxFQUFFO1lBQzdFLFdBQVcsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1lBQ3JDLFdBQVcsQ0FBQyxNQUFNLEdBQUc7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixXQUFXLEVBQUUsTUFBTTtpQkFDdEI7YUFDSixDQUFDO1lBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywwRkFBMEYsRUFBRTtZQUMzRixXQUFXLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztZQUNyQyxXQUFXLENBQUMsTUFBTSxHQUFHO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0YsV0FBVyxFQUFFLEdBQUc7aUJBQ25CO2FBQ0osQ0FBQztZQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWZ1RpbWVEaXNwbGF5fSBmcm9tIFwiLi92Zy10aW1lLWRpc3BsYXlcIjtcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmdBUEl9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaVwiO1xuXG5kZXNjcmliZSgnVGltZSBEaXNwbGF5JywgKCkgPT4ge1xuICAgIGxldCB0aW1lRGlzcGxheTpWZ1RpbWVEaXNwbGF5O1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuICAgIGxldCByZW5kZXJlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcblxuICAgICAgICByZWYgPSB7XG4gICAgICAgICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgICAgICAgICAgZ2V0QXR0cmlidXRlOiAobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyZXIgPSB7XG4gICAgICAgICAgICBzZXRFbGVtZW50Q2xhc3M6ICgpID0+IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGltZURpc3BsYXkgPSBuZXcgVmdUaW1lRGlzcGxheShyZWYsIGFwaSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhdmUgYmVlbiBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QodGltZURpc3BsYXkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgYmUgaW5pdGlhbGl6ZWQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJ2dldE1lZGlhQnlJZCcpLmFuZC5jYWxsRmFrZSgoKSA9PiB7IHJldHVybiByZWYubmF0aXZlRWxlbWVudDsgfSk7XG5cbiAgICAgICAgdGltZURpc3BsYXkudmdGb3IgPSAndGVzdCc7XG4gICAgICAgIHRpbWVEaXNwbGF5Lm9uUGxheWVyUmVhZHkoKTtcblxuICAgICAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3Rlc3QnKTtcbiAgICAgICAgZXhwZWN0KHRpbWVEaXNwbGF5LnRhcmdldCkudG9CZShyZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0VGltZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gMCB3aGVuIG5vIHRhcmdldCBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHRpbWVEaXNwbGF5LmdldFRpbWUoKSkudG9CZSgwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIDAgd2hlbiB0YXJnZXQgYW5kIGl0cyBwcm9wZXJ0eSBjYW5ub3QgYmUgZXZhbHVhdGVkIHRvIG51bWJlcicsICgpID0+IHtcbiAgICAgICAgICAgIHRpbWVEaXNwbGF5LnZnUHJvcGVydHkgPSBcInNvbWV0aGluZ1wiO1xuICAgICAgICAgICAgdGltZURpc3BsYXkudGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzb21ldGhpbmdcIjogXCJhYmNkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KHRpbWVEaXNwbGF5LmdldFRpbWUoKSkudG9CZSgwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgcm91bmRlZCBudW1iZXIgd2hlbiB0YXJnZXQgYW5kIGl0cyB2Z1Byb3BlcnR5IGNhbiBiZSBldmFsdWF0ZWQgdG8gbnVtYmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgdGltZURpc3BsYXkudmdQcm9wZXJ0eSA9IFwic29tZXRoaW5nXCI7XG4gICAgICAgICAgICB0aW1lRGlzcGxheS50YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgdGltZToge1xuICAgICAgICAgICAgICAgICAgICBcInNvbWV0aGluZ1wiOiA1LjNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KHRpbWVEaXNwbGF5LmdldFRpbWUoKSkudG9CZSg1KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
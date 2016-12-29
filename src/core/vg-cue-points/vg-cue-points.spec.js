"use strict";
var Observable_1 = require('rxjs/Observable');
var vg_cue_points_1 = require("./vg-cue-points");
require('rxjs/add/observable/fromEvent');
describe('Cue points', function () {
    var cuePoints;
    var ref;
    beforeEach(function () {
        ref = {
            nativeElement: {
                subscriptions: {
                    timeUpdate: {
                        load: function () { },
                        subscribe: function () { }
                    }
                }
            }
        };
        cuePoints = new vg_cue_points_1.VgCuePoints(ref);
    });
    it('Should handle onLoad event', function () {
        spyOn(Observable_1.Observable, 'fromEvent').and.callThrough();
        cuePoints.ngOnInit();
        expect(Observable_1.Observable.fromEvent).toHaveBeenCalledWith(ref.nativeElement, 'load');
    });
    it('Should handle onLoad event', function () {
        spyOn(Observable_1.Observable, 'fromEvent').and.callThrough();
        var cue = { enter: function () { }, exit: function () { } };
        var event = {
            target: {
                track: {
                    cues: [
                        cue,
                        cue,
                        cue,
                        cue
                    ]
                }
            }
        };
        cuePoints.onLoad(event);
        expect(Observable_1.Observable.fromEvent).toHaveBeenCalledWith(cue, 'enter');
        expect(Observable_1.Observable.fromEvent).toHaveBeenCalledWith(cue, 'exit');
        expect(Observable_1.Observable.fromEvent).toHaveBeenCalledTimes(8);
    });
    it('Should handle onEnter event', function () {
        spyOn(cuePoints.onEnterCuePoint, 'next').and.callThrough();
        var event = {
            target: {}
        };
        cuePoints.onEnter(event);
        expect(cuePoints.onEnterCuePoint.next).toHaveBeenCalledWith(event.target);
    });
    it('Should handle onExit event', function () {
        spyOn(cuePoints.onExitCuePoint, 'next').and.callThrough();
        var event = {
            target: {}
        };
        cuePoints.onExit(event);
        expect(cuePoints.onExitCuePoint.next).toHaveBeenCalledWith(event.target);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY3VlLXBvaW50cy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctY3VlLXBvaW50cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSwyQkFBeUIsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyw4QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUU1QyxRQUFPLCtCQUErQixDQUFDLENBQUE7QUFFdkMsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUNuQixJQUFJLFNBQXFCLENBQUM7SUFDMUIsSUFBSSxHQUFjLENBQUM7SUFFbkIsVUFBVSxDQUFDO1FBQ1AsR0FBRyxHQUFHO1lBQ0YsYUFBYSxFQUFFO2dCQUNYLGFBQWEsRUFBRTtvQkFDWCxVQUFVLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLGNBQU8sQ0FBQzt3QkFDZCxTQUFTLEVBQUUsY0FBTyxDQUFDO3FCQUN0QjtpQkFDSjthQUNKO1NBQ0osQ0FBQztRQUVGLFNBQVMsR0FBRyxJQUFJLDJCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDN0IsS0FBSyxDQUFDLHVCQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpELFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVyQixNQUFNLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFO1FBQzdCLEtBQUssQ0FBQyx1QkFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVqRCxJQUFJLEdBQUcsR0FBRyxFQUFDLEtBQUssRUFBRSxjQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBTyxDQUFDLEVBQUMsQ0FBQztRQUU1QyxJQUFJLEtBQUssR0FBRztZQUNSLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFO3dCQUNGLEdBQUc7d0JBQ0gsR0FBRzt3QkFDSCxHQUFHO3dCQUNILEdBQUc7cUJBQ047aUJBQ0o7YUFDSjtTQUNKLENBQUM7UUFFRixTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUU7UUFDOUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTNELElBQUksS0FBSyxHQUFHO1lBQ1IsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDN0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTFELElBQUksS0FBSyxHQUFHO1lBQ1IsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7VmdDdWVQb2ludHN9IGZyb20gXCIuL3ZnLWN1ZS1wb2ludHNcIjtcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5cbmRlc2NyaWJlKCdDdWUgcG9pbnRzJywgKCkgPT4ge1xuICAgIGxldCBjdWVQb2ludHM6VmdDdWVQb2ludHM7XG4gICAgbGV0IHJlZjpFbGVtZW50UmVmO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZiA9IHtcbiAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVVcGRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWQ6ICgpID0+IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGN1ZVBvaW50cyA9IG5ldyBWZ0N1ZVBvaW50cyhyZWYpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgb25Mb2FkIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihPYnNlcnZhYmxlLCAnZnJvbUV2ZW50JykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgY3VlUG9pbnRzLm5nT25Jbml0KCk7XG5cbiAgICAgICAgZXhwZWN0KE9ic2VydmFibGUuZnJvbUV2ZW50KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZWYubmF0aXZlRWxlbWVudCwgJ2xvYWQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uTG9hZCBldmVudCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oT2JzZXJ2YWJsZSwgJ2Zyb21FdmVudCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgIGxldCBjdWUgPSB7ZW50ZXI6ICgpID0+IHt9LCBleGl0OiAoKSA9PiB7fX07XG5cbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgdHJhY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgY3VlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VlXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY3VlUG9pbnRzLm9uTG9hZChldmVudCk7XG5cbiAgICAgICAgZXhwZWN0KE9ic2VydmFibGUuZnJvbUV2ZW50KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjdWUsICdlbnRlcicpO1xuICAgICAgICBleHBlY3QoT2JzZXJ2YWJsZS5mcm9tRXZlbnQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGN1ZSwgJ2V4aXQnKTtcbiAgICAgICAgZXhwZWN0KE9ic2VydmFibGUuZnJvbUV2ZW50KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoOCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBvbkVudGVyIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjdWVQb2ludHMub25FbnRlckN1ZVBvaW50LCAnbmV4dCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIHRhcmdldDoge31cbiAgICAgICAgfTtcblxuICAgICAgICBjdWVQb2ludHMub25FbnRlcihldmVudCk7XG5cbiAgICAgICAgZXhwZWN0KGN1ZVBvaW50cy5vbkVudGVyQ3VlUG9pbnQubmV4dCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZXZlbnQudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uRXhpdCBldmVudCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY3VlUG9pbnRzLm9uRXhpdEN1ZVBvaW50LCAnbmV4dCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIHRhcmdldDoge31cbiAgICAgICAgfTtcblxuICAgICAgICBjdWVQb2ludHMub25FeGl0KGV2ZW50KTtcblxuICAgICAgICBleHBlY3QoY3VlUG9pbnRzLm9uRXhpdEN1ZVBvaW50Lm5leHQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG59KTtcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19
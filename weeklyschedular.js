var inst = mobiscroll.eventcalendar('#demo-desktop-week-view', {
    theme: 'ios',
    themeVariant: 'light',
    dragToCreate: true, 
    dragToMove: true, 
    dragToResize: true,
    view: {
        schedule: { type: 'week' }
    },
    onEventClick: function (event, inst) {
        mobiscroll.toast({
            message: event.event.title
        });
    }
});

mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
    inst.setEvents(events);
}, 'jsonp');

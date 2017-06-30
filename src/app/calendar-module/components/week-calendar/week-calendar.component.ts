import { Component, OnInit, Input, Output } from '@angular/core';

import { CalendarService, CalEvent, EventService } from "../../services";
import * as moment from 'moment';
@Component({
    selector: 'week-calendar',
    templateUrl: './week-calendar.component.html'
})
export class WeekCalendarComponent implements OnInit {
    today: Date;
    currWeekDay: any;
    constructor(private _calendarService: CalendarService, private _eventService: EventService) { }
    weekArr: Date[] = [];
    weekDays: any[] = ['Mon', 'Tue', 'Wed','Thur','Fri','Sat', 'Sun'];
    timeSlotArray: any[] = [];

    eventTime: Date;
    isEventEditorVisible = false;
    minInPx: number = 1;
    slotHeight: number = 30;

    allEvents: CalEvent[] = [];
    eventToEdit: CalEvent = new CalEvent();

    ngOnInit() { 
        this.today = moment().toDate();
        console.log('today', this.today);
        this.currWeekDay = moment(this.today);
        this.setTimeSlots();
        this.initialize(this.today);
        this.initializeEvents();
    }

    // Initialize the component wrt to current date
    initialize(date:any){
        this.weekArr = this._calendarService.getWeek(date);
        this.slotHeight = this._calendarService.timeDuration * this.minInPx;
    }

    setTimeSlots(){
        let timeSlotCount = (24 * 60) / this._calendarService.timeDuration;
        let duration = 0;
        let arr: any[] = [];
        let i = 0;
        while(i < timeSlotCount){
            let m = moment().startOf('day').set({minutes: (i * this._calendarService.timeDuration)});
            arr.push(m.toDate());
            i++;
        }
        this.timeSlotArray = arr.slice();
    }
    // fetching all events
    initializeEvents(){
        this.allEvents = this._eventService.getEvents();
        console.log('allEvents ', this.allEvents);
    }

    getDateInFormat(date:any, format = 'DD'){
        return moment(date).format(format);
    }

    openEventEditor(date: any, time: any){
        let t = moment(time);
        let m = moment(date).set({
            hour: t.hour(),
            minute: t.minute()
        });
        this.eventTime = m.toDate();
        this.isEventEditorVisible = true;
        console.log('yahhooo', this.isEventEditorVisible);
    }

    gotoNextWeek(){
        this.currWeekDay.add('day', 6);
        this.initialize(this.currWeekDay.toDate());
    }

    gotoLastWeek(){
        this.currWeekDay.subtract('day', 6);
        this.initialize(this.currWeekDay.toDate());
    }

    onAddEvent(e:any){
        this.initializeEvents();
        this.eventToEdit = new CalEvent();
    }

    getEventsByDate(date: Date){
        let d = moment(date);
        return this.allEvents.filter((e:CalEvent) => moment(e.startTime).format('DD/MM/YYYY') == d.format('DD/MM/YYYY'));
    }

    getTopFromTime(date: Date){
        let m = moment(date);
        let h = m.hours();
        let min = m.minute();
        let top = (h * 60) + min;
        return top;
    }

    getHeightOfEvent(e: CalEvent){
        let st = moment(e.startTime);
        let startMinutes = (st.hour() * 60) + st.minutes();
        let et = moment(e.endTime);
        let endMinutes = (et.hour() * 60) + et.minutes();
        return  endMinutes - startMinutes;
    }

    editEvent(e: CalEvent){
        this.eventToEdit = e;
        this.eventTime = new Date();
        this.isEventEditorVisible = true;
    }

}
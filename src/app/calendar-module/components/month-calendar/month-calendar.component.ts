import { Component, OnInit } from '@angular/core';
import { CalendarService, CalEvent, EventService } from "../../services";

import * as moment from 'moment';

@Component({
    selector: 'month-calendar',
    templateUrl: 'month-calendar.component.html'
})

export class MonthCalendarComponent implements OnInit {

    currMonth: Date;
    monthArr:any[] = [];
    weekArr: any[] = [];
    eventTime: Date;
    isEventEditorVisible = false;
    allEvents: CalEvent[] = [];
    selectedDate: Date = new Date;

    constructor(private _calendarService: CalendarService, private _eventService: EventService) { }

    ngOnInit() { 
        this.currMonth = new Date();
        this.initialize(this.currMonth);
        this.initializeEvents();
    }

    initialize(date: Date){
        this.monthArr = this._calendarService.getMonth(this.currMonth);
        this.weekArr = this.monthArr[0].slice();
    }
    gotoLastMonth(){
        this.currMonth = moment(this.currMonth).subtract('month', 1).toDate();
        this.initialize(this.currMonth);
    }
    gotoNextMonth(){
        this.currMonth = moment(this.currMonth).add('month', 1).toDate();
        this.initialize(this.currMonth);
    }

    getDateInFormat(date:any, format = 'DD'){
        return moment(date).format(format);
    }

    openEventEditor(day: Date){
        let t = moment();
        let m = moment(day).set({
            hour: t.hour(),
            minute: t.minute()
        });
        this.eventTime = m.toDate();
        this.isEventEditorVisible = true;
        console.log('yahhooo', this.isEventEditorVisible);
    }

    onAddEvent(e:any){
        this.initializeEvents();
    }

    getEventsByDate(date: Date){
        let d = moment(date);
        return this.allEvents.filter((e:CalEvent) => moment(e.startTime).format('DD/MM/YYYY') == d.format('DD/MM/YYYY'));
    }

    initializeEvents(){
        this.allEvents = this._eventService.getEvents();
        console.log('allEvents ', this.allEvents);
    }

    selectDate(date: Date){
        this.selectedDate = date;
    }

    isCurrentMonthDate(date: Date){
        if(moment(this.currMonth).format('M YYYY') == moment(date).format('M YYYY')){
            return true;
        } else {
            return false;
        }
    }

    isBeforeToday(date: Date){
        if(moment().format('YYYY-MM-DD') > moment(date).format('YYYY-MM-DD')){
            return true;
        } else {
            return false;
        }

    }

}
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class CalEvent {
    id:number = 0;
    title: string = '';
    description: string = '';
    startTime: Date;
    endTime: Date ;
} 

declare var jQuery: any;

@Injectable()
export class EventService {
    constructor() { }
    static allEvents: CalEvent[] = [];
    static idCount: number = 1;
    getEventObject(obj = {}): CalEvent{
        let e = new CalEvent();
        let x = jQuery.extend(true, e, obj);
        return x;
    }

    getEvents(){
        return EventService.allEvents;
    }


    addEvent(e:any){
        let eventsClone = EventService.allEvents.slice();
        let i = eventsClone.findIndex((ce:CalEvent) => ce.id == e.id);
        if(i > -1){
            eventsClone[i] = e;
        } else {
            let newEvent = this.getEventObject(e);
            newEvent.id = EventService.idCount++;
            eventsClone.push(newEvent);
        }
        EventService.allEvents = eventsClone.slice();
        return EventService.allEvents.slice();
    }

    removeEvent(id:number){
        let eventClone = EventService.allEvents.slice();
        let i = eventClone.findIndex((e: CalEvent) => e.id == id);
        if(i > -1){
            eventClone.splice(i, 1);
        }
        EventService.allEvents = eventClone.slice();
    }
}
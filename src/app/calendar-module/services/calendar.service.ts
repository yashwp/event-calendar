import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class CalendarService {
    
    constructor() { }

    timeDuration: number = 30;
    getWeek(day: Date) : Date[]{
        let m = moment(day);
        let arr: Date[] = [];
        let i = 0;
        while(i < 7){
            arr.push(m.day(i).toDate());
            i++;
        }
        return arr;
    }

    getMonth(day: Date){
        let m = moment(day).startOf('month').day(0);
        console.log('start of month ', m.format('DD MMM'))
        let i = 0;
        let month: any[] = [];
        let count = 1;
        while(i < 6){
            console.log('first loop' + i);
            let week: Date[] = []; // = [
            //     m.clone().toDate(),
            //     m.clone().add( 1, 'day').toDate(),
            //     m.clone().add( 2, 'day').toDate(),
            //     m.clone().add( 3, 'day').toDate(),
            //     m.clone().add( 4, 'day').toDate(),
            //     m.clone().add( 5, 'day').toDate(),
            //     m.clone().add( 6, 'day').toDate(),
            // ];
            let x = 0;
            while(x < 7){
                console.log('second loop' + x);
                week.push(m.clone().toDate());
                m.add( 1, 'day');
                x++;
            }
            i++;
            month.push(week.slice());
        }
        return month;
    }

}
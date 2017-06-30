import { Component, ViewChild, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal'; 
import { NgForm } from "@angular/forms";
import * as moment from 'moment';
import { EventService, CalEvent, CalendarService } from "../../services";
 
declare var jQuery:any;

@Component({
  selector: 'event-editor',
  templateUrl: './event-editor.component.html'
})
export class EventEditorComponent implements OnInit {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;

  @Input()
  isModalShown:boolean = true;
  @Input()
  calEvent: CalEvent = new CalEvent;
  @Input()
  eventDate: Date;
  _calEvent: CalEvent = new CalEvent;

  @Output()
  onHideModal = new EventEmitter();

  @Output()
  onAddEvent = new EventEmitter();
  isEndTimeValid:boolean= false;

  constructor(private _eventService: EventService){

  }

  ngOnInit() {
    if(this.calEvent){
      this._calEvent = jQuery.extend(true, this._calEvent, this.calEvent);
    }
    if(this.eventDate && !this.calEvent.startTime){
      this._calEvent.startTime = this.eventDate;
      this._calEvent.endTime = moment(this.eventDate).add('minutes', 30).toDate();
    }
  }

// Saving the event 
  saveEvent(f: NgForm){
    if(f.valid && this.isTimeValid(f.controls['start-time'].value) && this.isTimeValid(f.controls['end-time'].value)){
      let o = new CalEvent();
      o.title = this._calEvent.title;
      o.description = this._calEvent.description;
      let startTime = this.getMomentFromTime(f.controls['start-time'].value);
      let endTime = this.getMomentFromTime(f.controls['end-time'].value);
        o.startTime = moment(this.eventDate).clone().set({hour: startTime.hours(), minutes: startTime.minutes()}).toDate();
        o.endTime = moment(this.eventDate).clone().set({hour: endTime.hours(), minutes: endTime.minutes()}).toDate();
        this._eventService.addEvent(o);
        this.onAddEvent.emit(o);
        this.hideModal();
    }
  }

  getFormatedDate(d: any, format: string ){
    return moment(d).format(format);
  }

// Modal hide show functionality
  public showModal():void {
    this.isModalShown = true;
  }
 
  public hideModal():void {
    this.autoShownModal.hide();
  }
 
  public onHidden():void {
    this.isModalShown = false;
    this.onHideModal.emit(true);
  }

  // Validating the time according to time version
  isTimeValid(t: any){
    let check = false;
    if(t){
      check = moment(t, 'HH:mm').isValid(); //|| 
      if(check == false){
        check = moment(t, 'hh:mm a').isValid();
      }
    }
    return check;
  }

  // isTimeBefore(at: any, bt:any){
  //     let check = false;
  //     let t1 = this.getMomentFromTime(at);
  //     let t2 = this.getMomentFromTime(bt);
      
  //       if(t1.isBefore(t2)){
  //         check = true;
  //       }
    
  //   return check;
  // }

// 
  getMomentFromTime(t:any){
    // To check time 24 or 12 version and return a valid moment obj
    let m = moment(t, 'H:m');
    let m2 = moment(t, 'h:m a');
    if(m.isValid()){
      return m;
    } else if(m2.isValid()){
      return m2;
    }
    return null;
  }

}
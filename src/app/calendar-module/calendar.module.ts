import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeekCalendarComponent, MonthCalendarComponent, EventEditorComponent } from "./components";
import { CalendarService, EventService } from "./services";
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [ BrowserModule,  ModalModule.forRoot(), FormsModule],
    declarations: [ WeekCalendarComponent, MonthCalendarComponent, EventEditorComponent],
    providers: [CalendarService, EventService],
    exports: [WeekCalendarComponent, MonthCalendarComponent, EventEditorComponent]
    // bootstrap:    [  ]
})
export class CalendarModule { }
import {Component, OnInit} from '@angular/core';
import {Meeting, Meetings, MeetingsService} from '../../services/meetings.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.sass']
})
export class MeetingsComponent implements OnInit {
  constructor(private meetingService: MeetingsService) {
  }

  meetings: Meetings;
  message: string;
  meeting: Meeting;

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings(): void {
    this.meetingService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
      console.log(this.meetings);

      if (this.meetings.message) {
        this.message = this.meetings.message[0];
      }
      else{
        this.message = 'Following meeting was found on this server:';
      }

      if (this.meetings.meetings[0].meeting) {
        console.log(this.meetings.meetings[0].meeting[0]);
        this.meeting = this.meetings.meetings[0].meeting[0];
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {MeetingConfiguration, MeetingRoomInfo, MeetingsService} from '../../services/meetings.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.sass']
})

export class AdministrationComponent implements OnInit {

  constructor(private meetingService: MeetingsService) {
  }

  meetingConfiguration: MeetingConfiguration;
  meetingRoomInfo: MeetingRoomInfo;
  moderatorUrl: string;
  attendeeUrl: string;
  meetingEndUrl: string;

  ngOnInit(): void {

    this.meetingConfiguration = null;
    this.meetingRoomInfo = null;

    this.attendeeUrl = null;
    this.moderatorUrl = null;
    this.meetingEndUrl = null;

    this.meetingConfiguration = new MeetingConfiguration(
      'TestRoom',
      123,
      {
        attendeePW: 'notasecret',
        moderatorPW: 'alsonotasecret',
        duration: 10
      });

    this.createMeeting(this.meetingConfiguration);
  }

  createMeeting(config: MeetingConfiguration): void {
    this.meetingService.createMeeting(config).subscribe(meetingRoomInfo => {
      this.meetingRoomInfo = meetingRoomInfo;

      if (this.meetingRoomInfo.moderatorUrl) {
        this.moderatorUrl = this.meetingRoomInfo.moderatorUrl;
      }
      if (this.meetingRoomInfo.attendeeUrl) {
        this.attendeeUrl = this.meetingRoomInfo.attendeeUrl;
      }
      if (this.meetingRoomInfo.meetingEndUrl) {
        this.meetingEndUrl = this.meetingRoomInfo.meetingEndUrl;
      }
    });
  }
}

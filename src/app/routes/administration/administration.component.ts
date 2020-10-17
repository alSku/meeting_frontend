import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MeetingConfiguration, MeetingRoomInfo, MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.sass']
})

export class AdministrationComponent implements OnInit {

  constructor(private meetingService: MeetingsService, private sanitizer: DomSanitizer) {
  }

  meetingConfiguration: MeetingConfiguration;
  meetingRoomInfo: MeetingRoomInfo;
  moderatorUrl: SafeResourceUrl;
  attendeeUrl: SafeResourceUrl;
  meetingEndUrl: SafeResourceUrl;

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
        let test = this.sanitizer.sanitize(SecurityContext.URL, this.meetingRoomInfo.moderatorUrl);
        this.moderatorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(test);
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

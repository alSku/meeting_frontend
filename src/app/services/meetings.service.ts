import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../http-error-handling.service';

export class Meetings {
  constructor(
    public returncode: [string],
    public meetings?: [Placeholder],
    public message?: [string],
    public messageKey?: [string]
  ) {
  }
}

export class Placeholder {
  constructor(public meeting: [Meeting]) {
  }
}

export class Meeting {
  constructor(
    public attendeePW: [string],
    public attendees: [string],
    public createDate: [string],
    public createTime: [string],
    public dialNumber: [string],
    public duration: [number],
    public endTime: [number],
    public hasBeenForciblyEnded: [boolean],
    public hasUserJoined: [boolean],
    public internalMeetingID: [string],
    public isBreakout: [boolean],
    public listenerCount: [number],
    public maxUsers: [number],
    public meetingID: [number],
    public meetingName: [string],
    public metadata: [any],
    public moderatorCount: [number],
    public moderatorPW: [string],
    public participantCount: [number],
    public recording: [boolean],
    public running: [boolean],
    public startTime: [number],
    public videoCount: [number],
    public voiceBridge: [number],
    public voiceParticipantCount: [number]
  ) {
  }
}

export class MeetingRoomInfo {
  constructor(
    public attendeeUrl: string,
    public attendeePW: string,
    public moderatorUrl: string,
    public moderatorPW: string,
    public meetingEndUrl: string,
    public result: MeetingRoomInfoResult,
  ) {
  }
}

export class MeetingRoomInfoResult {
  constructor(
    public returncode: string,
    public meetingId: number,
    public internalMeetingID: string,
    public parentMeetingId: string,
    public attendeePW: string,
    public moderatorPW: string,
    public createTime: number,
    public voiceBridge: number,
    public dialNumber: string,
    public createDate: string,
    public hasUserJoined: boolean,
    public duration: number,
    public hasBeenForciblyEnded: boolean,
    public messageKey: string,
    public message: string
  ) {
  }

}

export class MeetingConfiguration {
  constructor(
    public name: string,
    public meetingId: number,
    public meetingConfigurationOptions?: MeetingConfigurationOptions
  ) {
  }
}

export class MeetingConfigurationOptions {
  constructor(
    public attendeePW?: string,
    public moderatorPW?: string,
    public welcome?: string,
    public dialNumber?: string,
    public voiceBridge?: string,
    public maxParticipants?: number,
    public logoutURL?: string,
    public record?: boolean,
    public duration?: number,
    // Todo: add rest of options
  ) {
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private getMeetingsUrl = '/bbbbridge/api/v1/bbb/monitoring/get_meetings';
  private createMeetingUrl = '/bbbbridge/api/v1/bbb/administration/create';

  private readonly handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MeetingsService');
  }

  getMeetings(): Observable<any> {
    return this.http.get<Meetings>(this.getMeetingsUrl).pipe(
      catchError(this.handleError('getMeetings', []))
    );
  }

  createMeeting(meetingConfiguration: MeetingConfiguration): Observable<any> {

    const modifiedObj = Object.assign({
      moderator: 'Sensei',
      attendee: 'Student',
    }, meetingConfiguration);

    const queryString = this.createParams(modifiedObj);

    console.log(queryString);

    const params = new HttpParams({
      fromString: queryString
    });

    return this.http.post<MeetingRoomInfo>(this.createMeetingUrl, params, httpOptions).pipe(
      catchError(this.handleError('createMeeting', []))
    );
  }

  createParams(params): string {
    const result = [];

    if (Object.keys(params).length > 0) {

      for (const key in params) {
        if (!params.hasOwnProperty(key)) {
          continue;
        }

        const keyValue = params[key];

        if (keyValue === null) {
          continue;
        }

        switch (keyValue.constructor.name) {
          case 'Array':
            if (keyValue.length > 0) {
              const joinedValue = keyValue.join(',');
              result.push(`${encodeURIComponent(key)}=${encodeURIComponent(joinedValue)}`);
            }
            break;
          case 'Object':
            (Object as any).entries(keyValue).map(([k, v]: [string, any]) => {
              if (v) {
                result.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
              }
            });
            break;
          default:
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(keyValue)}`);
        }
      }

      return result.join('&');
    } else {
      return result.join('');
    }
  }
}

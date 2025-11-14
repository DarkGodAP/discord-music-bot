import play from 'play-dl';
import { Readable } from 'stream';

export interface TrackData {
  title: string;
  url: string;
  duration: number;
  thumbnail?: string;
  requestedBy: string;
  platform: 'youtube' | 'spotify';
}

export class Track {
  public title: string;
  public url: string;
  public duration: number;
  public thumbnail?: string;
  public requestedBy: string;
  public platform: 'youtube' | 'spotify';

  constructor(data: TrackData) {
    this.title = data.title;
    this.url = data.url;
    this.duration = data.duration;
    this.thumbnail = data.thumbnail;
    this.requestedBy = data.requestedBy;
    this.platform = data.platform;
  }

  async createStream(): Promise<Readable> {
    const stream = await play.stream(this.url);
    return stream.stream;
  }

  getFormattedDuration(): string {
    const hours = Math.floor(this.duration / 3600);
    const minutes = Math.floor((this.duration % 3600) / 60);
    const seconds = this.duration % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

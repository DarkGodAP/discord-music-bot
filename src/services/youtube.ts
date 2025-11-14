import play from 'play-dl';
import { Track, TrackData } from '../music/track.js';

export class YouTubeService {
  static async search(query: string, requestedBy: string): Promise<Track | null> {
    try {
      await play.setToken({
        youtube: {
          cookie: process.env.YOUTUBE_COOKIE || ''
        }
      });

      const isURL = play.yt_validate(query) === 'video';
      
      let videoInfo;
      
      if (isURL) {
        videoInfo = await play.video_info(query);
      } else {
        const searchResults = await play.search(query, { limit: 1, source: { youtube: 'video' } });
        
        if (searchResults.length === 0) {
          return null;
        }
        
        videoInfo = await play.video_info(searchResults[0].url);
      }

      const trackData: TrackData = {
        title: videoInfo.video_details.title || 'Unknown Title',
        url: videoInfo.video_details.url,
        duration: videoInfo.video_details.durationInSec,
        thumbnail: videoInfo.video_details.thumbnails[0]?.url,
        requestedBy,
        platform: 'youtube'
      };

      return new Track(trackData);
    } catch (error) {
      console.error('❌ YouTube search error:', error);
      return null;
    }
  }
}

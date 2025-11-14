import SpotifyWebApi from 'spotify-web-api-node';
import play from 'play-dl';
import { Track, TrackData } from '../music/track.js';

export class SpotifyService {
  private static spotifyApi: SpotifyWebApi | null = null;

  static async initialize() {
    if (this.spotifyApi) return;

    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    try {
      const data = await this.spotifyApi.clientCredentialsGrant();
      this.spotifyApi.setAccessToken(data.body.access_token);
      
      setTimeout(() => {
        this.spotifyApi = null;
      }, data.body.expires_in * 1000);
      
      console.log('✅ Spotify API initialized');
    } catch (error) {
      console.error('❌ Spotify initialization error:', error);
    }
  }

  static async searchTrack(query: string, requestedBy: string): Promise<Track | null> {
    try {
      await this.initialize();
      
      if (!this.spotifyApi) {
        console.error('❌ Spotify API not initialized');
        return null;
      }

      const isSpotifyURL = query.includes('spotify.com/track/');
      let trackId: string;

      if (isSpotifyURL) {
        const match = query.match(/track\/([a-zA-Z0-9]+)/);
        if (!match) return null;
        trackId = match[1];
      } else {
        const searchResult = await this.spotifyApi.searchTracks(query, { limit: 1 });
        
        if (searchResult.body.tracks?.items.length === 0) {
          return null;
        }
        
        trackId = searchResult.body.tracks!.items[0].id;
      }

      const trackInfo = await this.spotifyApi.getTrack(trackId);
      const track = trackInfo.body;

      const artistNames = track.artists.map((artist: any) => artist.name).join(', ');
      const searchQuery = `${track.name} ${artistNames}`;
      
      const youtubeResults = await play.search(searchQuery, { limit: 1, source: { youtube: 'video' } });
      
      if (youtubeResults.length === 0) {
        return null;
      }

      const videoInfo = await play.video_info(youtubeResults[0].url);

      const trackData: TrackData = {
        title: `${track.name} - ${artistNames}`,
        url: videoInfo.video_details.url,
        duration: Math.floor(track.duration_ms / 1000),
        thumbnail: track.album.images[0]?.url,
        requestedBy,
        platform: 'spotify'
      };

      return new Track(trackData);
    } catch (error) {
      console.error('❌ Spotify search error:', error);
      return null;
    }
  }
}

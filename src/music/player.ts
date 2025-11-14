import { 
  AudioPlayer, 
  AudioPlayerStatus, 
  createAudioPlayer, 
  createAudioResource, 
  VoiceConnection,
  VoiceConnectionStatus,
  entersState,
  AudioResource
} from '@discordjs/voice';
import { Track } from './track.js';

export class MusicPlayer {
  public queue: Track[] = [];
  public currentTrack: Track | null = null;
  public audioPlayer: AudioPlayer;
  public voiceConnection: VoiceConnection;
  public volume: number = 0.5;
  private isPlaying: boolean = false;

  constructor(voiceConnection: VoiceConnection) {
    this.voiceConnection = voiceConnection;
    this.audioPlayer = createAudioPlayer();
    
    this.voiceConnection.subscribe(this.audioPlayer);
    
    this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
      this.isPlaying = false;
      this.currentTrack = null;
      this.playNext();
    });
    
    this.audioPlayer.on(AudioPlayerStatus.Playing, () => {
      this.isPlaying = true;
    });
    
    this.audioPlayer.on('error', (error) => {
      console.error('❌ Audio player error:', error);
      this.playNext();
    });
  }

  async addTrack(track: Track) {
    this.queue.push(track);
    
    if (!this.isPlaying && !this.currentTrack) {
      await this.playNext();
    }
  }

  async playNext() {
    if (this.queue.length === 0) {
      this.currentTrack = null;
      return;
    }
    
    const track = this.queue.shift()!;
    this.currentTrack = track;
    
    try {
      const stream = await track.createStream();
      const resource = createAudioResource(stream, {
        inlineVolume: true
      });
      
      resource.volume?.setVolume(this.volume);
      
      this.audioPlayer.play(resource);
    } catch (error) {
      console.error('❌ Error playing track:', error);
      this.playNext();
    }
  }

  pause() {
    if (this.audioPlayer.state.status === AudioPlayerStatus.Playing) {
      this.audioPlayer.pause();
      return true;
    }
    return false;
  }

  resume() {
    if (this.audioPlayer.state.status === AudioPlayerStatus.Paused) {
      this.audioPlayer.unpause();
      return true;
    }
    return false;
  }

  skip() {
    if (this.currentTrack) {
      this.audioPlayer.stop();
      return true;
    }
    return false;
  }

  stop() {
    this.queue = [];
    this.currentTrack = null;
    this.audioPlayer.stop();
    
    if (this.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) {
      this.voiceConnection.destroy();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.audioPlayer.state.status === AudioPlayerStatus.Playing) {
      const resource = this.audioPlayer.state.resource as AudioResource;
      if (resource.volume) {
        resource.volume.setVolume(this.volume);
      }
    }
  }
}

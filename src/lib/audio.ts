/**
 * src/lib/audio.ts
 *
 * Retro 8-bit audio synthesizer using the Web Audio API.
 * Provides a lightweight, dependency-free way to trigger UI sound effects.
 */

class RetroAudio {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private initialized: boolean = false;

  public init() {
    if (this.initialized || typeof window === "undefined") return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
    this.initialized = true;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled() {
    return this.enabled;
  }

  private playTone(frequency: number, type: OscillatorType, duration: number, slideFreq?: number) {
    if (!this.enabled || !this.ctx) return;
    
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    
    // Envelope (volume starts low to prevent blasting ears, fades out quickly)
    gain.gain.setValueAtTime(0.05, now); 
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.frequency.setValueAtTime(frequency, now);
    if (slideFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideFreq, now + duration);
    }

    osc.start(now);
    osc.stop(now + duration);
  }

  public playHover = () => {
    this.playTone(400, "square", 0.05);
  };

  public playClick = () => {
    this.playTone(880, "square", 0.1, 1200);
  };

  public playSuccess = () => {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    
    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Quick arpeggio
    playNote(440, now, 0.1);
    playNote(554.37, now + 0.1, 0.1);
    playNote(659.25, now + 0.2, 0.2);
  };

  public playError = () => {
    this.playTone(150, "sawtooth", 0.3, 80);
  };
}

export const retroAudio = new RetroAudio();

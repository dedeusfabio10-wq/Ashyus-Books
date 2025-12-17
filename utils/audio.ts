
// Um simples engine de áudio usando Web Audio API para evitar arquivos externos
// Gera sons "dark fantasy" sinteticamente

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
};

export const playEntranceSound = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Configuração para um som grave e profundo (Drone/Impacto)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1); // Fade in rápido
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3); // Fade out longo

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3);
        
    } catch (e) {
        console.error("Erro ao tocar som:", e);
    }
};

export const playPageTurnSound = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
        const channelData = noiseBuffer.getChannelData(0);

        // White noise generation para simular papel/vento
        for (let i = 0; i < noiseBuffer.length; i++) {
            channelData[i] = Math.random() * 2 - 1;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.Q.value = 1;

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        noiseSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noiseSource.start();
    } catch (e) {
        // Silently fail if context not ready
    }
};

export const playRobotSound = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Som "Chirp" ou "Bloop" metálico
        osc.type = 'square'; // Onda quadrada para som 8-bit/mecânico
        
        // Frequência modulada rápida
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2);

        // Envelope curto
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
        // Ignora erros de áudio
    }
};

// --- NOVOS SONS DO DRAGÃO ---

export const playDragonRoar = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') { ctx.resume(); }

        const t = ctx.currentTime;
        const duration = 2.0;

        // 1. Ruído de Fundo (O "Sopro" do rugido)
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(800, t);
        noiseFilter.frequency.linearRampToValueAtTime(200, t + duration); // O rugido fica mais grave
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, t);
        noiseGain.gain.linearRampToValueAtTime(0.5, t + 0.2); // Ataque rápido
        noiseGain.gain.exponentialRampToValueAtTime(0.01, t + duration); // Decay

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(t);

        // 2. Oscilador de Baixa Frequência (O "Rosnado" grave)
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth'; // Onda dente de serra para agressividade
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + duration); // Pitch drop

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0, t);
        oscGain.gain.linearRampToValueAtTime(0.4, t + 0.3);
        oscGain.gain.exponentialRampToValueAtTime(0.01, t + duration);

        // Distorção leve para ficar mais "monstruoso"
        const distortion = ctx.createWaveShaper();
        const curve = new Float32Array(44100);
        for (let i =0; i < 44100; i++) {
            const x = (i * 2) / 44100 - 1;
            curve[i] = ((3 + 20) * x * 20 * (Math.PI / 180)) / (Math.PI + 20 * Math.abs(x));
        }
        distortion.curve = curve;
        distortion.oversample = '4x';

        osc.connect(distortion);
        distortion.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(t);

    } catch(e) { console.error("Erro no som do dragão:", e); }
};

export const playFireSound = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') { ctx.resume(); }

        const t = ctx.currentTime;
        const duration = 3.0;

        // Ruído Rosa/Branco para fogo
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Filtro Bandpass variável para simular as chamas tremulando
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 1;
        filter.frequency.setValueAtTime(400, t);
        // Modulação da frequência para o som de "whoosh" das chamas
        filter.frequency.linearRampToValueAtTime(800, t + 0.5);
        filter.frequency.linearRampToValueAtTime(300, t + 1.5);
        filter.frequency.linearRampToValueAtTime(600, t + 2.5);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.2);
        gain.gain.linearRampToValueAtTime(0.3, t + 2.5);
        gain.gain.linearRampToValueAtTime(0, t + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);

    } catch(e) { console.error("Erro no som de fogo:", e); }
};
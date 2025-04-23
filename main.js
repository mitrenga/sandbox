//const { StartScreen } = await import('./startScreen.js?ver='+window.srcVersion);
//const { GameCanvas } = await import('./gameCanvas.js?ver='+window.srcVersion);
//const { Music } = await import('./music/music.js?ver='+window.srcVersion);

import StartScreen from './startScreen.js';
import GameCanvas from './gameCanvas.js';

var startScreen = new StartScreen();
var gameCanvas = new GameCanvas(window.wsURL);

var startGameAnimationTimestamp = 0;
var audio = null;

window.addEventListener('resize', redraw);
redraw();
startScreen.startButton.addEventListener('click', function(){startGame()});
openWebSocket();

function openWebSocket() {
  gameCanvas.webSocket = new WebSocket(gameCanvas.wsURL);

  gameCanvas.webSocket.onopen = function() {
    console.log('Online: ' + navigator.onLine);
    console.log("WebSocket client '"+gameCanvas.wsURL+"' connected");
  } // webSocket.onopen
  
  gameCanvas.webSocket.onmessage = function(e) {
    const dataJSON = JSON.parse(e.data);
    if (dataJSON.hasOwnProperty('objects')) {
      const objectsArray = dataJSON['objects'];
      Object.keys(objectsArray).forEach(key => {
        const object = objectsArray[key];
        if (object['class'] == 'Willy') {
          gameCanvas.posX = object['posX'];
          gameCanvas.step = object['step'];
          gameCanvas.direction = object['direction'];
        }
      });
      redraw();
    }
  } // webSocket.onmessage
  
  gameCanvas.webSocket.onclose = function(e) {
    console.log("WebSocket client '"+gameCanvas.wsURL+"' disconnected: " + e.code);
    gameCanvas.webSocket = null;
    setTimeout(openWebSocket, 5000);
  } // webSocket.onclose
} openWebSocket

function redraw() {
  const elementRoot = document.documentElement;
  if (window.innerHeight != gameCanvas.elementObj.height) {
    elementRoot.style.setProperty('--app-height', window.innerHeight+'px');
  }
  gameCanvas.draw();
} // redraw

function startGame() {
  gameCanvas.elementObj.style.visibility = 'visible';
  gameCanvas.elementObj.style.backgroundColor = '#000000';
  startGameAnimationTimestamp = Date.now();
  startScreen.elementObj.style.visibility = 'hidden';
  //loopGame();
  startGameAnimation();
  playSong ();
  //audio = new Audio("audio/in-game.mp3");
  //audio.loop = true;
  //audio.play();
} // startGame

function housle() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.frequency.value = 526;
  // Definování více harmonických složek pro přiblížení se zvuku houslí
  const real = new Float32Array([0, 1, 0.9, 0.7, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1, 0.05, -0.05, 0]);
  const imag = new Float32Array(real.length);  // Žádný fázový posun pro čistší tón
  
  // Vytvoření vlastní periodické vlny
  const wave = audioContext.createPeriodicWave(real, imag);
  oscillator.setPeriodicWave(wave);
  
  // Vibrato efekt pomocí jemné modulace frekvence
  function applyVibrato(oscillator) {
      const vibrato = audioContext.createOscillator(); // Oscilátor pro vibrato
      const vibratoGain = audioContext.createGain();   // Zesílení pro řízení intenzity vibrata
  
      vibrato.frequency.setValueAtTime(5, audioContext.currentTime); // Frekvence vibrata (5 Hz)
      vibratoGain.gain.setValueAtTime(5, audioContext.currentTime);  // Amplituda vibrata (5 Hz modulace)
  
      vibrato.connect(vibratoGain).connect(oscillator.frequency);    // Připojení vibrata na frekvenci hlavního oscilátoru
      vibrato.start();
  }
  
  // Nastavení obálky pro zesílení (attack, sustain, release)
  function applyEnvelope(gainNode) {
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);             // Začíná na tichu
      gainNode.gain.linearRampToValueAtTime(1, now + 0.1); // Rychlý nástup (attack)
      gainNode.gain.linearRampToValueAtTime(0.8, now + 0.2); // Udržení hlasitosti (sustain)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1); // Pomalý dozvuk (release)
  }
  
  // Propojení oscilátoru a gainNode, pak na výstup
  oscillator.connect(gainNode).connect(audioContext.destination);
  applyVibrato(oscillator);    // Aplikace vibrata
  applyEnvelope(gainNode);     // Aplikace obálky
  
  // Spuštění a zastavení oscilátoru
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1); // Zastaví po 3 sekundách
}

var audioCtx = null;
var bufferMusic = null;
var musicPos = 0;
var musicTimer;

const tonesMap = [ // 'tone': frequency
  { // octave 0
    'c': 16.351, 'c#': 17.324, 'db': 17.324, 'd': 18.354, 'd#': 19.445, 'eb': 19.445, 'e': 20.601, 'f': 21.827, 'f#': 23.124, 'gb': 23.124, 'g': 24.499, 'g#': 25.956, 'ab': 25.956, 'a': 27.500, 'a#': 29.135, 'hb': 29.135, 'h': 30.868
  },
  { // octave 1
    'c': 32.703, 'c#': 34.648, 'db': 34.648, 'd': 36.708, 'd#': 38.891, 'eb': 38.891, 'e': 41.203, 'f': 43.654, 'f#': 46.249, 'gb': 46.249, 'g': 48.999, 'g#': 51.913, 'ab': 51.913, 'a': 55.000, 'a#': 58.270, 'hb': 58.270, 'h': 61.735
  },
  { // octave 2
    'c': 65.406, 'c#': 69.296, 'db': 69.296, 'd': 73.416, 'd#': 77.782, 'eb': 77.782, 'e': 82.407, 'f': 87.307, 'f#': 92.499, 'gb': 92.499, 'g': 97.999, 'g#': 103.826, 'ab': 103.826, 'a': 110.000, 'a#': 116.541, 'hb': 116.541, 'h': 123.471
  },
  { // octave 3
    'c': 130.813, 'c#': 138.591, 'db': 138.591, 'd': 146.832, 'd#': 155.563, 'eb': 155.563, 'e': 164.814, 'f': 174.614, 'f#': 184.997, 'gb': 184.997, 'g': 195.998, 'g#': 207.652, 'ab': 207.652, 'a': 220.000, 'a#': 233.082, 'hb': 233.082, 'h': 246.942
  },
  { // octave 4
    'c': 261.626, 'c#': 277.183, 'db': 277.183, 'd': 293.665, 'd#': 311.127, 'eb': 311.127, 'e': 329.628, 'f': 349.228, 'f#': 369.994, 'gb': 369.994, 'g': 391.995, 'g#': 415.305, 'ab': 415.305, 'a': 440.000, 'a#': 466.164, 'hb': 466.164, 'h': 493.883
  },
  { // octave 5
    'c': 523.251, 'c#': 554.365, 'db': 554.365, 'd': 587.330, 'd#': 622.254, 'eb': 622.254, 'e': 659.255, 'f': 698.456, 'f#': 739.989, 'gb': 739.989, 'g': 783.991, 'g#': 830.609, 'ab': 830.609, 'a': 880.000, 'a#': 932.328, 'hb': 932.328, 'h': 987.767
  },
  { // octave 6
    'c': 1046.502, 'c#': 1108.731, 'db': 1108.731, 'd': 1174.659, 'd#': 1244.508, 'eb': 1244.508, 'e': 1318.510, 'f': 1396.913, 'f#': 1479.978, 'gb': 1479.978, 'g': 1567.982, 'g#': 1661.219, 'ab': 1661.219, 'a': 1760.000, 'a#': 1864.655, 'hb': 1864.655, 'h': 1975.533
  },
  { // octave 7
    'c': 2093.005, 'c#': 2217.461, 'db': 2217.461, 'd': 2349.318, 'd#': 2489.016, 'eb': 2489.016, 'e': 2637.021, 'f': 2793.826, 'f#': 2959.955, 'gb': 2959.955, 'g': 3135.964, 'g#': 3322.438, 'ab': 3322.438, 'a': 3520.000, 'a#': 3729.310, 'hb': 3729.310, 'h': 3951.066
  },
  { // octave 8
    'c': 4186.009, 'c#': 4434.922, 'db': 4434.922, 'd': 4698.636, 'd#': 4978.032, 'eb': 4978.032, 'e': 5274.042, 'f': 5587.652, 'f#': 5919.910, 'gb': 5919.910, 'g': 6271.928, 'g#': 6644.876, 'ab': 6644.876, 'a': 7040.000, 'a#': 7458.620, 'hb': 7458.620, 'h': 7902.132
  },
  { // octave 9
    'c': 8372.018, 'c#': 8869.844, 'db': 8869.844, 'd': 9397.272, 'd#': 9956.064, 'eb': 9956.064, 'e': 10548.084, 'f': 11175.304, 'f#': 11839.820, 'gb': 11839.820, 'g': 12543.856, 'g#': 13289.752, 'ab': 13289.752, 'a': 14080.000, 'a#': 14917.240, 'hb': 14917.240, 'h': 15804.264
  }
] // tonesMap

const chords = { // 'chord': ['tone', ...]
  '_': [],
  'C': ['c0', 'e0', 'g0'],
  'G': ['g0', 'h0', 'd0'],

  'c0': ['c0'], 'd0': ['d0'], 'e0': ['e0'], 'f0': ['f0'], 'g0': ['g0'], 'a0': ['a0'], 'h0': ['h0'],
  'c1': ['c1'], 'd1': ['d1'], 'e1': ['e1'], 'f1': ['f1'], 'g1': ['g1'], 'a1': ['a1'], 'h1': ['h1'],
  'f0f1': ['f0', 'f1'], 'a0a1': ['a0', 'a1'],
  'g1c2': ['g1', 'c2'], 'c2e2': ['c2', 'e2'],
  'g1#a1#': ['g1#', 'a1#'],
};

const dataManicMinerGame = {
  'durationOfBeats': 320,
  'tonesOctave': 3,
  'chordsOctave': 2,
  'gap': 0,
  'tones': [ // 'tone', beat length
    '_', 2,
    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 2,
    'd1#', 1, 'h0', 1, 'd1#', 2, 'd1', 1, 'h0b', 1, 'd1', 2,
    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 1,
    'g1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 4,

    'e1', 1, 'f1#', 1, 'g1#', 1, 'a1', 1, 'h1', 1, 'g1', 1, 'h1', 2,
    'c2', 1, 'g1#', 1, 'c2', 2, 'h1', 1, 'g1', 1, 'h1', 2,
    'e1', 1, 'f1#', 1, 'g1#', 1, 'a1', 1, 'h1', 1, 'g1', 1, 'h1', 2,
    'c2', 1, 'g1#', 1, 'c2', 2, 'h1', 4,

    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 2,
    'd1#', 1, 'h0', 1, 'd1#', 2, 'd1', 1, 'h0b', 1, 'd1', 2,
    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 1,
    'g1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 4,

    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 2,
    'd1#', 1, 'h0', 1, 'd1#', 2, 'd1', 1, 'h0b', 1, 'd1', 2,
    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 1,
    'e1', 1, 'c1', 1, 'e1', 1, 'a1', 1, 'a0', 4,

    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 2,
    'd1#', 1, 'h0', 1, 'd1#', 2, 'd1', 1, 'h0b', 1, 'd1', 2,
    'a0', 1, 'h0', 1, 'c1', 1, 'd1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 1,
    'g1', 1, 'e1', 1, 'c1', 1, 'e1', 1, 'g1', 4,    
],
  'chords': [ // 'chord', beat length
    '_', 2,
    'f0', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'f1', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'f0', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'a0', 2, 'e1', 2, 'a1', 2, 'e1', 2,

    'c1', 2, 'g1', 2, 'c1', 2, 'g1', 2,
    'a0', 2, 'a1', 2, 'c1', 2, 'g1', 2,
    'c1', 2, 'g1', 2, 'c1', 2, 'g1', 2,
    'a0', 2, 'a1', 2, 'c1', 2, 'g1', 2,

    'f0f1', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'f1', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'f0f1', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'a0a1', 2, 'e1', 2, 'a1', 2, 'e1', 2,
    
    'f0f1', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'f1', 2, 'c1', 2, 'f1', 2, 'c1', 2,
    'f0f1', 2, 'f1', 2, 'e1', 2, 'd1', 2,
    'c1', 2, 'h0', 2, 'a0', 2, 'g0', 2,

    'f0f1', 2, 'g1c2', 2, 'f1', 2, 'g1c2', 2,
    'f1', 2, 'g1#a1#', 2, 'f1', 2, 'g1#a1#', 2,
    'f0f1', 2, 'g1c2', 2, 'f1', 2, 'g1c2', 2,
    'a0a1', 2, 'c2e2', 2, 'a1', 2, 'c2e2', 2,
  ]
}; // dataManicMinerGame

const dataOvcaciCtveraci = {
  'durationOfBeats': 400,
  'tonesOctave': 3,
  'chordsOctave': 2,
  'gap': 0,
  'tones': [ // 'tone', beat length
    '_', 1,
    'c1', 2, 'e1', 2, 'g1', 1, 'f1', 1, 'e1', 1, 'd1', 1,
    'c1', 2, 'e1', 2, 'g1', 1, 'f1', 1, 'e1', 1, 'd1', 1,
    'e1', 1, 'e1', 1, 'd1', 1, 'e1', 1, 'f1', 2, 'd1', 2,
    'e1', 1, 'e1', 1, 'd1', 1, 'e1', 1, 'f1', 2, 'd1', 2,
    'e1', 2, 'd1', 2, 'c1', 4
    
  ],
  'chords': [ // 'chord', beat length
    '_', 1,
    'C', 4, 'G', 4, 'C', 4, 'G', 4, 'C', 4, 'G', 4, 'C', 4, 'G', 4, 'C', 2, 'G', 2, 'C', 4
  ]
}; // dataOvcaciCtveraci

function makeBuffer(data) {
  var buffer = [];
  var startBeat = 0;
  var i = 0;
  while (i < data['tones'].length-1) {
    var arrayTones = [];
    var toneLength;
    arrayTones.push ({'tone': data['tones'][i], 'length': data['tones'][i+1], 'octave': data['tonesOctave']});
    buffer[startBeat] = arrayTones;
    startBeat += data['tones'][i+1];
    i = i+2;
  }
  startBeat = 0;
  var y = 0;
  while (y < data['chords'].length-1) {
    var z = 0;
    while (z < chords[data['chords'][y]].length) {
      if (buffer[startBeat]) {
        buffer[startBeat].push({'tone': chords[data['chords'][y]][z], 'length': data['chords'][y+1], 'octave': data['chordsOctave']});
      } else {
        var arrayTones = [];
        arrayTones.push ({'tone': chords[data['chords'][y]][z], 'length': data['chords'][y+1], 'octave': data['chordsOctave']});
        buffer[startBeat] = arrayTones;
      }
      z = z+2;
    }
    startBeat += data['chords'][y+1];
    y = y+2;
  }
  buffer['durationOfBeats'] = data['durationOfBeats'];
  buffer['gap'] = data['gap'];
  return buffer;
} // makeBuffer

function playMusic() {
  if (bufferMusic.hasOwnProperty(musicPos)) {

    bufferMusic[musicPos].forEach(playTone);

    
    function playTone(toneData) {
      var toneFrequency = 0;
      if (toneData['tone'] != '_') {
        if (typeof (toneData['tone']) == 'number') {
          toneFrequency = toneData['tone'];
        } else {
          var tone = toneData['tone'][0];
          if (toneData['tone'].length > 2) {
            tone = tone+toneData['tone'][2];
          }
          var octave = toneData['octave']+parseInt(toneData['tone'][1]);
          toneFrequency = tonesMap[octave][tone];
        }
      }
      const toneLength = toneData['length']*bufferMusic['durationOfBeats']*(1-bufferMusic['gap']); // miliseconds
      
      if (toneFrequency != 0) {
        var gainNode = audioCtx.createGain();
        var oscillator = audioCtx.createOscillator();

        oscillator.frequency.value = toneFrequency; // 40..6000

        /**
        oscillator.type = 'sawtooth'; //sine, square, triangle, sawtooth
        /*/
        //const real = new Float32Array([0, 1, -1, 0.5, -0.5, 0.25, -0.25, 0.12, -0.12, 0.06, -0.06, 0.03, -0.03, 0, 0]); // piano 1
        const real = new Float32Array([0, 1, -1, 0.5, -0.5, 0.7, -0.7, 0.25, -0.25, 0.12, -0.12, 0.06, -0.06, 0.03, -0.03, 0]); // piano 2 B.E.S.T !!!
        //const real = new Float32Array([0, 0.7, 0.05, 1.0, 0.5, 0.6, 0, -0.6, -0.5, -1.0, -0.05, -0.7, 0]);
        //const real = new Float32Array([0, 1, 0.8, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1]); // housle
        //const real = new Float32Array([0, 1, 0.7, 0.5, 0.3, 0.2, 0.15, 0.1, 0.07, 0.05, 0.03]);
        const imag = new Float32Array(real.length);

        const customWave = audioCtx.createPeriodicWave (real, imag);   
        oscillator.setPeriodicWave (customWave);
        /**/

        const now = audioCtx.currentTime;

        function applyChorus(oscillator) {
          const detuneOsc = audioCtx.createOscillator();
          const detuneGain = audioCtx.createGain();
      
          detuneOsc.frequency.setValueAtTime(0.1, now); // Frekvence rozladění (0.1 Hz)
          detuneGain.gain.setValueAtTime(10, now);      // Amplituda rozladění v centech (10 centů)
          
          detuneOsc.connect(detuneGain).connect(oscillator.detune);          // Připojení k detune parametru oscilátoru
          detuneOsc.start();
        }
        
        // Dynamická obálka pro přirozený dozvuk klavíru
        function applyEnvelope(gainNode) {
            const volume = 0.3;
            gainNode.gain.setValueAtTime(0*volume, now);                    // Start na tichu
            gainNode.gain.linearRampToValueAtTime(1*volume, now + 0.01);    // Rychlý attack (začátek tónu)
            var diffLength = 0.0;
            if (toneLength/1000 > 1.2) {
              diffLength = toneLength/1000-0.6;
            }
            gainNode.gain.exponentialRampToValueAtTime(0.8*volume, now + 0.2 + diffLength); // Rychlý decay pro přirozený útlum
            gainNode.gain.exponentialRampToValueAtTime(0.01*volume, now + 1.2 + diffLength);  // Pomalý release pro dozvuk
        }
              
        /*
        const volume = 0.09;
        gainNode.gain.setValueAtTime(1*volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001*volume, now+1.2);
        /*/
        applyChorus(oscillator);  // Aplikace chorus efektu
        applyEnvelope(gainNode);   // Aplikace dynamické obálky
        /**/
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
      }

      setTimeout(
        function() {
          if (toneFrequency != 0) {
            oscillator.stop();
            oscillator.disconnect(gainNode);
            gainNode.disconnect(audioCtx.destination);
          }
        },
        toneData['length']*bufferMusic['durationOfBeats'] // toneLength
      );
    } // playTone
  } // if (bufferMusic.hasOwnProperty(musicPos))

  setTimeout(
    function() {
      musicPos += 1;
      if (musicPos < bufferMusic.length) {
        playSong();
      }
      else {
      }
    },
    bufferMusic['durationOfBeats']
  );
}

function startGameAnimation() {
  const nowTimestamp = Date.now();
  if (startGameAnimationTimestamp+600 > nowTimestamp) {
    requestAnimationFrame(startGameAnimation);
    const rgbIngredient = Math.round((nowTimestamp-startGameAnimationTimestamp)/600*0x66);
    const animateColor = 'rgb('+rgbIngredient+','+rgbIngredient+','+rgbIngredient+')';
    gameCanvas.elementObj.style.backgroundColor = animateColor;
    document.getElementsByTagName('meta')['theme-color'].content = animateColor;
}
  else {
    gameCanvas.elementObj.style.backgroundColor = '#666666';
    loopGame();
  }
} // startGameAnimation


function loopGame() {
  requestAnimationFrame(loopGame);
  gameCanvas.loopGame();
  redraw();
} // loopGame

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight' : gameCanvas.webSocket.send ('R'); break;
    case 'ArrowLeft'  : gameCanvas.webSocket.send ('L'); break;
  }
}); // document.addEventListener('keydown', (event)

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowRight' : gameCanvas.webSocket.send ('r'); break;
    case 'ArrowLeft'  : gameCanvas.webSocket.send ('l'); break;
  }
}); // document.addEventListener('keyup', (event)

function doMouseDown(event) {
/*  if (audio.paused)
    audio.play();
  else
    audio.pause();*/
  var audioCrash = new Audio('audio/crash.wav');
  audioCrash.play();
  gameCanvas.webSocket.send ('R');
} // doMouseDown

function doMouseUp(event) {
  gameCanvas.webSocket.send ('r');
} // doMouseUp

gameCanvas.elementObj.addEventListener('mousedown', doMouseDown, false);
gameCanvas.elementObj.addEventListener('touchstart', doMouseDown, false);
gameCanvas.elementObj.addEventListener('mouseup', doMouseUp, false);
gameCanvas.elementObj.addEventListener('touchend', doMouseUp, false);
gameCanvas.elementObj.addEventListener('mouseout', doMouseUp, false);

gameCanvas.elementObj.oncontextmenu = function (e) {
  e.preventDefault();
}; // disable right click popup menu

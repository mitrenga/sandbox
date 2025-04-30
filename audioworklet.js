class AudioHandler {

  constructor(processor) {
    this.processor = processor
  } // constructor

  async start() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext({latencyHint: 'interactive', sampleRate:44100});
    await this.audioContext.audioWorklet.addModule(this.processor+'-noise-processor.js').catch(error => {console.log(error)});
    this.randomNoiseNode = new AudioWorkletNode(this.audioContext, this.processor+'-noise-processor');
    this.randomNoiseNode.connect(this.audioContext.destination);
  } // start

  stop() {
    this.audioContext.close();
  }
} // AudioHandler

var audioHandler = {};

function press(processor, action) {
  document.getElementById('log').innerHTML = processor+': '+action;

  switch (action) {
    case 'play':
      if (!(processor in audioHandler)) {
        audioHandler[processor] = new AudioHandler(processor);
        audioHandler[processor].start();
      } else {
        audioHandler[processor].randomNoiseNode.port.postMessage('continue');
      }
      break;
    case 'stop':
      if ((processor in audioHandler)) {
        audioHandler[processor].stop();
        delete audioHandler[processor];
      }
      break;
    case 'pause':
      if ((processor in audioHandler)) {
        audioHandler[processor].randomNoiseNode.port.postMessage('pause');
      }
      break;
    }
  } // press

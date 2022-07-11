import { Gpio, Low } from 'onoff';
import { sleepSync } from './lib';

export class HCSR04 {
  private readonly triggerPin: Gpio;
  private readonly echoPin: Gpio;

  constructor(triggerPin: number, echoPin: number) {
    this.triggerPin = new Gpio(triggerPin, 'out');
    this.triggerPin.writeSync(0);
    this.echoPin = new Gpio(echoPin, 'in');
  }

  public distance(): number {
    this.triggerPin.writeSync(1);
    sleepSync(1);
    this.triggerPin.writeSync(0);

    let startTime = Date.now();
    let endTime = Date.now();

    while (this.echoPin.readSync() === 0) {
      startTime = Date.now();
    }

    while (this.echoPin.readSync() === 1) {
      endTime = Date.now();
    }

    const deltaTime = (endTime - startTime) / 1000.0;

    // multiply with the sonic speed (34300 cm/s)
    // and divide by 2, because there and back
    return (deltaTime * 34300) / 2;
  }
}

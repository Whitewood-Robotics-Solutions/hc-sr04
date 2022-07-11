import { hrtime } from 'process';
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
    sleepSync(1000);
    this.triggerPin.writeSync(0);

    let startTimeMs = hrtime.bigint();
    let endTimeMs = hrtime.bigint();

    while (this.echoPin.readSync() === 0) {
      startTimeMs = hrtime.bigint() * 1000000n;
    }

    while (this.echoPin.readSync() === 1) {
      endTimeMs = hrtime.bigint() * 1000000n;
    }

    const deltaTime = (endTimeMs - startTimeMs) / 1000n;

    // multiply with the sonic speed (34300 cm/s)
    // and divide by 2, because there and back
    return (Number(deltaTime) * 34300) / 2;
  }
}

# hc-sr04
Raspberry Pi Node.js library for hc-sr04

## Basic Usage
The following is a basic usage, using pin 27 for trigger, and pin 26 as echo.

```ts
import { HCSR04 } from './HCSR04';

export { HCSR04 } from './HCSR04';

// eslint-disable-next-line no-constant-condition
while (true) {
  const ultrasonic = new HCSR04(27, 26);
  console.log('Distance: ' + ultrasonic.distance());
}
```


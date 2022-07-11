import {HCSR04} from './HCSR04';

export { HCSR04 } from './HCSR04';

// eslint-disable-next-line no-constant-condition
while (true) {
  const ultrasonic = new HCSR04(27, 26);
  console.log('Distance: ' + ultrasonic.distance());
}

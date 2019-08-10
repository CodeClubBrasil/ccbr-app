import { FormControl, FormGroup } from '@angular/forms';
// import { isBefore } from 'date-fns';

export class TimeValidator {
  static endTimeIsLessThanStartTime(formGroup: FormGroup) {
    let val;
    let valid = true;
    // let timeBefore: any;
    // let startsAt: any;
    // let endsAt: any;


    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value;
        } else {
          // startsAt = val.value.hour + val.value.minutes;
          // endsAt = control.value.hour + control.value.minutes;
          // timeBefore = isBefore(endsAt, startsAt);
          // if (val.value.hour === control.value.hour) {
          //   valid = false;
          //   break;
          // }
          false;
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      endTimeIsLessThanStartTime: true,
    };
  }
}

import { FormControl, FormGroup } from '@angular/forms';
export class UseremailValidator {
    static validUseremail(fc: FormControl) {
        if (fc.value.toLowerCase() === 'test@test.com' || fc.value.toLowerCase() === 'test@test.com') {
            return ({ validUsername: true });
        } else {
            return (null);
        }
    }

    static areEqual(formGroup: FormGroup) {
        let val;
        let valid = true;

        for (const key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                const control: FormControl = <FormControl>formGroup.controls[key];
                if (val === undefined) {
                    val = control.value;
                } else {
                    if (val !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true,
        };
    }
}

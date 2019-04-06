import {
  PhoneNumberUtil
} from 'google-libphonenumber';

export class PhoneValidator {
  static validCountryPhone = (country: any, telephoneNumber: any) => {
    if (country !== '') {
      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const phoneNumber = telephoneNumber,
          region = country.iso,
          number = phoneUtil.parse(phoneNumber, region),
          isValidNumber = phoneUtil.isValidNumber(number);
        if (isValidNumber) {
          return true;
        }
      } catch (e) {
        return {
          validCountryPhone: false
        };
      }
    } else {
      return false;
    }
  }
}

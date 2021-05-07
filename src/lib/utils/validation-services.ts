import validateEmail from './validate-email';

class Validation {
  email(email: string): string {
    if (this.validation(email)) {
      return 'Required';
    } else if (!validateEmail(email)) {
      return 'Invalid address';
    }

    return '';
  }

  validation(value: string) {
    if (!value || !value.trim()) {
      return 'Required';
    }

    return '';
  }
}

export default new Validation();

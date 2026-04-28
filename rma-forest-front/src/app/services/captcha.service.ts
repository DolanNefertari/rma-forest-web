import { Injectable } from '@angular/core';

declare var grecaptcha: any;

@Injectable({ providedIn: 'root' })
export class CaptchaService {
  executeCaptcha(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute('6LeEIMIsAAAAAF7i2gyeKTn57QlXpk5nKynaGQFL', { action })
          .then((token: string) => resolve(token))
          .catch((error: any) => reject(error));
      });
    });
  }
}
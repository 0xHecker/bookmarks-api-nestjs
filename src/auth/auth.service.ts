import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'I have signed up!' };
  }

  login() {
    return { msg: 'I have signed in!' };
  }
}

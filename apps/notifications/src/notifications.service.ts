import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService){}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OATH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OATH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OATH_REFRESH_TOKEN'),
    },
  });

  notifyEmail({ email, text }: NotifyEmailDto) {
    this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleeper payments notification',
      text,
    });
  }
}

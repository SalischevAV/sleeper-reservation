import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    //TODO to avoid testing errors from Stripe side
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      //TODO to avoid testing errors from Stripe side
      // payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      //TODO to avoid testing errors from Stripe side
      // payment_method_types: ['card'],
      currency: 'usd',
      //TODO to avoid testing errors from Stripe side
      payment_method: 'pm_card_visa',
      //TODO to avoid testing errors from Stripe side
      return_url: 'https://example.com',
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment for Sleeper reservation of $${amount} has completed successfully`,
    });

    return paymentIntent;
  }

  async getPayments(){
    const payments = await this.stripe.paymentIntents.list();
    return payments.data;
  }
}

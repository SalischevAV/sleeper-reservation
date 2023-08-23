import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  async createCharge({ card, amount }: CreateChargeDto) {
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

    return paymentIntent;
  }
}

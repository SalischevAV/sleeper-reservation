import { CreateChargeDto } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';

@InputType()
export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  @Field(() => CreateChargeDto)
  charge: CreateChargeDto;
}

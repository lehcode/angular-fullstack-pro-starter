import { IsAlpha, IsAlphanumeric, IsLowercase, IsNotEmpty, Length, Matches } from 'class-validator';

export class VINDecodeParams {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Matches(/^[A-Z0-9]{17}$/)
  code: string;

  @IsAlpha()
  @Length(2)
  @IsLowercase()
  lc: string;

  year: number;
}

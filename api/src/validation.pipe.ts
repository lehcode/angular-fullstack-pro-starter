import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { isUndefined } from 'lodash';
import { plainToClass } from 'class-transformer';
import { isNumberString, validate } from 'class-validator';

export class PipeErrors {
  public static format(errors: any[]): string {
    return errors.map(error => {
      for (const key in error.constraints) {
        if (error.constraints.hasOwnProperty(key)) {
          return error.constraints[key];
        }
      }
    })
      .join(', ');
  }
}

@Injectable()
export class YearValidationPipe extends PipeErrors implements PipeTransform {
  /**
   * Check if value is not a year
   */
  private static isNotYear(value: string) {
    return !(isNumberString(value) && value.toString().length === 4);
  }

  /**
   * Process validation
   */
  async transform(value: string, metadata: ArgumentMetadata): Promise<any> {
    if (isUndefined(value)) {
      return true;
    }

    const { metatype } = metadata;

    if (YearValidationPipe.isNotYear(value)) {
      throw new HttpException('Value is not a year', HttpStatus.BAD_REQUEST);
    }

    const errors = await validate(plainToClass(metatype as any, value));

    if (errors.length) {
      throw new HttpException(`Validation failed: ${PipeErrors.format(errors)}`, HttpStatus.BAD_REQUEST);
    }

    return parseInt(value);
  }
}

import { CartONGError } from '@/domain/CartONGError';

export class NotFound extends CartONGError {
  constructor(item: string) {
    super(`The item "${item}" was not found`);
  }
}

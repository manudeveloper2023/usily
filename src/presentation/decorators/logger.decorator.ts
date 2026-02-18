import { SetMetadata } from '@nestjs/common';

export const IS_LOGGER_METHOD = 'isLoggerMethod';
export const Logger = () => SetMetadata(IS_LOGGER_METHOD, true);

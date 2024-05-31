import { format, transports } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

export const LoggerFactory = (appName: string) => {
  const DEBUG = process.env.DEBUG || 'true';

  return WinstonModule.createLogger({
    level: DEBUG === 'true' ? 'debug' : 'info',
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.colorize({
            message: true,
            colors: {
              info: 'green',
              error: 'red',
              warn: 'yellow',
            },
          }),
          nestWinstonModuleUtilities.format.nestLike(appName, {
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });
};

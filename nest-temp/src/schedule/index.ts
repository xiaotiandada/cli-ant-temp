import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

export class ScheduleIndex {
  private readonly logger = new Logger(ScheduleIndex.name);

  // @Cron('* * * * * *')
  handleCron() {
    this.logger.debug('schedule controller');
  }
}

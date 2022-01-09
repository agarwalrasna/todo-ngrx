import { NgbDateStruct, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
export class Utility {
  public static getDialogConfig(data?: any,
                                size: 'sm' | 'lg' | 'xl' = 'sm',
                                centered: boolean = true,
                                ignoreBackdropClick: boolean = false,
                                backdrop: boolean | 'static' = true,
                                animated: boolean = true,
                                keyboard: boolean = true): NgbModalConfig {
    const config = {
      data,
      backdrop: ignoreBackdropClick ? 'static' : backdrop,
      animated,
      keyboard,
      centered: true,
    } as any;
    switch (size) {
      case 'lg':
        config.size = 'lg';
        break;
      case 'xl':
        config.size = 'xl';
        break;
      default:
        config.size = 'sm';
        break;
    }
    return config;
  }
  public static toNgbDateStruct(date): NgbDateStruct {
    const newDate = new Date(date);
    return {
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    };
  }
  public static formatDate(date, hours?, minutes?, seconds?): string {
    const currentDate = moment();
    currentDate.set('year', date.year);
    currentDate.set('month', date.month - 1);
    currentDate.set('date', date.day);
    if (hours !== null && hours !== undefined) {
      currentDate.set('hours', hours);
    }
    if (minutes !== null && minutes !== undefined) {
      currentDate.set('minutes', minutes);
    }
    if (seconds !== null && seconds !== undefined) {
      currentDate.set('seconds', seconds);
    }
    return currentDate.format();
  }
}

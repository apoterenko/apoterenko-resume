import { ErrorHandler, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { IAppError, IAppErrorMessage, RequestError } from './app-error.handler.interface';

import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(
    private notificationsService: NotificationsService,
    private translate: TranslateService,
  ) {
  }

  handleError(error: Error | RequestError): void {
    if (!error) {
      this.notificationsService.error(this.translate.instant('default.errors.unknown'));
      return;
    }

    if (error instanceof RequestError) {
      let errorMessage;
      let reason;
      let context;
      const response = error.response;
      const appError = this.toAppError(response);

      if (appError) {
        const appErrorCode = appError.message && (appError.message as IAppErrorMessage).code;
        if (appErrorCode) {
          context = appErrorCode;
        } else {
          context = 'exception';
          reason = [appError.error || '', appError.exception || ''].join('; ');
        }
      } else {
        context = (response.statusText || 'none').replace(/ /g, '');
      }
      errorMessage = this.translate.instant(`default.errors.${response.status}.${context}`,
        { errorStatus: response.status, reason: reason }
      );
      const localizedError = this.tryLocalizeError(error);
      if (localizedError) {
        // Error has description has been set by programmer
        errorMessage = this.makeDefaultMessage(localizedError, errorMessage);
      }
      this.notificationsService.error(errorMessage);
      return;
    }

    this.notificationsService.error(
      this.makeDefaultMessage(this.translate.instant('default.errors.unknown'), this.errorToString(error))
    );
  }

  private toAppError(response: Response): IAppError {
    try {
      return response.json() as IAppError;
    } catch (e) {
      return null;
    }
  }

  private makeDefaultMessage(errorMessage: string, reasonMessage: string): string {
    const reason = this.translate.instant('default.errors.reason', { reason: reasonMessage });
    return `${errorMessage} ${reason}`;
  }

  private errorToString(error: Error | any): string {
    try {
      return JSON.stringify(error);
    } catch (e) {
      return [
        error.constructor ? error.constructor.name : typeof error,
        error.message || error
      ].join(' : ');
    }
  }

  private tryLocalizeError(requestError: RequestError): string {
    const errorTemplate = `default.errors.request.method.${requestError.options.method}.${requestError.url}`;
    const localizedError = this.translate.instant(errorTemplate);
    return errorTemplate === localizedError ? null : localizedError;
  }
}

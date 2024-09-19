import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';

const config: YConfig = {
  apikey: '02f8a573-862d-4cbd-a93a-3673354f3172',
};

export const appConfig: ApplicationConfig = {
  providers: [provideYConfig(config), provideHttpClient()],
};

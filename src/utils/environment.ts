import {Keys, readString} from './storage';

export const STAGING_ENVIRONMENT = {
  API_BASE_URL: 'https://my-mobile.guideline.io/',
  KEY: 'staging',
};

export const PRODUCTION_ENVIRONMENT = {
  API_BASE_URL: '', // Setup production environment base url
  KEY: 'production',
};

export const DEVELOPMENT_ENVIRONMENT = {
  API_BASE_URL: '', // Setup development environment base url
  KEY: 'development',
};

export async function getEnvironment() {
  const environment = await readString(Keys.ENVIRONMENT);
  switch (environment) {
    case DEVELOPMENT_ENVIRONMENT.KEY:
      return DEVELOPMENT_ENVIRONMENT;
    case STAGING_ENVIRONMENT.KEY:
      return STAGING_ENVIRONMENT;
    case PRODUCTION_ENVIRONMENT.KEY:
      return PRODUCTION_ENVIRONMENT;
    default:
      return STAGING_ENVIRONMENT;
  }
}

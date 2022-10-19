export interface URIEnvInput extends NodeJS.ProcessEnv {
  SRV_PROTOCOL ?: string;
  SRV_USERNAME ?: string;
  SRV_PASSWORD ?: string;
  SRV_HOSTS    ?: string;
  SRV_DB       ?: string;
  SRV_REPLSET  ?: string;
  SRV_AUTHDB   ?: string;
  APP_NAME     ?: string;
};

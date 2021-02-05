export interface AppConfigInterface {
  dev: {
    api: {
      host: string;
      port: number;
      endpoints: {
        decodeVin: string;
      };
    };
  };
  prod: {
    api: {
      host: string;
      port: number;
      endpoints: {
        decodeVin: string;
      };
    };
  };
}

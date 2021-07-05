export interface MassiveConnectOptions {
  /**
   * server name or IP address
   */
  host: string;
  /**
   * server port number
   */
  port: number;
  /**
   * database name
   */
  database: string;
  /**
   * user name
   */
  user: string;
  /**
   * user password, or a function that returns one
   */
  password: string;
  /**
   * use SSL (it also can be a TSSLConfig-like object)
   */
  ssl?: boolean;
  /**
   * binary result mode
   */
  binary?: boolean;
  /**
   * client_encoding
   */
  client_encoding?: string;
  /**
   * application_name
   */
  application_name?: string;
  /**
   * fallback_application_name
   */
  fallback_application_name?: string;
  /**
   * lifespan for unused connections
   */
  idleTimeoutMillis?: number;
  /**
   * connection pool size
   */
  poolSize?: number;
  /**
   * maximum size of the connection pool
   */
  max?: number;
  /**
   * minimum size of the connection pool
   */
  min?: number;
  /**
   * query execution timeout
   */
  query_timeout?: number;
  /**
   * keep TCP alive
   */
  keepAlive?: boolean;
}

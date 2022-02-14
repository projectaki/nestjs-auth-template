export const config = () => ({
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  } as DatabaseConfig,
  auth: {
    issuer: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
});

export interface DatabaseConfig {
  connectionString: string;
}

export interface AuthConfig {
  issuer: string;
  audience: string;
}

export const testConfig = () => ({
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  } as DatabaseConfig,
});

export interface DatabaseConfig {
  connectionString: string;
}

export const testConfig = () => ({
  test: {
    value: process.env.VALUE,
  } as Config,
});

export interface Config {
  value: string;
}

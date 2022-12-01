namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NODE_ENV: string;
    DO_SPACES_ENDPOINT: string;
    DO_SPACES_KEY: string;
    DO_SPACES_NAME: string;
    DO_SPACES_SECRET: string;
  }
}

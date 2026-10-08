declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;

    JWT_SECRET: string;

    PORT: string;
  }
}

declare namespace Express {
  interface Request {
    user?: { id: number; role: "admin" | "user" };
  }
}

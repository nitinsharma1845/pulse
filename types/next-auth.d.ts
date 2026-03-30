import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
  }

  interface Session {
    user: {
      _id: string;
      username: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    username: string;
    email: string;
  }
}

const validate = (token: string | undefined | null): boolean => {
  const validToken: boolean = true;
  if (!token || !validToken) {
    return false;
  }
  return true;
};

export const authMiddleware = (req: Request): { isValid: boolean } => {
  const token: string | undefined = req.headers
    .get("authorization")
    ?.split(" ")[1];

  return { isValid: validate(token) };
};

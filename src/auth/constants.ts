export const jwtConstants = {
  expiresIn: process.env.NODE_ENV === 'development' ? '1000s' : '60s',
  secret: 'so-much-secrecy',
};

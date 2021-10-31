export const constants = {
  token_expiration: Number(process.env.TOKEN_EXPIRATION) || '1h',
  secret_token: process.env.SECRET_TOKEN || 'secret_token'
}

export const topics = {
  new_message: 'new_message'
}

export const reSlugYobta = /^[\da-z][\da-z-]*[\da-z]+$/

// RFC 5322
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable unicorn/better-regex */
// TODO:
export const reEmailYobta =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

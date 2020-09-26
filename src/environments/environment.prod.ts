export const environment = {
  production: true,
  oidc: {
    authority: 'https://auth.wohlben.de/auth/realms/wohlben/.well-known/openid-configuration',
    redirect_uri: 'https://wommels.eu',
    client_id: 'wommels',
    extraQueryParams: {
      audience: 'wommels'
    }
  }
};

import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfileData = this.getProfileData.bind(this)
    this.idToken = null
    this.userProfile = null
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    // audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    audience: 'https://www.willchallenge-backend.com',
    responseType: 'token id_token',
    scope: 'openid profile email birthdate phone_number'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    console.log(authResult);
    localStorage.setItem('access_token', authResult.accessToken)
    this.accessToken = authResult.accessToken;
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
    this.userProfile = this.profileAdapter(authResult.idTokenPayload)
    localStorage.setItem('profileData', JSON.stringify(this.userProfile));
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profileData');
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('home')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  profileAdapter (idTokenPayload) {
    return {
      firstName: idTokenPayload.family_name,
      lastName: idTokenPayload.given_name,
      picture: idTokenPayload.picture,
      id: idTokenPayload.sub
    }
  }

  getProfileData () {
    if (this.userProfile) return this.userProfile;
    let profile = null;
    try {
      profile = localStorage.getItem('profileData');
      if (profile) profile = JSON.parse(profile);
    } catch (e) {
      console.error(e);
    }
    return profile;
  }

  getAccessToken () {
    return this.accessToken || localStorage.getItem('access_token');
  }
}

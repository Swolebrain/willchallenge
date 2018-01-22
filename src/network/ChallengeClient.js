import { apiUrl } from '../globals';

class ChallengeClient {
  constructor () {
    console.log('Challengeclient constructed!!');
  }
  createChallenge (name, auth) {
    const user = auth.getProfileData()
    console.log(`This will post ${name} to API ${apiUrl} for user:`);
    console.log(user);
    return fetch(apiUrl + '/challenge', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.getAccessToken(),
        'x-id-token': auth.getIdToken()
      },
      method: 'POST',
      body: JSON.stringify({
        owner: user.id,
        description: name
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  loadAllChallenges (auth) {
    const user = auth.getProfileData();
    console.log(`This will get all challenges from ${apiUrl} for user:`);
    console.log(user);
    return new Promise((resolve, reject) => {
      fetch(apiUrl + '/challenge/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getAccessToken(),
          'x-id-token': auth.getIdToken()
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => reject(err));
    })
  }
  subscribeToChallenge (id, auth) {
    const user = auth.getProfileData();
    console.log('This will add newsubcriber ' + user.id + ' to challenge ' + id);
    return fetch(apiUrl + '/challenge/' + id, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.getAccessToken(),
        'x-id-token': auth.getIdToken()
      },
      method: 'PATCH',
      body: JSON.stringify({
        newsubscriber: user.id
      })
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
}

export default new ChallengeClient();

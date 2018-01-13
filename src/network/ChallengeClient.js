import { apiUrl } from '../globals';

class ChallengeClient {
  constructor () {
    console.log('Challengeclient constructed!!');
  }
  createChallenge (name, auth) {
    const user = auth.getProfileData()
    console.log(`This will post ${name} to API ${apiUrl} for user:`);
    console.log(user);
    fetch(apiUrl + '/challenge', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.getAccessToken()
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
    const user = auth.getProfileData()
    console.log(`This will get all challenges from ${apiUrl} for user:`);
    console.log(user);
    return new Promise((resolve, reject) => {
      fetch(apiUrl + '/challenge', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.getAccessToken()
        }
      })
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    })
  }
}

export default new ChallengeClient();

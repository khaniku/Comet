let url = "http://159.203.100.198:5000";

export function getSurveys(accessToken) {
    return fetch(url+"/api/survey/index", {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+accessToken
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
    console.log(error);
    });
}
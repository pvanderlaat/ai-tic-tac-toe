function getPredictions(currBoardState) {
    // let apiUrl = "http://localhost:3002/api";
    let apiUrl = "https://flask-skeleton-ljp62yl6xq-ue.a.run.app/api"
    apiUrl = apiUrl + "?state=" + currBoardState
    console.log(apiUrl)
    const res = fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      return res
}

export default getPredictions;

function getPredictions(currBoardState) {
    // let apiUrl = "http://127.0.0.1:3002/api";
    let apiUrl = "https://flask-skeleton-ljp62yl6xq-ue.a.run.app/api"
    // console.log(currBoardState)
    apiUrl = apiUrl + "?state=" + currBoardState
    console.log(apiUrl)
    // Use the fetch API to make the GET request
    const res = fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // Update the data state with the response data
        return responseData
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      return res
}

export default getPredictions;

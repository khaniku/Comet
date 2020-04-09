export default fetchSurveys(){
	fetch("http://159.203.100.198:5000/api/survey/index")
	      .then((result) => result.json())
	      .then(
	        (survey) => {
	          this.setState({
	            isLoaded: true,
	            SurveyID: `${survey.id}`,
	            SurveyLocation: `${survey.siteAddress}`,
	            ClientName: `${survey.customerName}`,
	            Status: {}, //to be implemented correctly
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error,
	          });
	        }
      );
}
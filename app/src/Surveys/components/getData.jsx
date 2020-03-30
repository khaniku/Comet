import React from "react";

export default class GetData extends React.Component {
  state = {
    loading: true,
    survey: null
  };

  async componentDidMount() {
    const url = "https://api.randomuser.me/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ survey: data.results[0], loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.survey ? (
          <div>loading...</div>
        ) : (
          <div>Nope</div>
        )}
      </div>
    );
  }
}

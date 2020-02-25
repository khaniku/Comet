import React from 'react';
import {connect} from 'react-redux';
import { Dots } from 'react-activity';

class AuthChecker extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  /**
   * @description Redirects user to dashboard if token still exist
   * @async
   * @method
   */
  _bootstrapAsync = async () => {
    let accessToken = localStorage.getItem('accessToken')
    this.props.history.push(accessToken ? "/dashboard": "/login");
    if(await this.props.accessToken == null){
        localStorage.removeItem('accessToken');
        this.props.history.push("/login")
    }
  }

  render() {
    return (
      <Dots />
    )
  }
}

const mapStateToProps = state => {

  return {accessToken: state.auth.accessToken}
}

export default connect(mapStateToProps)(AuthChecker)
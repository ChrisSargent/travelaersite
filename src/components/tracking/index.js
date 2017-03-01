// import {PureComponent} from 'react'
// import {connect} from 'react-redux'
// import {getOptions} from '../../reducers/site'
// import withRouter from 'react-router/lib/withRouter'
// import ReactGA from 'react-ga'
//
// class Tracking extends PureComponent {
//   componentWillReceiveProps(newProps) {
//     const {google_tracking_code} = newProps.options
//     console.log(google_tracking_code);
//     ReactGA.initialize(google_tracking_code, { debug: true });
//   }
//
//   render() {
//     return null
//   }
// }
//
// const mapStateToProps = (state) => {
//   return ({options: getOptions(state)})
// }
//
// export default withRouter(connect(mapStateToProps)(Tracking))

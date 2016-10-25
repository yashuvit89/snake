import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'
import Main from './Main'
import * as SnakeActions from '../actions'

const App = ({snake, actions}) => (
	<div className="container">
 		<Header snake={snake} actions={actions}/>
		<Main snake={snake} actions={actions}/>
 </div>
)

App.propTypes = {
	snake: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	snake: state.snake
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(SnakeActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

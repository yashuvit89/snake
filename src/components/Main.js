import React, { Component, PropTypes } from 'react'
import CanvasComponent from './CanvasComponent'

export default class Main extends Component {
	static propTypes = {
    snake: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    return (
			<div>
				<CanvasComponent {...this.props.snake} {...this.props.actions}/>
   		</div>
    )
  }
}

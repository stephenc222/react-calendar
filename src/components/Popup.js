import React, { Component } from 'react'
import './Popup.css'

export default class Popup extends Component {
  render() {
    if (!this.props.showPopup) {
      return null;
    }
    return (
      <div className='popup-container'>
        <div className='popup-container-inner'>{this.props.children}</div>
      </div>
    )
  }
}

/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ModalAddToken from '../components/ModalAddToken';
import TokenBar from '../components/TokenBar';
import HathorAlert from '../components/HathorAlert';
import $ from 'jquery';
import BackButton from '../components/BackButton';


/**
 * Initial screen of custom tokens
 *
 * @memberof Screens
 */
class CustomTokens extends React.Component {
  /**
   * Called when a new token was registered with success, then close the modal and show alert success
   */
  newTokenSuccess = () => {
    $('#addTokenModal').modal('hide');
    this.refs.alertSuccess.show(1000);
  }

  /**
   * Triggered when user clicks to do the register a token, then opens the new token modal
   */
  registerTokenClicked = () => {
    $('#addTokenModal').modal('show');
  }

  /**
   * Triggered when user clicks to do the create a new token, then redirects to the screen
   */
  createTokenClicked = () => {
    this.props.history.push('/create_token/');
  }

  render() {
    return (
      <div className="content-wrapper">
        <BackButton {...this.props} />
        <h3 className="mt-4">Custom Tokens</h3>
        <p className="mt-5">You can create your own digital token with customized specifications on Hathor Network with only a few clicks. They will fully work under the same technical assumptions of high scalability and decentralized consensus of our native HTR tokens. Custom tokens will always work independently of the price of the native HTR token, and they can serve multiple purposes.</p>
        <p>Every custom token has a unique <strong>Configuration String</strong> which must be shared with all other people that will use the custom token.</p>
        <p>If you want to use a custom token that already exists, you need to register this token in your Hathor Wallet. For this, you will need the custom token's Configuration String, which you can get from the creators of the token.</p>
        <div className="d-flex flex-row align-items-center justify-content-center mt-5">
          <button className="btn btn-hathor mr-4" onClick={this.createTokenClicked}>Create a new token</button>
          <button className="btn btn-hathor" onClick={this.registerTokenClicked}>Register a token</button>
        </div>
        <ModalAddToken success={this.newTokenSuccess} />
        <HathorAlert ref="alertSuccess" text="Token registered with success!" type="success" />
        <TokenBar {...this.props}  />
      </div>
    );
  }
}

export default CustomTokens;
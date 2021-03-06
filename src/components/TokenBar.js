/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import helpers from '../utils/helpers';
import wallet from '../utils/wallet';
import { connect } from "react-redux";
import { selectToken } from '../actions/index';


const mapStateToProps = (state) => {
  return {
    registeredTokens: state.tokens,
    allTokens: state.allTokens,
    selectedToken: state.selectedToken,
    historyTransactions: state.historyTransactions,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    selectToken: data => dispatch(selectToken(data)),
  };
};


/**
 * Component that shows the left bar of tokens
 *
 * @memberof Components
 */
class TokenBar extends React.Component {
  constructor(props) {
    super(props);

    /**
     * opened {boolean} If bar is opened or not (default is false)
     * selected {string} Symbol of the selected token (default is 'HTR')
     */
    this.state = {
      opened: false,
      selected: 'HTR',
    }
  }

  /**
   * Get quantity of unknown tokens comparing allTokens and registeredTokens in redux
   *
   * @return {number} Quantity of unknown tokens
   */
  getUnknownTokens = () => {
    let diff = 0;
    for (const uid of this.props.allTokens) {
      const index = this.props.registeredTokens.findIndex((token) => token.uid === uid);
      if (index === -1) {
        // Token still does not exist in registered tokens
        diff += 1;
      }
    }
    return diff;
  }

  /**
   * Called when user clicked to expand bar
   */
  toggleExpand = () => {
    this.setState({ opened: !this.state.opened });
  }

  /**
   * Called when user selects another token
   * 
   * @param {string} uid UID of token user selected
   */
  tokenSelected = (uid) => {
    this.props.selectToken(uid);
  }

  /**
   * Called when user clicks to lock wallet, then redirects to locked screen
   */
  lockWallet = () => {
    wallet.lock();
    this.props.history.push('/locked/');
  }

  /**
   * Called when user clicks to go to settings, then redirects to settings screen
   */
  goToSettings = () => {
    this.props.history.push('/settings/');
  }

  /**
   * Get the balance of one token
   *
   * @param {string} uid UID to get balance from
   *
   * @return {string} Available balance of token formatted
   */
  getTokenBalance = (uid) => {
    const filteredHistoryTransactions = wallet.filterHistoryTransactions(this.props.historyTransactions, uid);
    const balance = wallet.calculateBalance(filteredHistoryTransactions, uid);
    const total = balance.available + balance.locked;
    return helpers.prettyValue(total);
  }

  /**
   * Called when user clicks in the unknown tokens number, then redirects to unknown tokens screen
   */
  unknownClicked = () => {
    this.props.history.push('/unknown_tokens/');
  }

  render() {
    const unknownTokens = this.getUnknownTokens();

    const renderTokens = () => {
      return this.props.registeredTokens.map((token) => {
        return (
          <div key={token.uid} className={`token-wrapper ${token.uid === this.props.selectedToken ? 'selected' : ''}`} onClick={(e) => {this.tokenSelected(token.uid)}}>
            <span className='ellipsis'>{token.symbol} {this.state.opened && ` - ${this.getTokenBalance(token.uid)}`}</span>
          </div>
        )
      });
    }

    const renderExpandedHeader = () => {
      return (
        <div className='d-flex align-items-center justify-content-between flex-row w-100'>
          <span>Tokens</span>
          <i className='fa fa-chevron-left' title='Close bar'></i>
        </div>
      )
    }

    const renderUnknownTokens = () => {
      return (
        <div title={`${unknownTokens} unknown ${helpers.plural(unknownTokens, 'token', 'tokens')}`} className={`d-flex align-items-center icon-wrapper ${this.state.opened ? 'justify-content-start' : 'justify-content-center'}`} onClick={this.unknownClicked}>
          <div className="unknown-symbol d-flex flex-row align-items-center justify-content-center">{unknownTokens}</div>
          {this.state.opened && <span className='ellipsis'>Unknown {helpers.plural(unknownTokens, 'token', 'tokens')}</span>}
        </div>
      );
    }

    return (
      <div className={`d-flex flex-column align-items-center justify-content-between token-bar ${this.state.opened ? 'opened' : 'closed'}`}>
        <div className='d-flex flex-column align-items-center justify-content-between w-100'>
          <div className='header d-flex align-items-center justify-content-center w-100' onClick={this.toggleExpand}>
            {this.state.opened ? renderExpandedHeader() : <i className='fa fa-chevron-right' title='Expand bar'></i>}
          </div>
          <div className='body'>
            {renderTokens()}
            {unknownTokens > 0 ? renderUnknownTokens() : null}
          </div>
        </div>
        <div className='footer d-flex align-items-center justify-content-center flex-column'>
          <div className={`d-flex align-items-center icon-wrapper ${this.state.opened ? 'justify-content-start' : 'justify-content-center'}`} onClick={this.lockWallet}>
            <i className='fa fa-lock token-icon' title='Lock wallet'></i>
            {this.state.opened && <span className='ellipsis'>Lock wallet</span>}
          </div>
          <div className={`d-flex align-items-center icon-wrapper ${this.state.opened ? 'justify-content-start' : 'justify-content-center'}`} onClick={this.goToSettings}>
            <i className='fa fa-cog token-icon' title='Settings'></i>
            {this.state.opened && <span className='ellipsis'>Settings</span>}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenBar);

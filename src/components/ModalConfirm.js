/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';


/**
 * Component that shows a confirm modal with two buttons (close modal, or execute action from props.handleYes)
 *
 * @memberof Components
 */
const ModalConfirm = (props) => {
  return (
    <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.body}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
            <button onClick={props.handleYes} type="button" className="btn btn-hathor">Yes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm;

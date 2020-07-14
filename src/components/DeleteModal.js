import React from 'react'

const DeleteModal = ({deleteHandler = () => {}, additionalText}) => {
    return (
        <div
            className="modal fade"
            tabIndex="-1"
            id="modal"
            role="dialog"
            data-backdrop="static"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title text-danger">Warning!</h3>
                    </div>
                    <div className="modal-body py-3">
                        <p className="font-weight-bold">
                            Are you really sure want to delete this item? {additionalText ? additionalText : null}
                        </p>
                        <small>(Note: You cannot undo this action)</small>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={deleteHandler}
                        >
                            Delete Permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;

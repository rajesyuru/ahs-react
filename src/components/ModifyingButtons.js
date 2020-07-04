import React from 'react';

const ModifyingButtons = ({
    editingButton = () => {},
    deletingButton = () => {},
}) => {
    return (
        <div>
            <button
                className="btn btn-info px-2"
                onClick={editingButton}
                title="Edit"
            >
                <span
                    className="material-icons text-light"
                    style={{ fontSize: 20, marginTop: 2 }}
                >
                    edit
                </span>
            </button>
            <button
                className="btn btn-danger px-2"
                onClick={deletingButton}
                title="Delete"
            >
                <span
                    className="material-icons text-light"
                    style={{ fontSize: 20, marginTop: 2 }}
                >
                    delete
                </span>
            </button>
        </div>
    );
};

export default ModifyingButtons;

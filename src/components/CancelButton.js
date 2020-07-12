import React from 'react'

const CancelButton = ({onClick = () => {}}) => {
    return (
        <button
            className="btn btn-secondary"
            onClick={onClick}
        >
            Cancel
        </button>
    )
}

export default CancelButton

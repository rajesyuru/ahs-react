import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Alerts({ alerts }) {
    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div className={`alert alert-${alert.type}`} key={alert.id}>
                {alert.message}
            </div>
        ))
    );
}

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        alerts: state.alert,
    };
};

export default connect(mapStateToProps)(Alerts);

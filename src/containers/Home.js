import React from "react";
import { connect } from 'react-redux';

function Home() {
    return <h1>Welcome</h1>;
}

export default connect()(Home);

import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./containers/NavBar";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Alerts from "./components/Alerts";
import { PersistGate } from "redux-persist/integration/react";
import Content from './containers/Content'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <NavBar authenticated={false} />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12"></div>
                        </div>
                        <div className="row">
                            <div className="col-12 pt-2">
                                <Alerts />
                                <Content />
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;

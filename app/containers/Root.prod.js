import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        const ReactGA = require('react-ga');
        ReactGA.initialize('UA-86413485-2');

        const logPageView = () => {
            if(process.env.PIPELINE_ENV === 'production') {
                ReactGA.set({page: window.location.pathname});
                ReactGA.pageview(window.location.pathname);
            }
        };

        return (
            <Provider store={store}>
                <Router history={history} routes={routes} onUpdate={logPageView} />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

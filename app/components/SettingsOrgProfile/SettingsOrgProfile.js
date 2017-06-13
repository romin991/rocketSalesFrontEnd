import React from 'react';
import { connect } from 'react-redux';
import './SettingsOrgProfile.scss';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SettingsHead from '../SettingsHead/SettingsHead';
import OrgProfileForm from '../OrgProfileForm/OrgProfileForm';
import { getEntity } from '../../actions/entitiesActions';
import _ from 'lodash';

class SettingsOrgProfile extends React.Component {
    componentDidMount() {
        this.props.getInitialData();
    }

    render() {
        const { entitiesReducer: { entity } } = this.props;
        return (
            <div className="settingsPage orgProfile">
                <SettingsHead/>
                <div className="mainContainer">
                    <SettingsMenu activateClass="org"/>
                    {!_.isEmpty(entity.name) &&
                    <OrgProfileForm
                        initialValues={{
                            editing: false,
                            companyName: entity.name,
                            industry: entity.industry,
                            companyWebsite: entity.company_website,
                            street: entity.street,
                            state: entity.state,
                            country: entity.country,
                            zipCode: entity.pos_code
                        }}
                    /> || <div>loading</div>
                    }
                </div>
            </div>
        );
    }
}

SettingsOrgProfile.propTypes = {
    getInitialData: React.PropTypes.func,
    entitiesReducer: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        entitiesReducer: state.entitiesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => {
            dispatch(getEntity());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsOrgProfile);

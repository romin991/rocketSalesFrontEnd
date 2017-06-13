import React from 'react';
import SimpleModal from '../Modal/SimpleModal';
import { connect } from 'react-redux';
import { hideCloseDealModal } from '../../actions/modalsActions';
import CloseDealForm from '../CloseDealForm/CloseDealForm';

class CloseDealModal extends React.Component {
    render() {
        const { onHideModal, modalsReducer, dealId } = this.props;

        const customModalStyle = {
            transform: 'none',
            margin: '30px auto',
            top: '0',
            width: '550px',
            maxWidth: '100%',
            left: '0',
            position: 'relative'
        };

        return (
            <SimpleModal
                showModal={modalsReducer.showCloseDealModal}
                onHide={onHideModal}
                customModalStyle={customModalStyle}
                modalTitle="CLOSE DEAL"
            >
                <CloseDealForm
                    initialValues={{
                        status: 'CW'
                    }}
                    dealId={dealId}
                />
            </SimpleModal>
        );
    }
}

CloseDealModal.propTypes = {
    onHideModal: React.PropTypes.func,
    modalsReducer: React.PropTypes.object,
    dealId: React.PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        modalsReducer: state.modalsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHideModal: () => {
            dispatch(hideCloseDealModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CloseDealModal);


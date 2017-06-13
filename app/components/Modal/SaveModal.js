import React from 'react';
import WaveModal from 'boron/WaveModal';
import './Modal.scss';
import LoadingElement from '../LoadingElement/LoadingElement';

export default class SaveModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.showModal) {
            this.showModal();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal) {
            this.showModal();
        } else if (this.props.showModal && !nextProps.showModal) {
            this.hideModal();
        }
    }

    showModal() {
        this.refs.modal.show();
    }

    hideModal() {
        this.refs.modal.hide();
    }

    render() {
        const backdropStyle = {
            backgroundColor: '#7E8C99'
        };

        const modalStyle = {
            transform: 'none',
            margin: '30px auto',
            top: '0',
            width: '880px',
            maxWidth: '100%',
            left: '0',
            position: 'relative'
        };

        const contentStyle = {
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.45), 0 0 1px 1px rgba(0, 0, 0, 0.25)',
            textAlign: 'left',
            animationDuration: '0.01s'
        };

        const { headerIcon } = this.props;

        return (
            <div className="modal-component">
                <WaveModal
                    ref="modal"
                    onHide={this.props.onHide}
                    onShow={this.props.onShow}
                    backdropStyle={backdropStyle}
                    modalStyle={modalStyle}
                    contentStyle={contentStyle}
                >
                    <div className="blockTitle">
                        <h3>
                            {headerIcon && headerIcon()}
                            {this.props.modalTitle}
                        </h3>
                        <div className="closeButton">
                            <i className="fa fa-times" aria-hidden="true" onClick={this.hideModal.bind(this)}/>
                        </div>
                    </div>
                    <div className="overflowBlock">
                        {this.props.children}
                    </div>
                    <div className="buttonsBlock">
                        <div className="buttons">
                            <button className="cancelButton" type="button" onClick={this.hideModal.bind(this)}>Cancel</button>
                            <button className="saveButton" type="button" disabled={this.props.submitLoading} onClick={this.props.onSave}>
                                {this.props.submitLoading && <LoadingElement/>}
                                Save
                            </button>
                            <button className="saveNewButton" type="button" disabled={this.props.submitLoading} onClick={this.props.onSaveAndNew}>
                                {this.props.submitLoading && <LoadingElement/>}
                                Save & New
                            </button>
                        </div>
                    </div>
                </WaveModal>
            </div>
        );
    }
}

SaveModal.propTypes = {
    showModal: React.PropTypes.bool,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onSaveAndNew: React.PropTypes.func,
    contentStyle: React.PropTypes.object,
    modalStyle: React.PropTypes.object,
    children: React.PropTypes.object,
    modalTitle: React.PropTypes.string,
    headerIcon: React.PropTypes.func,
    submitLoading: React.PropTypes.bool
};

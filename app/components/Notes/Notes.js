import React from 'react';
import './Notes.scss';
import { connect } from 'react-redux';
import { getNotes, addNote, clearNotesList } from '../../actions/notesActions';
import NoteCreationForm from '../NoteCreationForm/NoteCreationForm';
import moment from 'moment';

class Notes extends React.Component {
    componentWillMount() {
        const { onWillLoad } = this.props;
        onWillLoad();
    }

    componentDidMount() {
        const {onLoad, detailId, listType} = this.props;
        onLoad(detailId, listType);
    }

    render() {
        const { notes, notesLoading } = this.props.notesReducer;
        const { detailId, modelMetaKey, authReducer, onSaveNote, form } = this.props;

        return(
            <div className="notesContent">
                <NoteCreationForm
                    handleSubmit={(e) => {e.preventDefault(); onSaveNote(detailId, modelMetaKey, form.noteCreationForm.values.note, authReducer.user.model_meta);}}
                />
                <ul>
                    {notes.length > 0 && notes.map((note) =>
                        <li key={note.id}>
                            <div className="notesBlock">
                                <div className="notesAvatar" style={{backgroundImage: `url(${note.employee_prof_pic})`}}></div>
                                <div className="textBlock">
                                    <div className="note">{note.note}</div>
                                    <div className="noteDesc">Added {moment(note.created_at).fromNow()} by <span>{note.employee_first_name} {note.employee_last_name}</span></div>
                                </div>
                            </div>
                        </li>
                    ) || <li>
                         {notesLoading && <div>Loading</div>}
                    </li> }
                </ul>
            </div>
        );
    }
}

Notes.propTypes = {
    authReducer: React.PropTypes.object,
    notesReducer: React.PropTypes.object,
    form: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    detailId: React.PropTypes.string,
    listType: React.PropTypes.string,
    onTextareaChanged: React.PropTypes.func,
    onSaveNote: React.PropTypes.func,
    modelMetaKey: React.PropTypes.string,
    onWillLoad: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        notesReducer: state.notesReducer,
        form: state.form
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWillLoad: () => {
            dispatch(clearNotesList());
        },
        onLoad: (id, listType) => {
            dispatch(getNotes(id, listType));
        },
        onSaveNote: (detailId, modelMetaKey, textareaValue, modelMeta) => {
            const noteData = {
                object_id: detailId,
                note: textareaValue,
                content_type: modelMeta[modelMetaKey]
            };

            dispatch(addNote(noteData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

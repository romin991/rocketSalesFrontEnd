import React from 'react';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0]);
    }

    render() {
        const { input: { accept }, inputKeyValue } = this.props;

        return (<input
            type="file"
            onChange={this.onChange}
            accept={accept}
            key={inputKeyValue}
        />);
    }
}

FileInput.propTypes = {
    input: React.PropTypes.object,
    cleared: React.PropTypes.bool,
    inputKeyValue: React.PropTypes.string
};

export default FileInput;

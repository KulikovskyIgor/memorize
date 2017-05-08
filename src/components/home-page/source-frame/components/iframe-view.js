import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';

class IFrameView extends PureComponent {

    componentDidMount() {
        if (this.props.onLoad) this.refs.iframe.addEventListener('load', this.props.onLoad);
    };

    render() {
        return (
            <iframe
                src={this.props.url}
                width="100%"
                height="100%"
                frameBorder="0"
                ref="iframe"
            />
        );
    }
}

IFrameView.propTypes = {
    url: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
};

export default IFrameView

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import {connect}          from 'react-redux';
import Loader             from 'react-loader';
import IFrameView         from '../components/iframe-view';

const loaderOptions = {
    length: 20,
    width: 10,
    radius: 20,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#006064',
};

class SourceFrameContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isIFrameLoading: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeSourceId !== this.props.activeSourceId) {
            this.setState({isIFrameLoading: true});
        }
    }

    handleLoadIFrame = () => {
        this.setState({isIFrameLoading: false});
    };

    render() {
        const {sources, activeSourceId} = this.props;
        const {isIFrameLoading} = this.state;
        const activeSource = sources[activeSourceId];

        return (
            <div className="source-frame-container">
                <Loader options={loaderOptions}
                        loaded={!isIFrameLoading}
                />
                <If condition={activeSource}>
                    <IFrameView url={activeSource.sourceUrl}
                                onLoad={this.handleLoadIFrame}
                    />
                </If>
                <If condition={!activeSource}>
                    <div className="choose-source">
                        choose source
                    </div>
                </If>
            </div>
        );
    }
}

SourceFrameContainer.propTypes = {
    activeSourceId: PropTypes.string,
    sources: PropTypes.object,
};

const mapStateToPros = state => ({
    activeSourceId: state.sources.activeSourceId,
    sources: state.sources.sources,
});

export default connect(mapStateToPros)(SourceFrameContainer);

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import {connect}          from 'react-redux';

import {Grid, Row, Col}         from 'react-flexbox-grid';

class SourceFrameContainer extends Component {

    render() {
        const {sources, activeSourceId} = this.props;
        const activeSource = sources[activeSourceId];

        return (
            <div className="source-frame-container">
                { activeSource ?
                    <iframe
                        src={activeSource.sourceUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    />
                    :
                    <div>
                        choose source
                    </div>
                }
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

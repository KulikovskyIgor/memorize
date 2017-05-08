import React     from 'react';
import PropTypes from 'prop-types';

function TagView(props)  {
    return (
        <div className="tag-view">
            {props.tag}
        </div>
    );
}

TagView.propTypes = {
    tag: PropTypes.string,
};

export default TagView;

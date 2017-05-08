import React         from 'react';
import PropTypes     from 'prop-types';
import Avatar        from 'material-ui/Avatar';
import IconButton    from 'material-ui/IconButton';
import MoreVert      from 'material-ui/svg-icons/navigation/more-vert';
import OpenInNew     from 'material-ui/svg-icons/action/open-in-new';
import classNames    from 'classnames';
import datefnsFormat from 'date-fns/format';
import TagView       from './tag-view';

function SourceView(props) {
    const formattedDate = datefnsFormat(props.createdAt, 'YYYY-MM-DD');

    return (
        <div className={classNames('source-view', {active: props.isActive})}
             onClick={props.onClick}
        >
            <div className="header">
                <div className="avatar">
                    <Avatar
                        src={props.user.photoURL}
                        size={30}
                    />
                </div>
                <div className="username">
                    {props.user.displayName}
                </div>
                <div className="time">
                    {formattedDate}
                </div>
                <div className="actions">
                    <IconButton onTouchTap={props.onClickOpenInNew}>
                        <OpenInNew />
                    </IconButton>
                    <IconButton onTouchTap={props.onClickOpenPopup}>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="content">
                <div className="description-container">
                    {props.description}
                </div>
                <div className="tags-container">
                    {props.tagIds.map((id) => (
                        <TagView key={id} tag={props.tags[id]}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

SourceView.propTypes = {
    userId: PropTypes.string,
    tagIds: PropTypes.array,
    sourceUrl: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    tags: PropTypes.object,
    user: PropTypes.shape({
        uid: PropTypes.string,
        displayName: PropTypes.string,
        photoURL: PropTypes.string,
        email: PropTypes.string,
    }),
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    onClickOpenInNew: PropTypes.func,
    onClickOpenPopup: PropTypes.func,
};

SourceView.defaultProps = {
    tagIds: [],
    user: {
        uid: '',
        displayName: '',
        photoURL: '',
        email: '',
    },
    isActive: false,
};

export default SourceView;
import React, {PureComponent}   from 'react';
import PropTypes                from 'prop-types';
import Avatar                   from 'material-ui/Avatar';
import IconButton               from 'material-ui/IconButton';
import MoreVert                 from 'material-ui/svg-icons/navigation/more-vert';
import OpenInNew                from 'material-ui/svg-icons/action/open-in-new';
import classNames               from 'classnames';
import datefnsFormat            from 'date-fns/format';
import TagView                  from './tag-view';
import SourceOptionsPopoverView from './source-options-popover-view';

class SourceView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOptionsPopoverOpened: false,
            popoverAnchorEl: null,
        };
    }

    handleOpenPopover = (e) => {
        this.setState({
            isOptionsPopoverOpened: true,
            popoverAnchorEl: e.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({isOptionsPopoverOpened: false});
    };

    handleOpenSourceInNewTab = () => {
        const win = window.open(this.props.sourceUrl, '_blank');
        win.focus();
    };

    handleEditSource = () => {
        this.setState({isOptionsPopoverOpened: false});
        this.props.onEdit(this.props.id);
    };

    handleDeleteSource = () => {
        this.setState({isOptionsPopoverOpened: false});
        this.props.onDelete(this.props.id);
    };

    render() {
        const {
            id,
            user,
            isActive,
            isLoggedUser,
            description,
            tags,
            tagIds,
            createdAt,
            onClick,
        } = this.props;
        const {isOptionsPopoverOpened, popoverAnchorEl} = this.state;
        const formattedDate = datefnsFormat(createdAt, 'YYYY-MM-DD');

        return (
            <div className={classNames('source-view', {active: isActive})}
                 onClick={() => {
                     onClick(id)
                 }}
            >
                <div className="header">
                    <div className="avatar">
                        <Avatar
                            src={user.photoURL}
                            size={30}
                        />
                    </div>
                    <div className="username">
                        {user.displayName}
                    </div>
                    <div className="time">
                        {formattedDate}
                    </div>
                    <div className="actions" onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <IconButton tooltip="Open in new tab"
                                    onTouchTap={this.handleOpenSourceInNewTab}
                        >
                            <OpenInNew />
                        </IconButton>
                        <If condition={isLoggedUser}>
                            <IconButton onTouchTap={this.handleOpenPopover}>
                                <MoreVert />
                            </IconButton>
                            <SourceOptionsPopoverView
                                isOpen={isOptionsPopoverOpened}
                                anchorEl={popoverAnchorEl}
                                onEdit={this.handleEditSource}
                                onDelete={this.handleDeleteSource}
                                onCloseRequest={this.handleClosePopover}
                            />
                        </If>
                    </div>
                </div>
                <div className="content">
                    <div className="description-container">
                        {description}
                    </div>
                    <div className="tags-container">
                        {tagIds.map((id) => (
                            <TagView key={id} tag={tags[id]}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

SourceView.propTypes = {
    id: PropTypes.string,
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
    isLoggedUser: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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

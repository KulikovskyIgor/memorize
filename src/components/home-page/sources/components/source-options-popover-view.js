import React     from 'react';
import PropTypes from 'prop-types';
import Popover   from 'material-ui/Popover';
import Menu      from 'material-ui/Menu';
import MenuItem  from 'material-ui/MenuItem';

const SourceOptionsPopoverView = (props) => {
    return (
        <Popover
            open={props.isOpen}
            anchorEl={props.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={props.onCloseRequest}
        >
            <Menu>
                <MenuItem primaryText="Edit"
                          onTouchTap={props.onEdit}
                />
                <MenuItem primaryText="Delete"
                          onTouchTap={props.onDelete}
                />
            </Menu>
        </Popover>
    );
};

SourceOptionsPopoverView.propTypes = {
    isOpen: PropTypes.bool,
    anchorEl: PropTypes.any,
    onCloseRequest: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default SourceOptionsPopoverView;

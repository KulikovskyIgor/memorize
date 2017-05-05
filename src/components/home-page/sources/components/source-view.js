import React            from 'react';
import PropTypes        from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';

const style = {
    maxWidth: '100px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block',
    marginRight: '5px',
    height: '17px',
    lineHeight: '12px',
    color: '#333',
    fontSize: '.8em'
};

const styleChip = {
    height: '20px',
    display: 'inline-block',
    marginRight: '3px',
};


function SourceView(props) {
    return (
        <Card>
            <CardHeader
                title={props.userId}
                avatar="images/ok-128.jpg"
            />
            <If condition={props.description}>
                <CardText>
                    {props.description}
                </CardText>
            </If>
            <If condition={props.tagIds.length}>
                <CardText>
                    {props.tagIds.map((id) => (
                        <Chip key={id} style={styleChip}>
                            <span style={style}>
                                {id}
                            </span>
                        </Chip>
                    ))}
                </CardText>
            </If>
        </Card>
    );
}

SourceView.propTypes = {
    userId: PropTypes.string,
    tagIds: PropTypes.array,
    sourceUrl: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
};

SourceView.defaultProps = {
    tagIds: [],
};

export default SourceView;
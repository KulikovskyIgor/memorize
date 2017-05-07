import React                        from 'react';
import PropTypes                    from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip                         from 'material-ui/Chip';

function SourceView(props) {

    return (
        <Card className="source-view">
            <CardHeader
                title={props.user.displayName}
                avatar={props.user.photoURL}
            />
            <If condition={props.description}>
                <CardText>
                    {props.description}
                </CardText>
            </If>
            <If condition={props.tagIds.length}>
                <CardText>
                    {props.tagIds.map((id) => (
                        <div key={id}
                             className="tag-wrapper"
                        >
                            <Chip key={id}
                                  className="chip"
                            >
                                {props.tags[id]}
                            </Chip>
                        </div>
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
    tags: PropTypes.object,
    user: PropTypes.shape({
        uid: PropTypes.string,
        displayName: PropTypes.string,
        photoURL: PropTypes.string,
        email: PropTypes.string,
    })
};

SourceView.defaultProps = {
    tagIds: [],
    user: {
        uid: '',
        displayName: '',
        photoURL: '',
        email: '',
    }
};

export default SourceView;

import React                        from 'react';
import PropTypes                    from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip                         from 'material-ui/Chip';

function SourceView(props) {

    return (
        <Card className="source-view">
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
};

SourceView.defaultProps = {
    tagIds: [],
};

export default SourceView;

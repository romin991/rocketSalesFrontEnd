import React from 'react';
import { connect } from 'react-redux';
import { getTimeLine, clearTimeLineList } from '../../actions/timeLineActions';
import moment from 'moment';
import { Link } from 'react-router';
import './TimeLine.scss';

class TimeLine extends React.Component {
    componentWillMount() {
        const { onWillLoad } = this.props;
        onWillLoad();
    }

    componentDidMount() {
        const {onLoad, detailId, listType} = this.props;
        onLoad(detailId, listType);
    }

    render() {
        const { timeLine, timeLineLoading } = this.props.timeLineReducer;

        return(
            <div className="timeLine">
                <ul>
                    {timeLine.length > 0 && timeLine.map((action) =>
                        <li key={action.action_id}>
                            <div className="vLine"></div>
                            <div className="dateBlock">
                                <div className="month">
                                    {moment(action.time).format('MMM')}
                                </div>
                                <div className="dateLine"></div>
                                <div className="day">
                                    {moment(action.time).format('DD')}
                                </div>
                            </div>
                            <div className="descriptionBlock">
                                <div className="circle"></div>
                                <div className="description">
                                    {action.action_type} {action.verb} <span> </span>
                                    {(() => {
                                        switch (action.action_type) {
                                            case 'Task':
                                                return  (<Link to={'/detail-task/' + action.action_id}>
                                                    <span className="actionTitle">{action.action_title} </span>
                                                </Link>);
                                            case 'Event':
                                                return  (<Link to={'/detail-meeting/' + action.action_id}>
                                                    <span className="actionTitle">{action.action_title} </span>
                                                </Link>);
                                            case 'Deal':
                                                return  (<Link to={'/detail-deal/' + action.action_id}>
                                                    <span className="actionTitle">{action.action_title} </span>
                                                </Link>);
                                            default:
                                                return <span className="actionTitle">{action.action_title} </span>;
                                        }
                                    })()}
                                    for <span>{action.object_title}</span>
                                    <div className="timeBlock">
                                        by {action.employee_title} on {moment(action.time).format('h:mm a')}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ) || <li>
                        {timeLineLoading && <div>Loading</div> || <div>There is no timeline</div>}
                    </li> }
                </ul>
            </div>
        );
    }
}

TimeLine.propTypes = {
    timeLineReducer: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    detailId: React.PropTypes.string,
    listType: React.PropTypes.string,
    onWillLoad: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        timeLineReducer: state.timeLineReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWillLoad: () => {
            dispatch(clearTimeLineList());
        },
        onLoad: (id, listType) => {
            dispatch(getTimeLine(id, listType));
        }
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(TimeLine);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Filters.scss';
import { toggleFilters, changeFilterValue} from '../../actions/filtersActions';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import classNames from 'classnames';

class Filters  extends Component {
    componentWillReceiveProps(newProps) {
        if ((newProps.filtersReducer !== this.props.filtersReducer) && (newProps.filtersReducer.filterValues !== this.props.filtersReducer.filterValues)) {
            this.props.callBack(newProps.filtersReducer.filterValues);
        }
    }

    render() {
        const {filtersReducer, onToggleFiltersClick, onFiltersChange, filters} = this.props;

        const filterButton = classNames({
            'toggled': filtersReducer.showFilters,
            'filters-toggle-button': true
        });

        return (
            <div className="filters">
                <button onClick={onToggleFiltersClick} className={filterButton}>
                    <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.3">
                            <g transform="translate(-99.000000, -143.000000)" fill="#000000">
                                <g transform="translate(88.000000, 132.000000)">
                                    <g transform="translate(11.000000, 11.000000)">
                                        <g>
                                            <path d="M13.9967213,11.1901869 L13.9967213,12.5869159 L13.7868852,12.5869159 C11.3245902,12.5869159 8.85901639,12.5869159 6.39672131,12.5836449 C6.24918033,12.5836449 6.17377049,12.6196262 6.10491803,12.7635514 C5.72131148,13.538785 5.09180328,13.9705607 4.21967213,13.9738318 C3.35081967,13.9771028 2.72459016,13.5518692 2.33770492,12.7864486 C2.25901639,12.6294393 2.18032787,12.5803738 2.00983607,12.5836449 C1.40983607,12.596729 0.806557377,12.5869159 0.206557377,12.5869159 L0.0327868852,12.5869159 L0.0327868852,11.1901869 L0.209836066,11.1901869 C0.832786885,11.1901869 1.4557377,11.1869159 2.07868852,11.1934579 C2.19672131,11.1934579 2.25245902,11.1640187 2.30819672,11.0495327 C2.68852459,10.2481308 3.32786885,9.8 4.21967213,9.8 C5.11147541,9.80327103 5.75081967,10.2481308 6.12786885,11.0528037 C6.17704918,11.1607477 6.23278689,11.1901869 6.3442623,11.1901869 C8.8295082,11.1869159 11.3147541,11.1869159 13.8,11.1869159 C13.8590164,11.1901869 13.9180328,11.1901869 13.9967213,11.1901869 Z M4.9147541,11.8771028 C4.91147541,11.4976636 4.59344262,11.1869159 4.20983607,11.1901869 C3.8295082,11.1934579 3.51147541,11.5107477 3.5147541,11.8901869 C3.51803279,12.2696262 3.83606557,12.5869159 4.21311475,12.5869159 C4.6,12.5836449 4.91803279,12.2630841 4.9147541,11.8771028 Z"/>
                                            <path d="M13.9934426,2.81635514 L12.0622951,2.81635514 C10.3901639,2.81635514 8.71803279,2.81635514 7.04918033,2.81308411 C6.92786885,2.81308411 6.87213115,2.85233645 6.81967213,2.96028037 C6.43606557,3.76168224 5.79672131,4.20981308 4.90491803,4.20654206 C4.01311475,4.20327103 3.37704918,3.75186916 3,2.94719626 C2.95409836,2.84579439 2.90491803,2.81308411 2.79672131,2.81308411 C1.93770492,2.81635514 1.08196721,2.81635514 0.22295082,2.81635514 L0.0327868852,2.81635514 L0.0327868852,1.41635514 L0.206557377,1.41635514 C1.06885246,1.41635514 1.93114754,1.41308411 2.79672131,1.41962617 C2.90491803,1.41962617 2.95737705,1.39018692 3.00327869,1.28878505 C3.38360656,0.480841121 4.01967213,0.0294392523 4.92459016,0.0327102804 C5.81967213,0.0359813084 6.45245902,0.487383178 6.82622951,1.28878505 C6.87540984,1.39345794 6.93114754,1.41635514 7.03606557,1.41635514 C9.2852459,1.41308411 11.5377049,1.41635514 13.7868852,1.41635514 L13.9934426,1.41635514 L13.9934426,2.81635514 Z M5.60983607,2.1228972 C5.61311475,1.73691589 5.30819672,1.42616822 4.92131148,1.41962617 C4.54098361,1.41308411 4.22295082,1.7271028 4.21967213,2.11308411 C4.21967213,2.50233645 4.52459016,2.81308411 4.90819672,2.81635514 C5.29508197,2.81635514 5.60655738,2.5088785 5.60983607,2.1228972 Z"/>
                                            <path d="M14,6.31308411 L14,7.69672897 L13.7540984,7.69672897 C12.9114754,7.69672897 12.0721311,7.7 11.2295082,7.69345794 C11.1213115,7.69345794 11.0721311,7.72616822 11.0229508,7.82757009 C10.642623,8.63551402 10.0032787,9.09018692 9.10163934,9.09018692 C8.20983607,9.08691589 7.57377049,8.63878505 7.19672131,7.83411215 C7.14098361,7.71962617 7.07868852,7.69345794 6.96393443,7.69345794 C4.72459016,7.69672897 2.4852459,7.69672897 0.245901639,7.69672897 L0.0262295082,7.69672897 L0.0262295082,6.30654206 L0.2,6.30654206 C2.4557377,6.30654206 4.71147541,6.30654206 6.96721311,6.30981308 C7.08852459,6.30981308 7.1442623,6.27383178 7.19672131,6.16588785 C7.57704918,5.36448598 8.21311475,4.91635514 9.10819672,4.91635514 C10,4.91635514 10.6360656,5.36448598 11.0163934,6.16915888 C11.0655738,6.27056075 11.1147541,6.31308411 11.2327869,6.30981308 C12.095082,6.30327103 12.957377,6.30654206 13.8229508,6.30654206 C13.8786885,6.30654206 13.9311475,6.30981308 14,6.31308411 Z M9.10819672,7.69672897 C9.50163934,7.69672897 9.80327869,7.39579439 9.80655738,7.00327103 C9.80983607,6.61401869 9.50163934,6.30981308 9.11147541,6.30654206 C8.72131148,6.30654206 8.41311475,6.61074766 8.41311475,7 C8.41311475,7.38925234 8.72131148,7.69672897 9.10819672,7.69672897 Z"/>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span>Filters</span>
                </button>
                {filtersReducer.showFilters && <div className="selects">
                    {filters.map((filter) => {
                        return (
                            <Select
                                key={filter.name}
                                name={filter.name}
                                options={filter.options}
                                onChange={(e) => {onFiltersChange({[filter.name]: e.value});}}
                                value={filtersReducer.filterValues[filter.name]}
                                searchable={false}
                                clearable={false}
                                placeholder={filter.title}
                            />

                        );
                    })}
                </div>}
            </div>
        );
    }
}

Filters.propTypes = {
    filtersReducer: React.PropTypes.object,
    filters: React.PropTypes.array,
    onToggleFiltersClick: React.PropTypes.func,
    onFiltersChange: React.PropTypes.func,
    callBack: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filtersReducer: state.filtersReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleFiltersClick: () => {
            dispatch(toggleFilters());
        },
        onFiltersChange: (data) => {
            dispatch(changeFilterValue(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

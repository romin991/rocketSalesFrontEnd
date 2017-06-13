import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SubscriptionPlanForm extends Component {
    render() {
        return (
            <div className="innersBlock">
                <div className="leftInnerBlock">
                    <div className="firstLine">
                        Paket iuran <span>Tahunan</span>
                    </div>
                    <div className="secondLine">Rp. 100.000,-</div>
                    <div className="thirdLine">Per User - Per Bulan</div>
                    <div className="fourLine">Harga Promo</div>
                    <div className="fiveLine">Rp. 55.000,-</div>
                    <div className="circle">
                        <Field name="subscriptionPlan" component="input" type="radio" value="660000"/>
                    </div>
                </div>
                <div className="rightInnerBlock">
                    <div className="firstLine">
                        Paket iuran <span>Bulanan</span>
                    </div>
                    <div className="secondLine">Rp. 125.000,-</div>
                    <div className="thirdLine">Per User - Per Bulan</div>
                    <div className="fourLine">Harga Promo</div>
                    <div className="fiveLine">Rp. 75.000,-</div>
                    <div className="circle">
                        <Field name="subscriptionPlan" component="input" type="radio" value="75000"/>
                    </div>
                </div>
            </div>
        );
    }
}

SubscriptionPlanForm.propTypes = {};

SubscriptionPlanForm = reduxForm({
    form: 'subscriptionPlanForm'
})(SubscriptionPlanForm);

export default SubscriptionPlanForm;

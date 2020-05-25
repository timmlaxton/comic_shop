import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {

    state = {
        showPaypal: false
    }

    componentDidMount() {
        const paypalBtn = document.querySelector('.paypal-button')
        console.log('paypal btn', paypalBtn)
    }


    onPaypalClick = () => {
        console.log('on paypad')
    }

    showPaypal = () => {
        this.setState({
            showPaypal: true
        })

        this.props.checkStock()
    }

    render() {
        const onSuccess = (payment) => {
            //console.log(JSON.stringify(payment));     

            this.props.onSuccess(payment)
            
            //{"paid":true,
            //"cancelled":false,
            //"payerID":"UY6SA44JSLD9C",
            //"paymentID":"PAYID-L2OBJAI4P118763K96993245",
            //"paymentToken":"EC-06980915JD6490325",
            //"returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2OBJAI4P118763K96993245&token=EC-06980915JD6490325&PayerID=UY6SA44JSLD9C",
            //"address":{
            //"recipient_name":"John Doe",
             //"line1":"WOLVERHAMPTON QUEENS SQ",
             //"city":"LEICESTER","state":"LEICESTERSHIRE",
            //"postal_code":"LE87 2BB","country_code":"GB"},
             //"email":"sb-ed447n1502315@business.example.com"}





        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data))
        }

        const onError = (err) => {
            console.log(JSON.stringify(err))
        }

        var env = 'sandbox';
        var currency = 'GBP';
        var total = this.props.toPay;

        const client = {
         sandbox:'AQ2A_QemxBJ_6VjiQuSiOCtoqfjwdLGZusiAWWTNBAHNrxC9PVjALgOlHEpHA9Qn8pbQSrDbOwD25OTc',
            //production: 
        }



        return (
            <div>
                {this.state.showPaypal ? (
                    <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size:'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                
                />
                ) : (
                    <button onClick={this.showPaypal}>Continue</button>
                )}
            </div>
        );
    }
}

export default Paypal;
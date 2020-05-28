import React, { Component } from 'react'
import axios from 'axios'
import UserLayout from '../../../hoc/user';
   

class Receivedorders extends Component {

    state = {
        standing: []
    }
    
    componentDidMount() {
        axios.get('/api/users/standing_order')
        .then(res => {
            const standing = res.data;
            this.setState({ standing});
        })
    }

        

    render() {
        return (
            <UserLayout> 
            <h1>Recevied Orders</h1>
                <div className="user_nfo_panel">
                <table>
                    <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Postcode</th>    
                            <th>Phone</th>    
                            <th>Email</th>    
                            <th>Order</th>  
                    </tr>
                    
                    {this.state.standing.map(standing => 
                        <tr> 
                            <td> {standing.name}</td>
                            <td> {standing.surname}</td>
                            <td> {standing.address}</td>
                            <td> {standing.city}</td>
                            <td> {standing.postcode}</td>
                            <td> {standing.phone}</td>
                            <td> {standing.email}</td>
                            <td> {standing.order}</td>
                        </tr>
                    )}
                    </table>
                    </div>
                    </UserLayout>
                          
         );
    }
}

export default Receivedorders
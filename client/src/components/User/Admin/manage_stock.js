import React, {useState, useEffect} from 'react';
import moment from 'moment'
import UserLayout from '../../../hoc/user';
import axios from 'axios'
import { PRODUCT_SERVER}  from '../../utils/misc';


const STATUS = {
    IDLE: 'idle',
    SUCCESS: 'success',
    PENDING: 'pending',
    ERROR: 'error'
}

const Managestock = (props) => {
    const [products, setProducts] = useState([])
    const [productsStatus, setProductsStatus] = useState(STATUS.IDLE)
    const [page, setPage] = useState(1)
    const [showOutOfStock, setShowOutOfStock] = useState(false)

    const _fetchProducts = async (page, showOutOfStock) => {
        try {
            setProductsStatus(STATUS.PENDING)
            const response = await axios.get(`${PRODUCT_SERVER}?page=${page}&outOfStockOnly=${showOutOfStock ? 1 : 0}`)
            if (page === 1) {
                setProducts(response.data.docs)
            } else {
                setProducts(products => [...products, ...response.data.docs])
            }
            setProductsStatus(STATUS.SUCCESS)
        } catch (error) {
            console.error(error)
            setProductsStatus(STATUS.ERROR)
        }
    }

    useEffect(() => {
        _fetchProducts(page, showOutOfStock)
    }, [page, showOutOfStock])
    console.log('props in manage stock', props)
    const renderBlocks = (products) => (

        products.length ?
        products.map((product,i)=> {
            return (
                <tr key={i} className={`${product.amount < 1 ? 'out-of-stock' : ''}`}>
                <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
                <td> {product.name}</td>
                <td>{product.amount}</td>
                <td>{product.sold}</td>
                <td>£ {product.price}</td>       
               
    
                </tr>
            )
        })

        :null
    )

    const _loadMore = e => {
        e.preventDefault()
        setPage(page => page + 1)
    }

    const _onToggleOutOfStock = e => {
        const newValue = !showOutOfStock
        setShowOutOfStock(newValue)
    }
    
    return (
        <UserLayout>
            <h1>Stock</h1>
                <div className="user_nfo_panel">
                    <label>Show out of stock only</label>
                    <input type="checkbox" checked={showOutOfStock} onChange={_onToggleOutOfStock} />
                <table>
                    <thead>
                        <tr>
                            <th>Purchase date</th>
                            <th>Name</th>
                            <th>Stock Amount</th>
                            <th>Sold</th>
                            <th>Price</th>                           
                        </tr>
                    </thead>
                    <tbody>
                        {renderBlocks(products)}
                    </tbody>
                </table>              
                <button onClick={_loadMore}>Load more</button>
            </div>
    </UserLayout>
    );
};

export default Managestock;
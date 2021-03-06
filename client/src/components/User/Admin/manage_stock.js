import React, {useState, useEffect, useMemo} from 'react';
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
    const [selectedDate, setSelectedDate] = useState('')
    const {totalSold, totalSales} = useMemo(() => products.reduce((acc, {sold, price}) => {
        acc.totalSold += sold
        acc.totalSales += (sold * price)
        return acc
    }, {
        totalSold: 0,
        totalSales: 0
    }), [products])

    console.log('totals', totalSold, totalSales)

    const _fetchProducts = async (page, showOutOfStock, selectedDate) => {
        try {
            setProductsStatus(STATUS.PENDING)
           /* const response = await axios.get(`${PRODUCT_SERVER}?page=${page}&outOfStockOnly=${showOutOfStock ? 1 : 0}&selectedDate=${moment(selectedDate).format('hh:mm A')}`, {*/
            const response = await axios.get(`${PRODUCT_SERVER}`, {
                params: {
                    page,
                    outOfStockOnly: showOutOfStock ? 1 : 0,
                    ...selectedDate && {selectedDate: selectedDate}
                }
            })
            const data = response.data.docs.map(product => {
                product.formattedDateOfPurchase = moment(product.createdAt).format("MM-DD-YYYY")
                return product
            })
            if (page === 1) {
                setProducts(data)
            } else {
                setProducts(products => [...products, ...data])
            }
            setProductsStatus(STATUS.SUCCESS)
        } catch (error) {
            console.error(error)
            setProductsStatus(STATUS.ERROR)
        }
    }

    useEffect(() => {
        _fetchProducts(page, showOutOfStock, selectedDate)
    }, [page, showOutOfStock, selectedDate])
    console.log('props in manage stock', props)
    const renderBlocks = (products) => (

        products.length ?
        products.map((product,i)=> {
            return (
                <tr key={i} className={`${product.amount < 1 ? 'out-of-stock' : ''}`}>
                <td><a onClick={() => setSelectedDate(product.createdAt)}>{product.formattedDateOfPurchase}</a></td>
                <td> {product.name}</td>
                <td>{product.amount}</td>
                <td>{product.sold}</td>
                <td style={{width: '55px'}}>{`£ ${product.price}`}</td>
                <td>£ {(product.sold) * product.price}</td>       
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
                    {selectedDate ? (<p>Filtering by date {moment(selectedDate).format('MM-DD-YYYY')}</p>) : null}
                <table>
                    <thead>
                        <tr>
                            <th>Purchase date</th>
                            <th>Name</th>
                            <th>Stock Amount</th>
                            <th>Sold</th>
                            <th>Price</th>
                            <th>Sold Total</th>    
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
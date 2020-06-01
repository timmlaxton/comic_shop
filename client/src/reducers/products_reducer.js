 import {
    GET_NEW_ARRIVALS,
    GET_BACK_ISSUES,
    GET_TRADES,
    GET_CHARACTERS,
    ADD_CHARACTER,
    DELETE_CHARACTER,
    GET_PUBLISHERS,
    ADD_PUBLISHER,
    GET_CATERGORYS,
    ADD_CATERGORY,
    GET_TITLES,
    GET_SHIRTS,
    ADD_SHIRT,
    GET_PRODUCTS_TO_COMICS,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,  
    EDIT_PRODUCT_DETAIL

    


} from '../actions/types';
import {sortBy} from 'lodash-es'



export default function(state={},action){
    switch(action.type){
        case GET_NEW_ARRIVALS:
            return {...state, byArrival: action.payload}
        case GET_BACK_ISSUES:
            return {...state, byBackIssue: action.payload}
        case GET_TRADES:
            return {...state, byTrades: action.payload}
        case GET_CHARACTERS:
            return {...state, characters: sortBy(action.payload, ['name'])}
        case ADD_CHARACTER:
            return {...state, addCharacter: action.payload.success , 
                            characters: sortBy(action.payload.characters, ['name'])}
        case DELETE_CHARACTER:
            return {...state, characters: state.characters.filter(item => item.name != action.payload)}
        case GET_PUBLISHERS:
            return {...state, publishers: action.payload}
        case GET_CATERGORYS:
                return {...state, catergorys: action.payload}
        case ADD_CATERGORY:
                return {...state, addCatergory: action.payload.success , 
                        catergorys: action.payload.catergorys}
        case GET_TITLES:
                return {...state, titles: action.payload}
        case GET_SHIRTS:
                return {...state, catergorys: action.payload}
        case ADD_SHIRT:
                return {...state, addCatergory: action.payload.success , 
                        catergorys: action.payload.catergorys}
        case GET_PRODUCTS_TO_COMICS:
            return {...state,
                    toShop: action.payload.articles,
                    toShopSize: action.payload.size
                }
        
        case ADD_PRODUCT: 
            return {...state, addProduct: action.payload}
        case DELETE_PRODUCT:
            return {...state, deleteProduct: action.payload}
        case CLEAR_PRODUCT:
            return {...state,addProduct: action.payload}
        case ADD_PUBLISHER: 
            return {...state, addPublisher: action.payload,
                    publisher:action.payload.publihers}
        case GET_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        case CLEAR_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        case EDIT_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
           
            
        default:
             return state;

    }
}
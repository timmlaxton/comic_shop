import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Form/formActions';
import FileUpload from '../../utils/Form/fileupload';
import axios from 'axios'
import {connect} from 'react-redux'
import {getCharacters, getPublishers, getCatergorys, editProduct, clearProduct, getTitles } from '../../../actions/products_actions'
import { PRODUCT_SERVER}  from '../../utils/misc'
class EditProduct extends Component {


    state={
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product title',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter title'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            title: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product title ',
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter title '
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config:{
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config:{
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            character: {
                element: 'select',
                value: '',
                config:{
                    label: 'Product Character',
                    name: 'character_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            catergory: {
                element: 'select',
                value: '',
                config:{
                    label: 'Product Catergory',
                    name: 'catergory_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            amount: {
                element: 'input',
                value: '',
                config:{
                    label: 'Amount',
                    name: 'amount_input',
                    type: 'number',
                    placeholder: 'Enter number of stock'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true

            
            },
            issue: {
                element: 'input',
                value: '',
                config:{
                    label: 'Issue number',
                    name: 'issue_input',
                    type: 'number',
                    placeholder: 'Enter issue number'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true

            },
           
            available: {
                element: 'select',
                value: '',
                config:{
                    label: 'Available, in stock',
                    name: 'available_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publisher: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publisher',
                    name: 'publisher_input',
                    options:[]
                    
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config:{
                    label: 'Publish',
                    name: 'publish_input',
                    options:[
                        {key:true,value:'Public'},
                        {key:false,value:'Hidden'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
          
            images:{
                value:[],
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: false
            }
        }
    }

    updateFields = (newFormData) => {
        this.setState({
            formdata: newFormData
        })
    }


    
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'o');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formdata,'o');

        this.setState({
            formdata: newFormData,
            formSuccess:true
        });
        setTimeout(()=>{
            this.setState({
                formSuccess: false
            },()=>{
                this.props.dispatch(clearProduct())
            }) 
        },3000)
    }
    

    submitForm= (event) =>{
        event.preventDefault();
        
        var dataToSubmit = generateData(this.state.formdata,'o');
        var formIsValid = isFormValid(this.state.formdata,'o')

        if(formIsValid){
            this.props.dispatch(editProduct(this.props.match.params.id, dataToSubmit)).then(()=> alert("update success")).catch(()=> this.setState({formError: true}))
        } else {
            this.setState({
                formError: true
            })
        }
    }
    

    componentDidMount(){
        this.fetchProduct(this.props.match.params.id)

        this.props.dispatch(getCharacters()).then( response => {
            const formdata =  this.state.formdata;
            const newFormData = populateOptionFields(formdata,this.props.products.characters, 'character');            
            this.updateFields(newFormData)
            
            
        })

        this.props.dispatch(getTitles()).then( response => {
            const formdata =  this.state.formdata;
            const newFormData = populateOptionFields(formdata,this.props.products.titles, 'title');            
            this.updateFields(newFormData)
            
            
        })

        this.props.dispatch(getPublishers()).then( response => {
            const formdata =  this.state.formdata;
            const newFormData = populateOptionFields(formdata,this.props.products.publishers, 'publisher');            
            this.updateFields(newFormData)          
        })

        this.props.dispatch(getCatergorys()).then( response => {
            const formdata =  this.state.formdata;
            const newFormData = populateOptionFields(formdata,this.props.products.catergorys, 'catergory');            
            this.updateFields(newFormData)               
        })
    }

    fetchProduct = async (id) => {
        console.log('in fetch product', id)
        try {
            const response = await axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}`)
            console.log('resposne', response)
            const formdata = JSON.parse(JSON.stringify(this.state.formdata))
            // formdata.Titles = formdata.name
            // formdata.amount = formdata.stock

            for (const [key, value] of Object.entries(response.data[0])) {
                console.log('in loop', key, value)
                if (formdata[key] ) {
                    formdata[key].value = value._id || value
                    formdata[key].valid = !!value
                }
            }
           
            this.setState({
                formdata
            })
        } catch (error) {
            console.error(error)
        }
    }

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formdata:  newFormData
        })
    }

    deleteProduct = async (e) => {
        e.preventDefault()
        const product_id = this.props.match.params.id
        try {
            const response = await axios.delete(`${PRODUCT_SERVER}/articles/${product_id}`)
            console.log('response delete', response)
            this.props.history.goBack()
        } catch (error) {
            // Add error handling
            console.error(error)
        }
    }

    
   

    render() {
        
        return (
            <UserLayout>
               <div>
                   <h1>Edit products</h1>

                   <form>

                  
                   

                   <FileUpload
                            imagesHandler={(images)=> this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                   
                   <FormField
                       id={'name'}
                       formdata={this.state.formdata.name}
                       change={(element)=> this.updateForm(element)}
                     />

                        <FormField
                       id={'title'}
                       formdata={this.state.formdata.title}
                       change={(element)=> this.updateForm(element)}
                     />


                    <FormField
                       id={'description'}
                       formdata={this.state.formdata.description}
                       change={(element)=> this.updateForm(element)}
                     />

                     <FormField
                       id={'price'}
                       formdata={this.state.formdata.price}
                       change={(element)=> this.updateForm(element)}
                     />

                     <div className="form_devider"></div>

                     <FormField
                       id={'character'}
                       formdata={this.state.formdata.character}
                       change={(element)=> this.updateForm(element)}
                     />

                    <FormField
                       id={'amount'}
                       formdata={this.state.formdata.amount}
                       change={(element)=> this.updateForm(element)}
                     />

                    <FormField
                       id={'issue'}
                       formdata={this.state.formdata.issue}
                       change={(element)=> this.updateForm(element)}
                     />

                    
                   

                    <FormField
                       id={'available'}
                       formdata={this.state.formdata.available}
                       change={(element)=> this.updateForm(element)}
                     />

                    

                    <div className="form_devider"></div>

                    <FormField
                       id={'publisher'}
                       formdata={this.state.formdata.publisher}
                       change={(element)=> this.updateForm(element)}
                     />

                      <FormField
                       id={'catergory'}
                       formdata={this.state.formdata.catergory}
                       change={(element)=> this.updateForm(element)}
                     />

                

                    <FormField
                       id={'publish'}
                       formdata={this.state.formdata.publish}
                       change={(element)=> this.updateForm(element)}
                     /> 

                    {this.state.formSuccess ?
                        <div className="form_success">
                                Success
                            </div>
                        :null}

                        {this.state.formError ?
                            <div className="error_label">
                                Nope
                            </div>
                            : null}

                        <div> 
                        <button onClick={(event) => this.submitForm(event)}>
                            Edit product
                        </button>
                        </div> 

                        <div> 
                            <button onClick={this.deleteProduct}>
                        Delete product
                        </button>
                        </div> 
                   </form>
               </div>


            </UserLayout>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(EditProduct);
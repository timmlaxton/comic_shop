import React, { Component } from "react";
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../../utils/Form/formActions";

import { connect } from "react-redux";
import {
  getCharacters,
  addCharacter,
  deleteCharacter,
} from "../../../actions/products_actions";

class ManageCharacters extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  deleteCharacter = ({name}) => {
    this.props.dispatch(deleteCharacter(name))
  }

  showCatergoryItems = () => {
    /*let arrayData = [];
    if (this.props.products.characters) {
      this.props.products.characters.map((item, i) => {
        arrayData = arrayData.concat(item.name);
      });
    }*/
    // const arrayData = this.props.products.characters.map(item => item.name)

    return this.props.products.characters?.map((item, i) => (
        <a
          onClick={() => this.deleteCharacter(item)}
          className="category_item"
          key={i}
        >
          {item.name}
        </a>
    ))
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "characters");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, "characters");

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    var dataToSubmit = generateData(this.state.formdata, "characters");
    var formIsValid = isFormValid(this.state.formdata, "characters");
    var existigCharacters = this.props.products.characters;

    if (formIsValid) {
      this.props
        .dispatch(addCharacter(dataToSubmit, existigCharacters))
        .then((response) => {
          if (response.payload.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({ formError: true });
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getCharacters());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Characters</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="characters_container">
              {this.showCatergoryItems()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check data</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                Add character
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ManageCharacters);

import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { actions } from "../../redux/Action";
import Icon from "../utilities/Icon";

import "../../styles/homePage/searchSection.css";

export class Autocomplete extends Component {

  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
  };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
  };

  searchClick = () => {
    let reset = []
    this.props.setResultDb(reset)
    const location = {
      pathname: `/${this.props.selectedText.value}`,
      state: { db: this.props.selectedText.db, id: this.props.selectedText.id },
    };
    if (
      this.props.selectedText !== undefined &&
      this.props.selectedText.db === "search"
    ) {
      this.props.history.push(`/search/${this.props.selectedText.value}`);
    }
    if (
      this.props.selectedText !== undefined &&
      this.props.selectedText.db !== "search"
    ) {
      this.props.history.push(location);
    }
  };

  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;
    const filteredOptions = options.filter(
      (optionName) =>
        optionName.value.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
    this.props.SelectedText({
      value: userInput,
      db: "search",
      icon: "category",
    });
  };

  searchFree = (e) => {
    this.props.SelectedText({
      value: this.state.userInput,
      db: "search",
      icon: "category",
    });
    let reset = []
    this.props.setResultDb(reset)
    const location = {
      pathname: `/${this.state.userInput}`,
      state: { db: "search" },
    };
    this.props.history.push(location);
  }

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });

    this.props.SelectedText(JSON.parse(e.currentTarget.getAttribute("name")));
    let reset = []
    this.props.setResultDb(reset)
    let text = JSON.parse(e.currentTarget.getAttribute("name"))
    const location = {
      pathname: `/${text.value}`,
      state: { db: text.db, id: text.id },
    };
    this.props.history.push(location);

  };

  onKeyDown = () => {
    const { activeOption } = this.state;
    this.setState({ activeOption: activeOption + 1 });
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      searchFree,
      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active ";
              }
              return (
                <li
                  id={optionName.value + index}
                  name={JSON.stringify(optionName)}
                  className={className + " d-flex align-items pt-2 pb-2"}
                  key={optionName.value + index}
                  onClick={(e) => {
                    onClick(e, index);
                  }}

                >
                  {optionName.db === "business" ?
                    <div className="dbOptions">
                      <img alt='' className="ml-2 rounded-circle" src={optionName.icon} />
                      &nbsp;
                      {optionName.value}
                    </div>
                    :
                    <div className="dbOptions">
                      <Icon name={optionName.icon} />
                      {optionName.value}
                    </div>}‏
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options" onClick={(e) => searchFree(e)}>
            <em> {userInput} - search easy cart</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search col-md-8 col-sm-11 col-11">
          <input
            type="text"
            onChange={onChange}
            placeholder="What are you looking for?"
            onFocus={(e) => (e.currentTarget.placeholder = "")}
            onBlur={(e) =>
              (e.currentTarget.placeholder = "what are you looking for?")
            }
            className="focusCancel heightSearch borderRadiuseSearch borderNone form-control m-auto fontcss-yk16xz-control"
            onKeyDown={onKeyDown}
            value={userInput}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedText: state.business.selectedText,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    SelectedText: (text) => dispatch(actions.setSelectedText(text)),
    setResultDb: (reset) => dispatch(actions.setResultDb({ reset: reset }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Autocomplete));

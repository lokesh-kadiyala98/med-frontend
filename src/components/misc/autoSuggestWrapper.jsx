import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import '../resources/css/autosuggest.css';

class AutoSuggestWrapper extends Component {
  state = { 
    items: [],
    value: '',
    suggestions: []
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setState({ items: this.props.items })
    }
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
    
  getSuggestions = (value) => {
      const escapedValue = this.escapeRegexCharacters(value.trim());
      
      if (escapedValue === '') {
        return [];
      }
    
      const regex = new RegExp('\\b' + escapedValue, 'i');
      
      return this.state.items.filter(item => regex.test(this.getSuggestionValue(item)));        
  }
    
  getSuggestionValue = suggestion => suggestion.name
    
  renderSuggestion = (suggestion, { query }) => {
      const suggestionText = suggestion.name;
      const matches = AutosuggestHighlightMatch(suggestionText, query);
      const parts = AutosuggestHighlightParse(suggestionText, matches);
    
      return (
        <span className={'suggestion-content ' + suggestion.twitter}>
          <span className="name">
          {
              parts.map((part, index) => {
                const className = part.highlight ? 'highlight' : null;
    
                return (
                  <span className={className} key={index}>{part.text}</span>
                );
              })
          }
          </span>
        </span>
      )
  }
    
  onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
          suggestions: this.getSuggestions(value)
      });
  };

  onSuggestionsClearRequested = () => {
      this.setState({
          suggestions: []
      });
  };

  onChange = (event, { newValue, method }) => {
    this.props.onChange(newValue)
    this.setState({
      value: newValue
    });
  };

  render() { 
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Enter Symptoms...",
      value,
      onChange: this.onChange
    }
    
    return ( 
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} 
      /> 
    );
  }
}

export default AutoSuggestWrapper;
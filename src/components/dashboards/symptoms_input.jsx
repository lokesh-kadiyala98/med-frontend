import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import axios from 'axios';
import '../resources/css/autosuggest.css';

class SymptomsInput extends Component {
    state = { 
        symptoms: [],
        value: '',
        suggestions: []
    }

    async componentDidMount() {
        const {data} = await axios({
            method: 'get',
            url: "http://localhost:5000/disease_symptoms/get_unique_symptoms",
        })
                
        var symptomsObj = []
        data.forEach((item) => {
            var obj = { name: item }
            symptomsObj.push(obj)
        })
        this.setState({symptoms: symptomsObj})
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
        
        return this.state.symptoms.filter(symptom => regex.test(this.getSuggestionValue(symptom)));        
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

    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
    };
      
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

    render() { 
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Enter Symptoms...",
            value,
            onChange: this.onChange
        };

        return (  
            <div className="input-group mb-3">
                <Autosuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} 
                />
                {/* <input className="form-control" type="text" ref="symptom" placeholder="Enter Symptoms..." /> */}
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onClick(this.state.value)} type="button">Diagnose</button>
                </div>
            </div>
        );
    }
}
 
export default SymptomsInput;
import React, { Component } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import config from '../../../config.json'
import AutoSuggestInput from './../../misc/autoSuggestInput';

class StateStats extends Component {
    state = { 
        name: '', 
        cases: 0,
        cured: 0,
        deceased: 0,
        loading: true
    }

    handleSubmit = async (value) => {
        if( value !== this.state.name ) {
            this.setState({ name: value, loading: true })
            try {
                var { data } = await axios({
                    method: 'get',
                    url: config.apiEndpoint + '/corona_stats/state_data',
                    params: {
                        state: value
                    }
                })
                this.setState({ name: value, cases: data.cases, cured: data.cured, deceased: data.deceased, loading: false })

            } catch(ex) {
                if(ex.response.status === 404) {
                    toast.error(ex.response.data.message)
                } else {
                    toast.error('Unexpected error: Reported to developer')
                }
            }
        }
    }

    render() { 
        
        const { loading, name, cases, cured, deceased } = this.state

        const casesWithOutcome = cured + deceased

        const deathCasesPercentage = Math.floor(deceased / casesWithOutcome * 100)
        const recoveredCasesPercentage = Math.ceil(cured / casesWithOutcome * 100)

        return ( 
            <div className='mt-2' style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block'}}>
                    <AutoSuggestInput onClick={this.handleSubmit} url="/corona_stats/unique_states" placeholder='Enter State...' />

                    {loading ? 
                        <div className="mt-3 mb-5 spinner-grow text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> 
                        :
                        <React.Fragment>
                            <h2 className="mb-0" style={{color: '#555'}}>{name} Cases:</h2>
                            <h1 className='font-weight-bold mb-3' style={{color: '#aaa',}}>{cases}</h1>
                                    
                            <h2 className="mb-0" style={{color: '#555'}}>Recovered:</h2>
                            <div className='mb-3'>
                                <span className='font-weight-bold h1' style={{color: '#8ACA2B',}}>{cured}
                                    <span className="h5"> ({recoveredCasesPercentage}%)</span>
                                </span>
                            </div>
                                    
                            <h2 className="mb-0" style={{color: '#555'}}>Deaths:</h2>
                            <div className='mb-3'>
                                <span className='font-weight-bold h1' style={{color: '#696969',}}>{deceased}
                                    <span className="h5"> ({deathCasesPercentage}%)</span>
                                </span>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
         );
    }
}
 
export default StateStats;

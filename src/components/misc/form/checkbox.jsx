import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from './../card';

const CheckBox = ({ name, label, options, error, onChange }) => {
    return ( 
        <div className='mb-3 radio-container'>
            <span className='pl-3'>{label}</span>
            <Row className='no-gutters'>
                {options.map((option, index) => 
                    <Col key={option[0]._id} lg={3} md={4} xs={6}>
                        <li>
                            <input type='checkbox' value={option[0].value} onChange={onChange} name={name} id={option[0]._id} />
                            <label htmlFor={option[0]._id}>
                                <Card img={option[0].img} cardTitle={option[0].cardTitle} cardBody={option[0].cardBody} />
                            </label>
                        </li>
                    </Col>)   
                }
            </Row>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default CheckBox;
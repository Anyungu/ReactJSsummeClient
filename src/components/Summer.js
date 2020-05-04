import React , {useState} from 'react';
import { MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBBtn,
    MDBInput,
    MDBCard,
    MDBCardBody,
 } from "mdbreact";
 import axios from 'axios';

 


function Summer(props) {

   const [form, setForm] = useState('post');
   const [buttonText, setButtonText] = useState('SUBMIT');
   const [postMetric, setPostMetric] = useState('');
   const [postValue, setPostValue] = useState('');
   const [postStatusMessage, setPostStatusMessage] = useState('');
   const [getStatusMessage, setGetStatusMessage] = useState('');
   const [getMetric, setGetMetric] = useState('');


   const onInputs = (event) => {

        if (event.target.id === 'keyMetric') {
            setPostMetric(event.target.value)
            setGetStatusMessage('')
            setPostStatusMessage('')
        }

        if (event.target.id === 'keyValue') {
            setPostValue(event.target.value)
            setGetStatusMessage('')
            setPostStatusMessage('')
        }

        if (event.target.id === 'getKeyMetric') {
            setGetMetric(event.target.value)
            setGetStatusMessage('')
            setPostStatusMessage('')
        }
 
   }


   const showPostStatusMessage = () => {

        if (postStatusMessage !== '') {

            return(
                <MDBRow  className="text-center" center>
                {postStatusMessage}
                </MDBRow>
            );

        }
   }


   const showGetStatusMessage = () => {

    if (getStatusMessage !== '') {

        return(
            <MDBRow className="text-center" center>
            {getStatusMessage}
            </MDBRow>
        );

    }
}



   const postValueFunction = () => {

    if (postMetric === '' || postValue === '') {
        setPostStatusMessage('Kindly Fill all the values');
        return;
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      };


        axios.post(`https://glacial-everglades-13629.herokuapp.com/metric/${postMetric}`,
                    {
                        value: postValue
                    },
                    axiosConfig
                ).then(response => {

                        setPostStatusMessage(response.data.error || response.data.message);
                        setPostMetric('');
                        setPostValue('');
                    

                }).catch(error => {
             
                    setPostStatusMessage(error.message);
                    setPostMetric('');
                    setPostValue('');
                })
            
        
   }


   const getValueFunction = () => {

    if (getMetric === '' ) {
        setGetStatusMessage('Kindly Fill the metric key input');
        return;
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      };


        axios.get(`https://glacial-everglades-13629.herokuapp.com/metric/${getMetric}/sum`,
                 
                    axiosConfig
                ).then(response => {


                        setGetStatusMessage(response.data.error || response.data.data);
                        setGetMetric('');
                     
                    

                }).catch(error => {
             
                    setGetStatusMessage(error.message);
                    setGetMetric('')
                })
            
        
   }

   const formSelector = (value, valueText) => {
    
        setForm(value);
        setButtonText(valueText);
        setGetStatusMessage('')
        setPostStatusMessage('')
   }

   const whichForm = () => {
       if (form === 'post') {
            return(

                    <MDBRow center>
                    <MDBCol md="10">
                    <MDBCard>
                        
                        <MDBCardBody>
                            <MDBRow>
                            <MDBCol md="10">
                    
                        
                            <div className="grey-text">
                                <MDBInput
                                    label="Metric"
                                    icon="key"
                                    group
                                    type="text"
                                    validate
                                    value= {postMetric}
                                    id = "keyMetric"
                                    onInput = {onInputs}
                                />
                                <MDBInput
                                    label="Value"
                                    icon="check"
                                    group
                                    type="number"
                                    validate
                                    value = {postValue}
                                    id = "keyValue"
                                    onInput = {onInputs}
                                    
                                />

                            </div>
                
                        </MDBCol>


                        </MDBRow>

                            {showPostStatusMessage()}

                        
                            <div className="text-right py-4">
                                <MDBBtn gradient="aqua" type="submit" onClick = {() => postValueFunction()} >
                                    {buttonText}
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    
                    </MDBCard>
                    
                    </MDBCol>


                </MDBRow>
            );
       }else {
           return(

            <MDBRow center>
            <MDBCol md="10">
            <MDBCard>
                
                <MDBCardBody>
                    <MDBRow>
                    <MDBCol md="10">
             
                  
                    <div className="grey-text">
                        <MDBInput
                            label="Metric"
                            icon="key"
                            group
                            type="text"
                            validate
                            value= {getMetric}
                            id = "getKeyMetric"
                            onInput = {onInputs}
                        />
                   
                    </div>
        
                </MDBCol>

                   
                </MDBRow>

                    {showGetStatusMessage()}
                
                    <div className="text-right py-4">
                        <MDBBtn gradient="aqua" type="submit" onClick={()=> {getValueFunction()}} >
                            {buttonText}
                        </MDBBtn>
                    </div>
                </MDBCardBody>
            
            </MDBCard>
            
            </MDBCol>


        </MDBRow>
           );
       }
   }


    return(

        <MDBContainer>
            <MDBRow className = "mt-5 mb-5" around>
                <MDBBtn gradient="peach" onClick = {() => formSelector('post', 'SUBMIT') }>Add Values</MDBBtn>
                <MDBBtn gradient="purple" onClick = {() => formSelector('get', 'FETCH')}>See Totals</MDBBtn>
              
            </MDBRow>

            {whichForm()}

        </MDBContainer>
        
    );
}




export default Summer;
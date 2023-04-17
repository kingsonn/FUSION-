import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';
import { getHappyFoodItems,getSadFoodItems, getNeutralFoodItems, getSusFoodItems } from "../../utils/firebaseFunctions";
import RowContainer from '../RowContainer';
import { mapExpressionToEmoji } from '../../helpers/emojis';

import './Results.css';

const Results = ({ results, processing }) => {
  const [happy, setHappy] = useState();
  const [sad, setSad] = useState();
  const [neutral, setNeutral] = useState();
  const [sus, setSus] = useState();

  const fetchHData = async () => {
    await getHappyFoodItems().then((data) => {
        // console.log(data)
        setHappy(data)
   });
  };
  const fetchSData = async () => {
    await getSadFoodItems().then((data) => {
        // console.log(data)
        setSad(data)
   });
  };
  const fetchNData = async () => {
    await getNeutralFoodItems().then((data) => {
        // console.log(data)
        setNeutral(data)
   });
  };
  const fetchsData = async () => {
    await getSusFoodItems().then((data) => {
        // console.log(data)
        setSus(data)
   });
  };
  useEffect(() => {
    fetchHData();
    fetchSData();
    fetchsData();
    fetchNData();
  }, []);
  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    if(results[0].expressions.asSortedArray()[0].expression=="happy"){
      console.log(happy)
    return (

     
          <div className="results__wrapper">
            <div>
              <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>
              <p>Recommendations for you🥰👇	</p>
             
              <RowContainer
            flag={false}
            data={happy}
          />
            </div>
         
          </div>
       
      
    );
  }
    if(results[0].expressions.asSortedArray()[0].expression=="sad"){
      return (

     
        <div className="results__wrapper">
          <div>
            <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>
            <p>Recommendations for you🥰👇	</p>
           
            <RowContainer
          flag={false}
          data={sad}
        />
          </div>
       
        </div>
      
    );
  }
    if(results[0].expressions.asSortedArray()[0].expression=="neutral"){
      return (

     
        <div className="results__wrapper">
          <div>
            <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>
            <p>Recommendations for you🥰👇	</p>
           
            <RowContainer
          flag={false}
          data={neutral}
        />
          </div>
       
        </div>
      
    );
  }
    if(results[0].expressions.asSortedArray()[0].expression!="happy" && results[0].expressions.asSortedArray()[0].expression!="sad" && results[0].expressions.asSortedArray()[0].expression!="neutral"){
      return (

     
        <div className="results__wrapper">
          <div>
            <p>What's that face you're making?🧐</p>
            <p>Recommendations for you🥰👇</p>
           
            <RowContainer
          flag={false}
          data={sus}
        />
          </div>
       
        </div>
      
    );
  }
  else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
  } else {
    return (
      <div className="results m-3 text-center">
        ⚠️Click the picture with your full face in the frame under good lighting.
      </div>
    );
  }
  
};

export default Results;

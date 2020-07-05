import React from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import {fetchData} from "./API/index";
import image from "./images/covid.png";

class App extends React.Component {
    //constructor is made within state in backend
    state = {
        data: {},
        country: "",
    }

    //make componentDidMount asynchronous to fetch data
    //same as useEffect
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }


    //when specific country is chosen, update the Cards
    handleCountryChange = async (country) => {
        //fetch the data
        const fetchedData = await fetchData(country);
        console.log(fetchedData);
        
        //set the state
        this.setState({data: fetchedData, country: country});
    }

    render() {
        return (
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19"/>
                <Cards data={this.state.data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={this.state.data} country={this.state.country}/>
            </div>
        )
    }
}

export default App;
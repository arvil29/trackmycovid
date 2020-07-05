import React, {useState, useEffect} from "react";
import {NativeSelect, FormControl} from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import {fetchCountries} from "../../API/index";

//take in handleCountryChange & destructure it
//just like props in classes
const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    //get all country options from API & set to array
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);

    console.log(fetchedCountries);

    //once country is chosen, goes back to App.js
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect default="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
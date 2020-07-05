import axios from "axios";

const url = "https://covid19.mathdro.id/api";

//fetch data asynchronously for Cards component
export const fetchData = async (country) => {
    let changeableUrl = url;

    //if there is a country
    //change the url to that country
    if(country) {
        changeableUrl = `${url}/countries/${country}`
        console.log(changeableUrl);
    }

    //respond to that specific country
    try {
        //get each data obj from url call
        const {data} = await axios.get(changeableUrl);

        //check json
        //retrieve specific values from data 
        //& store into modifiedData
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }
        return modifiedData;
    }
    catch(error) {
        console.log(error);
    }
}

//fetch data asynchronously for Chart component
export const fetchDailyData = async () => {
    try {
        //get each data obj from url call
        const {data} = await axios.get(`${url}/daily`);

        //check the json
        //we store each object into dailyData
        //we retrieve specific values from dailyData
        //& store into modifiedData
        const modifiedData = data.map((dailyData) => ({
            infected: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    }
    catch(error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        //this destructures data out of response we get from axios
        //we pick the country names from "countries" json title
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }
    catch(error) {
        console.log(error);
    }
}


const API_KEY = 'eVBSWXBNcVhlelVsRDBPR1puemxOV3FVS1JFUzV5RjRrM1RtcmJ6aw==';
const BASE_URL = 'https://api.countrystatecity.in/v1';

export const getCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/countries`, {
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getStates = async (countryIso2) => {
  try {
    const response = await fetch(`${BASE_URL}/countries/${countryIso2}/states`, {
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching states for country ${countryIso2}:`, error);
    throw error;
  }
};

export const getCities = async (countryIso2, stateIso2) => {
  try {
    const response = await fetch(`${BASE_URL}/countries/${countryIso2}/states/${stateIso2}/cities`, {
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching cities for state ${stateIso2} in country ${countryIso2}:`, error);
    throw error;
  }
};
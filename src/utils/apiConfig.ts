const URL_BASE = "https://restcountries.com/v3.1";

const API_CONFIG = {
  ALL: `${URL_BASE}/independent?status=true`,
  REGION: `${URL_BASE}/region`,
  NAME: `${URL_BASE}/name`,
  CODE: `${URL_BASE}/alpha`,
};

export default API_CONFIG;
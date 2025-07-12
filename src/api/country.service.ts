import API_CONFIG from "@/utils/apiConfig";
import { Country, ResponseApi } from "@/utils/types";

const countryServices = async (url: string, param?: string): Promise<ResponseApi> => {
  const URL = param ? `${url}/${param}` : API_CONFIG.ALL;

  try {
    const response = await fetch(URL);
  
    if (!response.ok) {
      const errorMessage = response.status === 404
        ? "Country not found"
        : response.status === 500
        ? "Server error"
        : "Network response was not ok";

      return {
        message: errorMessage,
        status: response.status,
        data: [],
      };
    }
  
    const data: Country[] = await response.json();
  
    return {
      message: "Success",
      status: response.status,
      data,
    }
  } catch (error) {
    return {
      message: "Unexpected error fetching data",
      status: 500,
      data: [],
    };
  } 

};

export default countryServices;
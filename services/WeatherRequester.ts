import axios, {AxiosResponse} from "axios";
import {WeatherData} from "./api";
export default async function getWeather(city: string): Promise<WeatherData | null> {
    try {
        // @ts-ignore
        const response: AxiosResponse<WeatherData> = await axios.post(`api/api`,{body:`${city}`});
        return response.data;
    } catch (error) {
        console.error("aax-",error);
        // @ts-ignore
        return {
            cityName: city,
            temperature: 0,
            windSpeed: 0,
            sunriseTime: 'N/A',
            sunsetTime: 'N/A',
            pressure: 0,
            cityImage: "",
            error :true,
            errorText : "OpenWeatherApi'ye baglanılamadı , ApiKey geçersiz veya hatalı"
        };
    }
}




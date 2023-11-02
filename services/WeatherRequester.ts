import axios, {AxiosResponse} from "axios";
import {WeatherData} from "../pages/api/city";
export default async function getWeather(city: string): Promise<WeatherData | null> {
    try {
        // @ts-ignore
        const response: AxiosResponse<WeatherData> = await axios.post(`api/city`,{body:`${city}`});
        return response.data;
    } catch (error) {
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




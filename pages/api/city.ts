import {NextApiRequest, NextApiResponse} from 'next';
import axios, {AxiosResponse} from 'axios';
// @ts-ignore
import getWeather, {UnsplashResponse, WeatherData} from "./weatherApi";
import {localTimeConverter} from "../../services/converters";

type ResponseData = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface WeatherData {
    cityName: string;
    temperature: number
    windSpeed: number;
    sunriseTime: string;
    sunsetTime: string;
    pressure: number;
    cityImage: string;
    description: string;
    iconCode: string,
    errorText:string
    error:boolean
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData[]>
) {
    console.log("gelen body-", req.body)
    try {
        const city = req.body.body;
        const response: AxiosResponse<WeatherData> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_WEATHER_KEY}&units=metric&lang=tr`);
        let cityImage = "";
        try {
            const imageResponse: AxiosResponse<UnsplashResponse> = await axios.get(`https://api.pexels.com/v1/search?query=${city} şehri`, {
                headers: {
                    // Authorization: ``,
                    Authorization: `${process.env.API_IMAGE_KEY}`,
                },
            });
            // @ts-ignore
            if (imageResponse.status === 200 && imageResponse.data.photos.length > 0) {
                // @ts-ignore
                cityImage = imageResponse.data.photos[0].src.medium || "";
            }
        } catch (imageError) {
            console.error('Error fetching image data:');
        }
        const weatherData: WeatherData = {
            // @ts-ignore
            cityName: city,
            // @ts-ignore
            temperature: response.data.main.feels_like,
            // @ts-ignore
            windSpeed: response.data.wind.speed,
            // @ts-ignore
            sunriseTime: localTimeConverter(response.data.sys.sunrise),
            // @ts-ignore
            sunsetTime: localTimeConverter(response.data.sys.sunset),
            // @ts-ignore
            pressure: response.data.main.pressure,
            // @ts-ignore
            description: `${response.data.weather[0].description}`,
            // @ts-ignore
            iconCode: `${response.data.weather[0].icon}`,
            // Include the cityImage in the response
            // @ts-ignore
            cityImage: cityImage,
        };
        if (cityImage === "") {
            weatherData.error = true;
            weatherData.errorText = "ImageApi token hatalı veya servise ulaşılamadı , arka fona resim eklenemedi.";
        }

        // @ts-ignore
        res.status(200).json(weatherData);
    } catch (error) {
        // console.error('Error fetching data:', error);
        // @ts-ignore
        res.status(500).json({error: 'Error fetching data'});
    }

}

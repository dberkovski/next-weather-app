import {NextPage} from "next";
import TurkeyMap from 'turkey-map-react';
// @ts-ignore
import {CityInfo} from "turkey-map-react";
import {Tooltip} from "antd";
import { useRef, useState} from "react";
import getWeather from "../../services/WeatherRequester";
// @ts-ignore
import type {WeatherData} from "../../services/WeatherRequester";

import {IoMdClose} from "react-icons/io";
import {FaTemperatureHigh} from "react-icons/fa";
import {LiaWindSolid} from "react-icons/lia";
import {WiSunrise, WiSunset} from "react-icons/wi";
import {TiWeatherWindy} from "react-icons/ti";

import Notification from "./Notifications";


const MainMapComponent: NextPage = () => {

    const [selectedCity, setSelectedCity] = useState('Turkey!');
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [notiBtnClicked, setnotiBtnClicked] = useState(false);

    const modalRef = useRef<HTMLDialogElement>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const openModal = async (cityName: string) => {
        setIsLoading(true)
        if (modalRef.current) {
            modalRef.current.showModal();
            setShowModal(true)
            setSelectedCity(cityName)
            const weatherDataOfSelectedCity = await getWeather(cityName)
            setWeather(weatherDataOfSelectedCity);
            weather?.error === true || weather?.error === undefined ? setShowNotification(true) : ""
            setnotiBtnClicked(false)
            setIsLoading(false)
        }
    };
    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
            setShowModal(false)
        }
    };
    const cityHover = ({name}: CityInfo) => {
        openModal(name)
    }

    return (
        <div className="bg-gray-400 p-4">
            <div className="sm:hidden">
                <Notification showModal={true} typeNoti={"info"} notiState={true} errorText={""} infoText={"Daha iyi bir görüntü için telefonu yan çevirin"} btnClicked={false} btnFunc={()=>{}}/>
            </div>
            <div className="w-full p-4 h-full ">
                <header className={"bg-gray-700 text-center text-white rounded-t-md "}>Tukey Weather App</header>
                <div className="bg-gray-300  rounded-b-md static">
                    <TurkeyMap onClick={cityHover}
                               cityWrapper={(cityComponent, cityData) => (
                                   <Tooltip
                                       title={`${cityData.plateNumber} - ${cityData.name}`}
                                       key={cityData.id}
                                   >{cityComponent}
                                   </Tooltip>
                               )}/>
                </div>
                <dialog ref={modalRef} className="modal  overflow-auto">
                    {weather?.cityImage === "" && weather.error === true ? (
                        <Notification typeNoti="danger" notiState={showNotification} errorText={weather.errorText} infoText=""
                                      btnClicked={notiBtnClicked} showModal={showModal} btnFunc={() => {
                            setnotiBtnClicked(!notiBtnClicked)
                        }}/>) : ""}
                    <div>
                        {isLoading ? (<div className="card-body bg-white rounded-full ">
                                <span className="loading loading-bars loading-lg"></span>
                            </div>) :
                            (<div className="card scale-[70%] md:scale-75 lg:scale-95 bg-base-100 shadow-xl image-full animate-fadeIn m-10 sm:m-0 ">
                                <figure>
                                    <img src={`${weather?.cityImage}`} className="w-full " alt=""/>
                                </figure>
                                <div className="card-body animate-growUpFade">
                                    <h2 className="card-title text-center bg-white opacity-80 text-gray-700 justify-center rounded-2xl p-1">
                                        <b>{selectedCity}</b></h2>
                                    <div className="card-body gird text-center content-around">
                                        <div className="flex flex-row items-center justify-center my-2 ">
                                            <FaTemperatureHigh
                                                className="scale-[150%] text-red-700 mr-4 bg-red-400 rounded-2xl p-0.5 ring ring-red-800"/>
                                            <div className="hover:font-bold">
                                                Sıcaklık: <b> {weather?.temperature} </b>°C
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center my-2">
                                            <LiaWindSolid
                                                className="scale-150 text-gray-600 mr-4 bg-white rounded-2xl p-0.5 ring ring-gray-500"/>
                                            <div
                                                className="hover:font-bold">
                                                Rüzgar Hızı: <b> {weather?.temperature}</b> m/s
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center my-2">
                                            <WiSunrise
                                                className="scale-150 text-amber-500 mr-4 bg-amber-200 rounded-2xl p-0.5 ring ring-amber-700"/>
                                            <div className="hover:font-bold">
                                                Güneşin Doğuşu : <b> {weather?.sunriseTime} </b> TSI
                                            </div>
                                        </div>
                                        {/*<p>Sunset Time: {weather.sunsetTime}</p>*/}
                                        <div className="flex flex-row items-center justify-center my-2">
                                            <WiSunset
                                                className="scale-150 text-orange-600 mr-4 bg-orange-200 rounded-2xl p-0.5 ring ring-orange-700"/>
                                            <div className="hover:font-bold">
                                                GÜneşin Batışı : <b> {weather?.sunsetTime}  </b> TSI
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center my-2">
                                            <TiWeatherWindy
                                                className="scale-150 text-blue-600 mr-4 bg-blue-200 rounded-2xl p-0.5 ring ring-blue-700"/>
                                            <div className="hover:font-bold">
                                                Basınç : <b> {weather?.pressure} hPa </b>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center my-2">
                                            <img className="bg-gray-200 ring ring-gray-400 rounded-2xl mr-4"
                                                 src={`http://openweathermap.org/img/w/${weather?.iconCode}.png`}
                                                 alt=""/>
                                            <div className="hover:font-bold">
                                                Current Situation: {weather?.description}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end">
                                        <button
                                            className="p-3 animate-growUpFade rounded-full bg-gray-600 ring-2 ring-white hover:bg-red-500"
                                            onClick={closeModal}>
                                            <IoMdClose className="text-white scale-[150%] "/>
                                        </button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    <div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default MainMapComponent

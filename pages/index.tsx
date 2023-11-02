import type { NextPage } from 'next'
import Head from 'next/head'
import MainMapComponent from "../src/components/MainMapComponent";

const Home: NextPage = () => {
    return (
        <div  className=" text-xl h-screen sm:md bg-gray-400">
            <Head>
                <title>Weather App</title>
                <meta name="description" content="Next Weather App" />
                <link rel="icon" href="/weather-icon.svg" />
            </Head>
            <MainMapComponent/>
        </div>
    )
}

export default Home

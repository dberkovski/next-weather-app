export default function kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
}
export function localTimeConverter(time: number): string {
    const formatTime: string = new Date(time * 1000).toLocaleTimeString();
    return formatTime;
}

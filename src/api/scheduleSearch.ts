export async function scheduleSearch(stationId: number) {
    const api = `http://127.0.0.1:8000/station/${stationId}/departures`;

    try {
        const response = await fetch(api);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

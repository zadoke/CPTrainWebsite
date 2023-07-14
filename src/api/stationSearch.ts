export async function stationSearch(searchQuery: string) {
    try{
        const response = await fetch(`http://127.0.0.1:8000/station/search/${searchQuery}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error){
        console.error(error);
    }
  }
  
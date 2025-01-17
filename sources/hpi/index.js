let url = 'https://www.fhfa.gov/hpi/download/monthly/hpi_master.json';

const response = await fetch(url);
const data = await response.json();


export { data };

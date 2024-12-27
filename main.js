const axios = require('axios');
const fs = require('fs');

// mockup endpoint for error simulation
const errorEndpoint403 = 'https://httpstat.us/403';
const errorEndpoint500 = 'https://httpstat.us/500';


async function fetchData(url, data)
{
    let attempt = 0;
    const maxRetries = 5;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (attempt < maxRetries)
    {
        try
        {
            // change url with errorEndpoint403 or errorEndpoint500 for simulating error
            const response = await axios.post(url, data);
            return response;
        } catch (error)
        {
            if (error.response)
            {
                // Log the error for debugging
                console.error(`Error ${error.response.status}: ${error.response.statusText}`);

                if (error.response.status === 403)
                {
                    console.error('403 Forbidden: Skipping the request');
                    break;
                }

                if (error.response.status === 500)
                {
                    attempt++;
                    const backoffTime = Math.pow(2, attempt) * 1000;
                    console.log(`500 Internal Server Error: Retrying in ${backoffTime / 1000} seconds...`);
                    await delay(backoffTime);
                    continue;
                }
            }
            throw error;
        }
    }

    throw new Error('Failed to complete the REST API request after retries');
}

(async function main()
{
    try
    {
        // Step 1: Fetch data from the GraphQL API
        const graphqlEndpoint = 'https://countries.trevorblades.com/';
        const graphqlQuery = {
            query: `query {
        countries {
          name
          capital
          currency
        }
      }`
        };

        const graphqlResponse = await axios.post(graphqlEndpoint, graphqlQuery);
        const countries = graphqlResponse.data.data.countries;

        if (!countries || countries.length === 0)
        {
            throw new Error('No country data retrieved from GraphQL API');
        }

        console.log('Fetched country data:', countries);

        // Step 2: Select one country and post its details to the REST API
        // First country selected
        const selectedCountry = countries[0]; 
        const restEndpoint = 'https://jsonplaceholder.typicode.com/posts';
        const postBody = {
            title: `Country: ${selectedCountry.name}`,
            body: `Capital: ${selectedCountry.capital}, Currency: ${selectedCountry.currency}`,
            userId: 1
        };

        const restResponse = await fetchData(restEndpoint, postBody);
        console.log('Posted country details:', restResponse.data);

        // Step 5 : Save all countries to a CSV file
        const csvData = countries.map(({ name, capital, currency }) => `"${name}","${capital}","${currency}"`).join('\n');
        const csvHeader = 'Country Name,Capital,Currency\n';
        fs.writeFileSync('countries.csv', csvHeader + csvData);
        console.log('Saved country data to countries.csv');

    } catch (error)
    {
        console.error('Error occurred:', error.message);
    }
})();


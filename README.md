# Project: GraphQL and REST API Workflow

Overview

This project automates the process of fetching country data from a GraphQL API, posting details about a selected country to a REST API, and saving the complete dataset to a CSV file. It also includes robust error handling for common HTTP errors like 403 and 500 responses.



Features

1. Fetch country data from a GraphQL API.
2. Post selected country details to a REST API.
3. Handle errors gracefully:
   1. Skip requests on 403 Forbidden errors.
   2. Retry requests with exponential backoff on 500 Internal Server errors.
4. Save all fetched data to a CSV file.

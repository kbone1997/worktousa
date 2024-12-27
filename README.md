# Project: GraphQL and REST API Workflow

## Overview

This project automates the process of fetching country data from a GraphQL API, posting details about a selected country to a REST API, and saving the complete dataset to a CSV file. It also includes robust error handling for common HTTP errors like 403 and 500 responses.



## Features

1. Fetch country data from a GraphQL API.
2. Post selected country details to a REST API.
3. Handle errors gracefully:
   1. Skip requests on 403 Forbidden errors.
   2. Retry requests with exponential backoff on 500 Internal Server errors.
4. Save all fetched data to a CSV file.


## Step 1: GraphQL API Query

The script fetches country data using the Countries GraphQL API.

The query extracts the following fields for each country:

- Name
- Capital
- Currency
- If no data is retrieved, the script logs an error and stops further execution.


## Step 2: REST API Interaction

- The script selects the first country from the fetched data.
- It posts the country’s details to the JSONPlaceholder REST API.
- The response with the ID of the created resource, is logged.

## Step 3: Error Handling

- 403 Forbidden:
-- Logs the error and skips the request.
- 500 Internal Server Error:
-- Retries the request up to 5 times with exponential backoff (2^n seconds).
- General Errors:
-- Logs all errors for debugging and halts execution if unrecoverable.

## Step 4: Automating the Workflow
- Combines the GraphQL and REST API interactions into a single automated script.

## Step 5: Data Transformation (Optional Bonus)
- Saves all fetched countries into a CSV file named countries.csv.
- The CSV contains the following columns:
-- Country Name
-- Capital
-- Currency

# How to Run the Project
Assuming that Node.js is installed.
In terminal:
- `npm install` (To install the required dependencies as per package.json)
- `node main.js` (To run the file)


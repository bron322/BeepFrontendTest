# Currency Selection Dashboard

This mini project is a React-based application designed to provide an intuitive interface for selecting and managing currencies. The dashboard features real-time search capabilities with stable dropdown lists, integrated using both a SyncSearch component and an AutoComplete component.

## Project Overview
The Currency Selection Dashboard allows users to search and select various currencies from a predefined list. The selected currencies are displayed dynamically in the interface, making it easy for users to manage their selections.

## Key Features
- SyncSearch Component: Provides real-time search results with a stable dropdown list, allowing users to search for currencies quickly and efficiently.
- AutoComplete Component: Offers a search box with a loading indicator during search, ensuring a smooth user experience even when results take time to load.
- Dynamic Currency Display: Selected currencies are displayed in a list format, complete with flags and names, making the interface visually informative.

## Components and Props
- `Currency container` component is the main container that manages the state of the selected currencies. It passes necessary props to both the SyncSearch and AutoComplete components, allowing them to interact with the selected currency list.
- `SyncSearch` component have <br>
  -`onCheckboxChange` (Function): A function passed from the CurrencyContainer that updates the list of selected currencies when a user selects or deselects a currency. <br>
  -`selectedCurrencies` (Array): An array containing the currencies that have already been selected, used to manage the checkbox states within the component.
- `AutoComplete` component have <br>
  -`onCheckboxChange` (Function): Similar to the SyncSearch component, this function is used to update the selected currencies list. <br>
  -`selectedCurrencies` (Array): This array is used to maintain the selected state of currencies, ensuring consistency across the interface.

## How it works
The `CurrencyContainer` component manages the state of selected currencies using React's useState hook. It passes down the `handleCheckboxChange` function to both the `SyncSearch` and `AutoComplete` components. This function handles adding or removing currencies from the selected list.

Both `SyncSearch` and `AutoComplete` components use the `selectedCurrencies` prop to check which currencies are currently selected. They also render a list of filtered currencies based on the user's input, and the `onCheckboxChange` function allows users to select or deselect currencies.

## File Structure
- src/
  - components/
    - SyncSearch.tsx
    - AutoComplete.tsx
    - CurrencyContainer.tsx
  - data/
    - currencies.ts
  - types/
    - Currency.ts
  - App.tsx

## How to run
1. Clone the repo.
2. cd BeepFrontendTest
3. npm install
4. npm run dev

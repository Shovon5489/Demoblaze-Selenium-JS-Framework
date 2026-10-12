# Demoblaze Selenium JS Automation

A UI automation project built with Selenium WebDriver, JavaScript, and Chai to validate the product data and the add-to-cart flow of the [Demoblaze](https://demoblaze.com/) e-commerce demo website. It cross-checks the data returned by the Demoblaze API against what the homepage actually displays.

---

## Key Features

- API and UI cross-validation of product titles and their order
- Dynamic XPath locators generated from live API data
- Product visibility checks for every product on the homepage
- CSS validation of product title colour and Home link colour (default and pressed state)
- End-to-end add-to-cart flow with browser alert handling
- Chai assertions for title matching and cart verification
- Axios helper for fetching product data from the API

## Tech Stack

| Component | Technology |
|:----------|:-----------|
| Language | JavaScript (ES modules) |
| Automation | Selenium WebDriver |
| Assertions | Chai |
| HTTP Client | Axios |
| Browser | Google Chrome |
| Runtime | Node.js, npm |

## Test Coverage

| Test Module | Test Cases | Status |
|:------------|:----------:|:------:|
| Homepage Loading | 1 | Passed |
| API and UI Product Sync | 1 | Passed |
| Product Visibility | 1 | Passed |
| Styling (CSS) | 3 | Passed |
| Cart Management | 2 | Passed |
| **Total** | **8** | **8 Passed** |

## Test Cases

| ID | Module | Description | Expected Result | Status |
|:---|:-------|:------------|:----------------|:------:|
| DB_UI_001 | Homepage Loading | Open the Demoblaze homepage in Chrome | Homepage opens and product content is displayed | Passed |
| DB_API_002 | API and UI Product Sync | Compare product titles and order from the API with the homepage | Titles and order match | Passed |
| DB_UI_003 | Product Visibility | Check that every API product is visible on the homepage | Every product is visible | Passed |
| DB_UI_004 | Product Text Styling | Check the text colour of each product title | Colour is `#0275d8` | Passed |
| DB_UI_005 | Home Link Default Color | Check the Home link colour before pressing | Colour is `#FFFFFF` | Passed |
| DB_UI_006 | Home Link Pressed Color | Check the Home link colour while it is pressed | Colour is `#00aaff` | Passed |
| DB_CART_007 | Add Product to Cart | Add Sony vaio i5 from the Laptops category to the cart | Product is added and the alert is accepted | Passed |
| DB_CART_008 | Cart Verification | Compare the product name in the cart with the expected product | Cart shows "Sony vaio i5" | Passed |

Detailed steps, test data, and results are available in `Demoblaze_Test_Cases.xlsx`.

## Test Execution Summary

| Status | Count |
|:-------|:-----:|
| Passed | 8 |
| Failed | 0 |
| Not Run | 0 |
| Blocked | 0 |
| **Total** | **8** |

## Project Structure

├── test.js                    # Selenium test flow and Chai assertions
├── http_request.js            # Axios helper that fetches products from the Demoblaze API
├── utils.js                   # [one line: what this helper does]
├── Demoblaze_Test_Cases.xlsx  # Test case sheet
└── package.json

## How to Run
Prerequisites
- Node.js and npm
- Google Chrome

### Installation and Executio

```bash
git clone https://github.com/Shovon5489/Demoblaze-Selenium-JS-Framework.git
cd Demoblaze-Selenium-JS-Framework
npm install
node test.js
```
The script opens Chrome, runs all the checks, prints the results to the console, and closes the browser when it finishes.
---

## Highlights

- API and UI validation: compares backend data with the frontend display in a single flow.
- Dynamic XPath: locators are generated from API titles instead of being hard-coded.
- Colour normalisation: CSS `rgb()` values are converted to hex for accurate comparison.
- Alert handling: handles the "Product added" browser alert during the cart flow.
- Pressed-state testing: checks the Home link colour while the mouse button is held down.

---

## Future Improvements

- Convert visibility and colour checks from console logging to assertions
- Replace fixed `sleep` delays with explicit waits
- Add a test runner (Mocha) and an `npm test` script
- Extend coverage to Signup, Login, and Place Order

---

## Conclusion

This project demonstrates how API data can be combined with UI automation using Selenium and JavaScript. It was built as part of my QA learning journey, and feedback is always welcome.
---
**Author:** Nafis Fuad Shovon | [GitHub](https://github.com/Shovon5489)

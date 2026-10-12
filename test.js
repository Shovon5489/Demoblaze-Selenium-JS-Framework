import { expect } from "chai";
import { Browser, Builder, By } from "selenium-webdriver";
import { getProducts } from "./http_request.js";

const driver = new Builder().forBrowser(Browser.CHROME).build();
const expectedText = "Sony vaio i5";

async function runner() {
  // Browser-e homepage open kore product load howar jonno wait kori.
  await driver.get("https://demoblaze.com/");
  await driver.manage().window().maximize();
  await driver.sleep(3000);

  // API response theke product title-er array toyri kori.
  const apiResponse = await getProducts();
  const apiProductTitles = apiResponse.Items.map((product) => product.title.trim());

  // XPath diye homepage-er DOM theke product title collect kori.
  const productLocator = By.xpath('//h4/a[contains(@href,"prod")]');
  const products = await driver.findElements(productLocator);
  const frontendProductTitles = await Promise.all(products.map((product) => product.getText()));

  // API o frontend-er title ebong order eki kina Chai diye verify kori.
  expect(frontendProductTitles).to.deep.equal(apiProductTitles);
  console.log("API and frontend product titles match.");

  // Protiti API title-er jonno dynamic XPath diye frontend-e visibility check kori.
  for (const title of apiProductTitles) {
    const productName = title;
    const productLocator = By.xpath(
      `//h4/a[contains(@href, 'prod') and normalize-space(.)='${productName}']`
    );
    const matchingProducts = await driver.findElements(productLocator);

    if (matchingProducts.length > 0 && await matchingProducts[0].isDisplayed()) {
      console.log(`SUCCESS: Product visible: ${productName}`);
    } else {
      console.log(`FAILED: Product not visible: ${productName}`);
    }
  }

  // API product title-er CSS text color expected color-er sathe check kori.
  const expectedColor = "#0275d8";
  for (const title of apiProductTitles) {
    const productName = title;
    const colorCheckLocator = By.xpath(
      `//h4/a[contains(@href, 'prod') and normalize-space(.)='${productName}']`
    );
    const colorCheckProducts = await driver.findElements(colorCheckLocator);

    if (colorCheckProducts.length > 0 && await colorCheckProducts[0].isDisplayed()) {
      const actualColor = await colorCheckProducts[0].getCssValue("color");
      const channels = actualColor.match(/\d+/g);
      const actualColorHex = channels && channels.length >= 3
        ? `#${channels
            .slice(0, 3)
            .map((channel) => Number(channel).toString(16).padStart(2, "0"))
            .join("")}`
        : actualColor.toLowerCase();

      if (actualColorHex === expectedColor) {
        console.log(`Text colour matched: ${productName}`);
      } else {
        console.log(`Text colour not matched: ${productName}`);
      }
    } else {
      console.log(`Text colour not matched: ${productName}`);
    }
  }

  // Home button chepe dhore rakhar somoy CSS text color check kori.
  const expectedHomeColorBeforePress = "#FFFFFF";
  const expectedHomeColorWhilePressed = "#00aaff";
  const homeButtonLocator = By.xpath("//a[@class='nav-link' and @href='index.html']");
  const homeButton = await driver.findElements(homeButtonLocator);

  if (homeButton.length > 0 && await homeButton[0].isDisplayed()) {
    const normalizeHomeColor = (cssColor) => {
      const channels = cssColor.match(/\d+/g);
      return channels && channels.length >= 3
        ? `#${channels
            .slice(0, 3)
            .map((channel) => Number(channel).toString(16).padStart(2, "0"))
            .join("")}`
        : cssColor.toLowerCase();
    };

    const colorBeforePress = await homeButton[0].getCssValue("color");
    if (normalizeHomeColor(colorBeforePress) === expectedHomeColorBeforePress.toLowerCase()) {
      console.log("Home button text colour matched before press.");
    } else {
      console.log("Home button text colour not matched before press.");
    }

    const homeButtonActions = driver.actions();
    await homeButtonActions.move({ origin: homeButton[0] }).press().perform();
    const actualHomeColor = await homeButton[0].getCssValue("color");
    await homeButtonActions.release().perform();

    if (normalizeHomeColor(actualHomeColor) === expectedHomeColorWhilePressed.toLowerCase()) {
      console.log("Home button text colour matched while pressed.");
    } else {
      console.log("Home button text colour not matched while pressed.");
    }
  } else {
    console.log("Home button not found or not visible; colour checks failed.");
  }



   await driver.findElement(By.xpath("//a[@href='#' and text()='Laptops']")).click();
   await driver.sleep(3000);
   await driver.findElement(By.xpath("//a[text()='Sony vaio i5']")).click();
   await driver.sleep(3000);
   await driver.findElement(By.xpath("//a[text()='Add to cart']")).click();
   await driver.sleep(3000);
   await driver.switchTo().alert().accept();
   await driver.sleep(3000);
   await driver.findElement(By.xpath("//a[text()='Cart']")).click();
   await driver.sleep(3000);
   const actualProuctText = await driver.findElement(By.xpath("//tr[@class='success']/td[2]")).getText();
   expect(expectedText).to.eql(actualProuctText);
   //Test shesh hole Chrome browser bondho kori.
  await driver.quit();
}
// Async test workflow start kori.
runner();
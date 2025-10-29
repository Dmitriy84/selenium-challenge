import {Builder, By, Key, WebDriver} from 'selenium-webdriver'
import {Options} from "selenium-webdriver/chrome"

describe('Selenium Web Scraping Test', () => {

    let driver: WebDriver | null = null

    beforeAll(async () => {
        try {
            const options = new Options()
            // options.addArguments('--headless=new') // Use new headless mode
            options.addArguments('--no-sandbox')
            options.addArguments('--disable-dev-shm-usage')
            options.addArguments('--disable-gpu')
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build()
        } catch (error) {
            console.error('Failed to initialize WebDriver:', error)
            throw error
        }
    }, 15000)

    afterAll(async () => {
        if (driver) {
            try {
                await driver.quit()
            } catch (error) {
                console.error('Failed to quit WebDriver:', error)
            }
        }
    }, 15000)

    test('should scrape and validate the first book title', async () => {
        if (!driver) {
            throw new Error('WebDriver not initialized')
        }
        await driver.get("https://github.com/")
        const theButton = await driver.findElement(By.xpath("//button[@data-target='qbsearch-input.inputButton']"))
        await theButton.click()

        await driver.sleep(2000)
        const searchText = "microsoft/playwright"
        const findInput = await driver.findElement(By.id("query-builder-test"))

        await findInput.sendKeys(searchText, Key.ENTER)
        await driver.sleep(5000)
        const body = driver.findElement(By.css("div"))

        expect(await body.getText()).toContain(searchText)


        const link = await driver.findElement(By.xpath(`//a[@href='/${searchText}']`))
        await driver.executeScript("arguments[0].click()", link)

        // await link.click()
        expect(await driver.getTitle()).toContain(searchText)

        /*
        1. Opens https://github.com
2. Searches for the repository microsoft/playwright
3. Verifies that the repository appears in the search results
4. Clicks on the repository link
5. Asserts that the repository page title contains microsoft/playwright
6. Opens branches list
7. Clicks View All Branches link
7. Searches for any branch that has `release` in it
8. Asserts that the page only contains branches with `release` in it. Pagination can be ignored
         */

    }, 150000)


})

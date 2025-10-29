import {Builder, By, WebDriver} from 'selenium-webdriver'
import {expect} from 'chai'
import * as fs from 'fs'
import {Options} from "selenium-webdriver/chrome"

describe('Selenium Web Scraping Test', () => {

    let driver: WebDriver | null = null

    beforeAll(async () => {
        try {
            const options = new Options()
            options.addArguments('--headless=new') // Use new headless mode
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

        await driver.get('http://books.toscrape.com/')

        // Find the first book title
        const titleElement = await driver.findElement(By.css('h3 > a'))
        const title = await titleElement.getAttribute('title')

        // Save screenshot
        const screenshot = await driver.takeScreenshot()
        fs.writeFileSync('screenshot.png', screenshot, 'base64')
        console.log('Screenshot saved as screenshot.png')

        // Validate with Chai
        expect(title).to.not.be.empty
        expect(title).to.be.a('string')

        // Save to file
        fs.writeFileSync('output.txt', title)
        console.log(`Scraped title: ${title}`)
        // await driver.sleep(10000)

    }, 15000)

})

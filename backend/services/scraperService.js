// services/scraperService.js
const puppeteer = require('puppeteer');

class ScraperService {
    async scrapeProductData(url) {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      try {
        const page = await browser.newPage();
        
        // Set user agent to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        // Enable request interception
        await page.setRequestInterception(true);
        
        // Optimize page load by blocking unnecessary resources
        page.on('request', (request) => {
          if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
            request.abort();
          } else {
            request.continue();
          }
        });
  
        // Navigate to URL with timeout and wait for network idle
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 120000 
        });

        // Extract product data using evaluate
        const productData = await page.evaluate(() => {
          const getTextContent = (selector) => {
            const element = document.querySelector(selector);
            return element ? element.textContent.trim() : '';
          }; 
  
          const getRatings = () => {
            const ratingsElement = document.querySelector('div.j-aW8Z span'); // First occurrence of span
            return ratingsElement ? ratingsElement.textContent.match(/\d+,?\d*/)[0].replace(',', '') : '0'; // Extract numeric value
          };
        
          const getReviews = () => {
            const reviewsElement = document.querySelector('div.j-aW8Z + div span'); // Second occurrence of span for reviews
            return reviewsElement ? reviewsElement.textContent.match(/\d+/)[0] : '0'; // Extract numeric value
          };

          const getDescription = () => {
            const descriptionElements = document.querySelectorAll('div.xFVion ul li._7eSDEz');
            return Array.from(descriptionElements).map(el => el.textContent.trim()).join(', ');
          };

          return {
             title: getTextContent('span.VU-ZEz'), // Product title
          description: getDescription(), // Product description
          currentPrice: getTextContent('div.Nx9bqj.CxhGGd').replace(/₹|,/g, ''), // Current price
          totalReviews: getReviews(), // Total reviews
          totalPurchases: getRatings()// Can fetch the same element if needed
          };
        }); 
  
        // Clean and format the data
        return {
          ...productData,
          url,
        title: productData.title,
        description: productData.description || 'No description available',
        currentPrice: parseFloat(productData.currentPrice) || 0,
        totalReviews: parseInt(productData.totalReviews.replace(/[^\d]/g, ''), 10) || 0,
        totalPurchases: parseInt(productData.totalPurchases.replace(/[^\d]/g, ''), 10) || 0,
        lastChecked: new Date()
        };
      } catch (error) {
        console.error('Scraping error:', error);
        throw new Error(`Failed to scrape product data: ${error.message}`);
      } finally {
        await browser.close();
      }
    }
  
    // Method to validate Flipkart URL
    validateFlipkartUrl(url) {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname === 'www.flipkart.com' && url.includes('/p/');
      } catch {
        return false;
      }
    }
  }

  module.exports = new ScraperService();
  
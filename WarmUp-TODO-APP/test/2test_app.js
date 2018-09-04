const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function TestSuites() {
 const driver = new webdriver.Builder().forBrowser('chrome').build(); 
 try {
  await driver.get('http://localhost:3000/login');
  await driver.findElement(By.name('username')).sendKeys('test1');
  await driver.findElement(By.name('password')).sendKeys('test1');
  await driver.findElement(By.css('.login-button')).click();
  
  //ADD TODO 
  await driver.wait(until.elementsLocated({css: '.addTodo'}), 10000);
  await driver.findElement(By.css('.addTodo')).sendKeys('new todoooo');
  await driver.findElement(By.css('.addTodo')).sendKeys(Key.RETURN);
  await driver.sleep(5000); 
 
  
  // await driver.findElement(By.css('.fa-trash')).click();
  await driver.findElement(By.xpath('//*[@id="container"]/ul/li[1]/span/i')).click();
  await driver.sleep(5000); 

  // LOG OUT
  await driver.findElement(By.css('.cssbutton')).click();

  await driver.sleep(10000); 
  
 } finally {
  await driver.quit();
 }
})();
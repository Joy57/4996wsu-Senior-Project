const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const url = "http://localhost:3000/";
const user = "test1";
const pass = "test1";
(async function TestSuites() {
 const driver = new webdriver.Builder().forBrowser('chrome').build(); 
 try {

//   // Register
//   await driver.get(url+'register');
//   await driver.findElement(By.name('username')).sendKeys(user);
//   await driver.findElement(By.name('password')).sendKeys(pass);
//   await driver.findElement(By.css('.login-button')).click();
//   console.log("Test status: Registered new USER Successfully")

  //Login
  await driver.get(url+'login');
  console.log("STATUS: Test status: Log in user");
  await driver.findElement(By.name('username')).sendKeys(user);
  await driver.findElement(By.name('password')).sendKeys(pass);
  await driver.findElement(By.css('.login-button')).click();
 
  
  //ADD TODO 
  console.log("STATUS: Waiting for page to be loaded");
  await driver.wait(until.elementsLocated({css: '.addTodo'}), 10000);
  console.log("STATUS: Adding a new ToDo item");
  await driver.findElement(By.css('.addTodo')).sendKeys('2 my todo item');
  await driver.findElement(By.css('.addTodo')).sendKeys(Key.RETURN);
  await driver.sleep(3000); 
  
 
  
 //Delete a todo item
  console.log("STATUS: Deleting a ToDo item");
  await driver.findElement(By.xpath('//*[@id="container"]/ul/li[1]/span/i')).click();
  await driver.sleep(3000); 

  // LOG OUT
  console.log("STATUS: Logging out user");
  await driver.findElement(By.css('.cssbutton')).click();
  await driver.sleep(4000); 
  
 } finally {
  console.log("STATUS: Done testing");    
  await driver.quit();
 }
})();
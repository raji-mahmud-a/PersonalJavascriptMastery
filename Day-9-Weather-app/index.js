//========  Fioe Imports  ========//
import Locator from './assets/Locator.js';

const app = (async() => {

const location = await Locator()

console.log(location)
})()
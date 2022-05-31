import { Page, Locator, expect } from "@playwright/test";
import {test as baseTest} from "@playwright/test";
const crypto = require('crypto')

export class Helpers {
    variable: string


    constructor(variable: string) {
        this.variable = variable
    }

    /*function loadHomePage(){
        await page.goto("https://example.com")
    }

    export async function getRandomNumber()  {
        return Math.floor(Math.random() * 1000 + 1)
    }

    export async function getRandomStr()  {
        return crypto.randomBytes(20).toString('hex')
    }

    export async function getRandomEmail()  {
        return crypto.randomBytes(20).toString('hex')
    }*/


    toCamelWords(str: string){
        return str.split(' ').map(function(word,index){
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }   
}
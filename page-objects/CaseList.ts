import { Page, Locator, expect } from "@playwright/test";

export class CaseList {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getCaseByDescriptionAndDo(desc: string, action: string) {
        // assert.equal(page.url(), 'https://stage-app-avander-ims-ui.azurewebsites.net/app/list?state=H4sIAAAAAAACA4VZ3W7buBJ%2BlYWvzgLFwtaPnezVSe2kDTZpvHG2xZ5FUTASbfNEFlVScuMWfZh9ln2xMxRnKFJSei4CmR9nhsPh%2FJH5NtmKoubq9Wny67fJ54YVoj4tG13LA1drJTOu9eTXsimKVzQLKPDw65zwkvN8s2eK53fqTSEfWbFp1JGfHONWycNSVqc%2FVEHQ4XTPdSVLLR6FEfpGyaa6EbomgqbKWc3zW6n4w56VF39ypi528tNVU2ZEUyl%2BFLLRtw%2BrAD%2FUeTA%2B9cZKFoUod0bkqLzBhOKZVDnP10DQX4zmbpiuP3D%2BdAWb3TRlzk7%2Fl%2BxW%2FpBs9YO5GCY1ztaq4a8mX0S9vxf6yRm9PdcrxXnNn51Ztag5nMtfk3QafdKTV5M0Tex3dma%2F0xjxFMf4nS9wPD3HH7OIfsztj8SyxtNp%2B02mVnSysBxRbJdIZrhEbPli5E8WOI9LJlPEExynEcq3%2FMn5zMo9t6olJH%2BK4wTXT5GeNE9R7jnpiXzpDMdEHyF%2BjvJoHr9okhgNEZ2jngnKXeB8hPwzxGeo9xnpR3LsOMYjSVBujPRJgnrPU%2BSf47pkZzzKaYQMM1qAGPAgUPGEDI9nnyQLFIiKRmiAyI6jyBommiF%2FhBuOcJ15ggeNBoxQwRmun6Ch5njwCcmhr9UjSvFLei1QDuoTkT4zNCwaOMIDitCxkhjtEON%2B5rifOeoXk94ob072wX3FFCMWjxfo4GTPheWLYzxAdMAY9YjPkJ4cPSb9yU4oNyY56ADoKDEdMDn%2BGcqPUxzjumcUo6g%2F2itGB4sSkof2WqCdMGDBYaYUyi64URWKsTkufY6mO6Mv%2BSi5DprM0ZMcNBnKSym2iQ5jP8Kjic%2BJH9MOxnCaUAyjxikdEcqlDaApUwyF1O0wIkGUtDDvoS%2BmeDYpnmGKZ5SiDdOE5nHhhPIkWiBFJ0hjGiNhRF9kwENPMUjSiBRA%2Foh2Qoqg4rSB2C1MJqW8Op3RZlEE%2Bnc6R8q5y9w4psSBdCRoRrWB6FHFOc2TXKcK%2FcDNxgvnTxTSKDKlc6WyQ0kV7Zq4YkJJH316So5GY4wFl8TR4bD4xBQLC6JDh47IIVGxc4zFKeUSclAqQhg76HgJKh67LVNBnU7dliisKX1guFI4LnBrGDORS8eU1jCNUPrB8E7mFL6UVinM0TR43Am6dkRpjtIypTEcR5jO4pjWo7SD8ojetQh0FnQGrpDil%2FId2jRCgXF32EbyR9uOdI1kxnRv9K45PHJFCMtqIcsxrOPiZQ3t5MOp4iHF5QC3lJvm0Qd1zepG%2B6xHQxSgmeKmNTUdXA96kD3AtNUIyENV8D4bgR3jkSuxFSEZYR0Va3JRS3VhPjecud3vNfeHooQW8Cj4F18TCeLyxu045xVT9QGsMUQ8sz6DLW5kxkJrw5jvpBJfW9wJAHRZSB3uokO7fYjyvw3cG9Zc6Y4dwdcyP61BEXfNgDNQ%2FG57baZPHfGR61rsWgXCc%2Bqm%2FO3nYB%2Fo%2FnmgGmKdYopuJwUPlePlUShZGuuw4vfGLAB0XdOt%2BACslMybrKZbVQ9%2BJ%2Bt1wcqS58H%2BT8tR0%2B45K%2Br9%2BJzl27CK3bc3BQbKO7%2FmWaPAkwfKeRvtdgHXik%2FvZOmW6XRrp659m9%2Fzzw3sOqR4e8qVfCt27Y3kusxE7vlXR9HpOUpzK7SGe9oKT2ds7k6teMFOeaBSuBBoUcAfOAEtEm709gQiuPGS3iYpOpeQiPRQeXvV7Yna2PtVgK2VODDVTg0WpkgLeTYcYnRk3YuiAKamHlnGTQ3RIXEr%2BSILXbelt9jIyqVznT%2B53qA3%2FYDkCnzC3eU1V%2B%2FYwY1NRupCr02AfpLoJw0v7WX%2B8ZoCMSwWunN5kzfrk38pFugBq94yPt4tt0cH7o%2F9gpEVDBxxK7LA87pcFbr1gYny3QtzbAvJeslGEogN7AFsc8EL8AepnqqCZTwoGb7mu9Z%2FL%2FpwAUl%2BiEJh8Yf4FBRUzvYFyL78BLJCaOc9EAVkH2Q2RjmAwdxca79eEftwcz3QOMl7QU9OPhoWDhudEsj4SsGxuFOVtTtpX6477aIovfcyDulDnoym%2FbrkqvLlCyR91qXM3Wo123k%2FvdLDi%2FzBA%2Bxz0RPnFeTJpXFT7%2F2r64KeM1508ZXxqn6zWt%2F7xrl8rqQKvKGW1Qy6W1fJQPYXWGu0RkL5PFhf0r0%2BjpvHRaaCg7jIwormZfVw6uJqOd6EhGRv71f0c3136fRXrNTFCPmhKWph8mUIa7GzZ0yAeWxrYyT0TQMv9zx7KryXzEEr4T9zuj7Rgn99mxTs0RzI5Dd5%2FOfvTP%2B0%2BufvEo72p389ySPL9C85M8N%2FsyMrc65%2B2Tc%2FQ0d9ZIXp6Gaz82l09v2jJ7crMf6y%2Ff7Rn8Me0oeCPvKFiZG9UXcb8lA325d0lMWx3wpeX12GSTBMcqMO5%2Fdi7mBkFmy93xYF56%2B9Qq3b87009g0SvMU3EGG9e8ZSHvzcZMG3TL9vdx1WCbpe9Md%2BrfSxOzW8%2B7RzAar3oktZVs8gT7eIMf0NL3edDSkm%2BHAKslGnJORG4%2BFdyW5nl7LpNu1IAlTL6oFBN5j70SKb%2BmEv9KY%2FR8Q1P3S1s4Sq80Bq5ndlcXppLliYNbUcZwtnAib6X4BPbhQOrIs7CLBcaKi7p6v2%2BR3ysZ8KrNeueM2Ec1NIzDX%2Bs8PvSDy4a0g8sLvQBKAfUpUET%2FbcjcY%2BzVZB%2B87LLGAs1d3WJH24qgUhqllds2zv%2B%2Fee6TBVAjDIgMC43fIMFPQrj4CakX3G7qUDdc2rblQzr3mDOUh6TOXKb%2Bn0F67YEJFbCDc%2BxEWJF69gVTtjeTy1K6A9dinFSPuP7G4ie%2FYVtPGjy1D44WvGK64zJSp%2FQQNfiTKHyuygPlsXDJu7tQmGflro33dB10dmexv%2F2KgPDrPtHi4YZb0eZ6HpzQgrlDORQ7C9wErTmx%2Bset8zI%2FH0caEvn4EdjHTLmfbKLw%2Fh7mVGwj06C0IGEolvNxgGSeY68HAAIE%2Fr4Ikjl1kTvoXszP8q35uKG2wclQ9KqfMPH32qhB%2FpMPTUbQ53299CAsK8e9BxN6AirKMyPt0jQqij%2BQoaL%2Fes3PH%2BlSicCXOQf0imzF4%2Bm9NohN53Zcjg4CM1DyKtpYY%2BJqymBn2toM%2FLBw8Wl58bUfkZhybCZyBC17LwIjjoC5bQhNlkx%2F1LXdd1bppHm7W1f3ENKkB7M3gzfnFq54zkNVODG%2F0HqBTXZVuw%2Bf3Ik4u5cbf%2FAyfAPpxADJW1PAUzUCu98XfTfu%2FcQ%2BnMDjfiK%2BiVTo1Lq9rUism1d8WdWPyeH%2Bm%2Fx%2FZKPmmzthWh225UgNfPI4uA9O%2BvEIoHUHo2gM48xo%2F28msN5u7bk%2B%2F%2FA6YwtZGBIAAA');
        // Click text=lorem ipsum set dolor sit amen
        await this.page.locator('text=' + desc + '').click();
        //hover three dot
        await this.page.hover("(//div[contains(@class, 'p0i')])[1]")
        await this.page.locator('text="' + action + '"').click();
        // //div[text()='Extrusion-Hungary-Szekesfehervar']
        await this.page.click("//button[text()='Yes']")
    }

    async searchCaseByFilters(site: string, cat: string) {
        //uncheck all 
        await this.page.click("data-testid=site-selector")
        await this.page.locator('.csscheckbox').first().click();
        //step 4
        await this.page.fill("#treeview-input-search", site)
        await this.page.keyboard.press('Enter');
        await this.page.locator("(//div[@class='filter-title'])[1]").click();
        //await this.page.locator("text=" + site + " >> nth=0").click();
        //await this.page.locator('text=Extrusion-Hungary-Szekesfehervar').first().click();
        await this.page.click("//button[text()='OK']")
        //step 5
        await this.page.click("data-testid=ims-multi-select-entityType")
        //await this.page.locator('text=' + cat + '').first().click();
        await this.page.locator("//span[contains(@class, 'ml-2')][text()='" + cat + "']").click();
        //span[contains(@class, 'ml-2')][text()=''+ cat +'']
        await this.page.click("(//button[text()=' OK '])[1]")
        await expect(this.page.locator("//h1[contains(@class,'m0i')]")).toContainText('Customized view')
    }

}
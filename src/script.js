"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const countriesContainer = document.querySelector(".countries");
const dropDownButton = document.querySelector(".dropDown");
const dropDownMenu = document.querySelector(".drop");
const regionOptions = document.querySelectorAll(".region");
const searchInput = document.querySelector(".search");
const toggleButton = document.querySelector(".toggle");
const moonIcon = document.querySelector(".moon");
const countryModalDialog = document.querySelector(".countryModal");
const backButton = document.querySelector(".back");
function fetchCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://restcountries.com/v3.1/all");
        const countries = yield response.json();
        console.log(countries);
        countries.forEach((country) => {
            displayCountry(country);
        });
    });
}
fetchCountries();
function displayCountry(country) {
    const countryElement = document.createElement("div");
    countryElement.classList.add("country");
    const flagUrl = country.flags.png;
    countryElement.innerHTML = `
        <div class="country-img">
            <img src="${flagUrl}" alt="Flag of ${country.name.common}">
        </div>
        <div class="country-info">
            <h5 class="countryName">${country.name.common}</h5>
            <p><strong>Population:</strong> ${country.population}</p>
            <p class="regionName"><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital.join(", ")}</p>
        </div>`;
    countriesContainer.appendChild(countryElement);
    countryElement.addEventListener("click", () => {
        displayCountryDetail(country);
    });
}
dropDownButton.addEventListener("click", () => {
    dropDownMenu.classList.toggle("showDropDown");
});
const regionLabels = document.getElementsByClassName("regionName");
const countryLabels = document.getElementsByClassName("countryName");
regionOptions.forEach((region) => {
    region.addEventListener("click", () => {
        Array.from(regionLabels).forEach((label) => {
            if (label.innerText.includes(region.innerText) || region.innerText === "All") {
                label.parentElement.parentElement.style.display = "grid";
            }
            else {
                label.parentElement.parentElement.style.display = "none";
            }
        });
    });
});
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    Array.from(countryLabels).forEach((label) => {
        const countryNameText = label.innerText.toLowerCase();
        if (countryNameText.includes(searchText)) {
            label.parentElement.parentElement.style.display = "grid";
        }
        else {
            label.parentElement.parentElement.style.display = "none";
        }
    });
});
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    moonIcon.classList.toggle("fas");
});
backButton.addEventListener("click", () => {
    countryModalDialog.classList.toggle("show");
});
function displayCountryDetail(country) {
    const flagUrl = country.flags.png;
    countryModalDialog.classList.toggle("show");
    countryModalDialog.innerHTML = `
        <button class="back">Back</button>
        <div class="modal">
            <div class="leftModal">
                <img src="${flagUrl}" alt="Flag of ${country.name.common}">
            </div>
            <div class="rightModal">
                <h1>${country.name.common}</h1>
                <div class="modalInfo">
                    <div class="innerLeft inner">
                        <p><strong>Name:</strong> ${country.name.common || 'N/A'}</p>
                        <p><strong>Population:</strong> ${country.population}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Sub-region:</strong> ${country.subregion}</p>
                    </div>
                    <div class="innerRight inner">
                        <p><strong>Capital:</strong> ${country.capital.join(", ")}</p>
                        <p><strong>Top Level Domain:</strong> ${country.tld.join(", ")}</p>
                        <p><strong>Currencies:</strong> ${getCurrencies(country.currencies)}</p>
                        <p><strong>Languages:</strong> ${getLanguages(country.languages)}</p>
                    </div>
                </div>
            </div>
        </div>`;
    const backBtn = countryModalDialog.querySelector(".back");
    backBtn.addEventListener("click", () => {
        countryModalDialog.classList.toggle("show");
    });
}
function getCurrencies(currencies) {
    return Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(", ");
}
function getLanguages(languages) {
    return Object.values(languages).join(", ");
}

const countriesContainer = document.querySelector(".countries") as HTMLElement;
const dropDownButton = document.querySelector(".dropDown") as HTMLElement;
const dropDownMenu = document.querySelector(".drop") as HTMLElement;
const regionOptions = document.querySelectorAll(".region") as NodeListOf<HTMLElement>;
const searchInput = document.querySelector(".search") as HTMLInputElement;
const toggleButton = document.querySelector(".toggle") as HTMLElement;
const moonIcon = document.querySelector(".moon") as HTMLElement;
const countryModalDialog = document.querySelector(".countryModal") as HTMLElement;
const backButton = document.querySelector(".back") as HTMLElement;

interface Country {
    name: {
        common: string;
        official: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    flags: {
        png: string;
    };
    tld: string[];
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages: {
        [key: string]: string;
    };
}

async function fetchCountries(): Promise<void> {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: Country[] = await response.json();
    console.log(countries);
    countries.forEach((country) => {
        displayCountry(country);
    });
}

fetchCountries();

function displayCountry(country: Country): void {
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

const regionLabels = document.getElementsByClassName("regionName") as HTMLCollectionOf<HTMLElement>;
const countryLabels = document.getElementsByClassName("countryName") as HTMLCollectionOf<HTMLElement>;

regionOptions.forEach((region) => {
    region.addEventListener("click", () => {
        Array.from(regionLabels).forEach((label) => {
            if (label.innerText.includes(region.innerText) || region.innerText === "All") {
                label.parentElement!.parentElement!.style.display = "grid";
            } else {
                label.parentElement!.parentElement!.style.display = "none";
            }
        });
    });
});

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    Array.from(countryLabels).forEach((label) => {
        const countryNameText = label.innerText.toLowerCase();
        if (countryNameText.includes(searchText)) {
            label.parentElement!.parentElement!.style.display = "grid";
        } else {
            label.parentElement!.parentElement!.style.display = "none";
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

function displayCountryDetail(country: Country): void {
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
    const backBtn = countryModalDialog.querySelector(".back") as HTMLElement;
    backBtn.addEventListener("click", () => {
        countryModalDialog.classList.toggle("show");
    });
}

function getCurrencies(currencies: { [key: string]: { name: string; symbol: string; } }): string {
    return Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(", ");
}

function getLanguages(languages: { [key: string]: string }): string {
    return Object.values(languages).join(", ");
}

let URL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (let code in countryList) {
//   console.log(code);
// }

for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (e) => {
  let currCode = e.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountvalue = amount.value;
  if (amountvalue === "" || amountvalue < 1) {
    amountvalue = 1;
    amount.value = "1";
  }
  const fromCode = fromCurr.value;
  const toCode = toCurr.value;
  const fromCurrURL = URL + fromCode;
  //   const toCurrURL = URL + toCode;
  let response1 = await fetch(fromCurrURL);
  let data = await response1.json();
  //   let response2 = (await fetch(fromCurrURL)).json();
  //   console.log(response1);
  let exchangeRate = (amountvalue * data.rates[toCode]).toFixed(1);
  msg.innerText = `${amountvalue}${fromCode} = ${exchangeRate}${toCode}`;
});

// {
// 	"result": "success",
// 	"provider": "https://www.exchangerate-api.com",
// 	"documentation": "https://www.exchangerate-api.com/docs/free",
// 	"terms_of_use": "https://www.exchangerate-api.com/terms",
// 	"time_last_update_unix": 1585872397,
// 	"time_last_update_utc": "Fri, 02 Apr 2020 00:06:37 +0000",
// 	"time_next_update_unix": 1585959987,
// 	"time_next_update_utc": "Sat, 03 Apr 2020 00:26:27 +0000",
// 	"time_eol_unix": 0,
// 	"base_code": "USD",
// 	"rates": {
// 		"USD": 1,
// 		"AED": 3.67,
// 		"ARS": 64.51,
// 		"AUD": 1.65,
// 		"CAD": 1.42,
// 		"CHF": 0.97,
// 		"CLP": 864.53,
// 		"CNY": 7.1,
// 		"EUR": 0.919,
// 		"GBP": 0.806,
// 		"HKD": 7.75,
// 		"...": 7.85,
// 		"...": 1.31,
// 		"...": 7.47, etc. etc.
// 	}
// }

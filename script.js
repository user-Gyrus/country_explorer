let button = document.querySelector(".search");
button.addEventListener("click", () => {
  let userData = document.querySelector(".input_data").value;

  async function fetchUserCountry(data) {
    try {
      let country = await fetch(
        `https://restcountries.com/v3.1/name/${data}?fullText=true`
      );
      let country_data = await country.json();
      console.log(country_data);

      let currencyKey = Object.keys(country_data[0].currencies)[0]; // Get the first currency key (e.g., "INR")
      let currency = country_data[0].currencies[currencyKey];

      let latLong = country_data[0].capitalInfo.latlng;

      let htmlContent = ``;
      htmlContent += `<div class="final_output">
              <div class="output_image">
              <h3>-- Country Flag --</h3>
                  <img src="${
                    country_data[0].flags.svg
                  }" alt="${userData}" class="output_data_flag" />
              </div>
              <div>
                  <h3>-- Country Capital --</h3>
                  <p>${country_data[0].capital}</p>
                  <h3>-- Location --</h3>
                  <p>Latitude: ${latLong[0]}</p>
                  <p>Longitude: ${latLong[1]}</p>
              </div>
              <div>
                  <h3>-- Country Currency --</h3>
                  <p>${currency.name || "N/A"}</p>
                  <h3>-- Country Currency --</h3>
                  <p>${currency.symbol || "N/A"}</p>
              </div>
          </div>`;
      document.querySelector(".output_data").innerHTML = htmlContent;
    } catch (error) {
      console.log(`Invalid Country`, error);
    }
  }

  fetchUserCountry(userData);
});

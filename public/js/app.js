const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const requestData = (address) => {
   messageOne.textContent = "Loading...";
   messageTwo.textContent = "";

   fetch(`/weather?address=${address}`)
      .then((response) => {
         response.json().then((data) => {
            if (data.error) {
               // console.log(data.error);
               messageOne.textContent = data.error;
            } else {
               messageOne.textContent = data.location;
               messageTwo.textContent = `${data.forecast.current.weather_descriptions[0]} and it is currently ${data.forecast.current.temperature} degrees out. It feels like ${data.forecast.current.feelslike} degrees out. The humidity is ${data.forecast.current.humidity}%.`;
            }
         });
      })
      .catch((error) => {
         console.log("error :", error);
      });
};

weatherForm.addEventListener("submit", (e) => {
   e.preventDefault();
   requestData(search.value);
   search.value = "";
});

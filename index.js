const container = document.querySelector(".container");
const search = document.querySelector(".searchBox button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const error404 = document.querySelector(".notFound");

search.addEventListener("click", function () {

  const APIkey = "734f57cb1bd930b3a93c7940532e1861";
  const city = document.querySelector(".searchBox input").value;

  if (city === "") {
    return console.log('please type something in search box');
  }
  fetch(
    `https://api.openweathermap.org//data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fade-in");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fade-in");

      const image = document.querySelector(".weatherBox img");
      const temperature = document.querySelector(".weatherBox .temperature");
      const description = document.querySelector(".weatherBox .description");
      const humidity = document.querySelector(".weatherDetails .humidity span");
      const wind = document.querySelector(".weatherDetails .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "https://th.bing.com/th/id/R.2fd5b03d9ad2f829490611386a490239?rik=WbXv6%2bdf7xYqEQ&pid=ImgRaw&r=0";
          break;
        case "Rain":
          image.src = "https://th.bing.com/th/id/OIP.7hR7TBR2-ZuA2Gggm_GkPAHaHa?pid=ImgDet&rs=1";
          break;
        case "Snow":
          image.src = "https://th.bing.com/th/id/R.47e29ccf9b8ea989be01c116900a025c?rik=eFUc1F8uTJhSCg&pid=ImgRaw&r=0";
          break;
        case "Clouds":
          image.src = "https://th.bing.com/th/id/R.b85a4d677f4e5dd799b0c77c976b4cb3?rik=7M0vpx8aVSLv2g&pid=ImgRaw&r=0";
          break;
        case "Haze":
          image.src = "https://cdn1.iconfinder.com/data/icons/weather-470/128/HAZE-512.png";
          break;

        default:
          image.src = "https://th.bing.com/th/id/R.41912b0de6ffb11c0fa7a379f34bb249?rik=6Ou4tYe%2fJRneEw&pid=ImgRaw&r=0";
      }


      temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;

      description.innerHTML = `${json.weather[0].description}`;
      
      humidity.innerHTML = `${json.main.humidity}%`;

      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "590px";
    });
});

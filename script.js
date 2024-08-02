const  url = "31606ccb2b1507ab55d65ca8b5fb07ec";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");


formEle.addEventListener("submit",(e)=>{

    e.preventDefault();
    const cityValue = cityNameEle.value;

    getWeatherData(cityValue);
})

async function getWeatherData(cityValue)
{
    
    try
    {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${url}&units=metric`);
    if(!response.ok)
    {
     throw new Error("Network Response is not Ok!")
    }

    const data =await response.json();
    //console.log(data);
    const temp=Math.floor(data.main.temp);
    const descp=data.weather["0"].description;
    const icon=data.weather["0"].icon;


    weatherDataEle.querySelector(".temp").textContent = `${temp}°C`;
    weatherDataEle.querySelector(".desc").textContent = `${descp}`;
    
    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"  alt="">`

    const detail=[`Feels Like: ${Math.floor(data.main.feels_like)}`,`Humidity: ${data.main.humidity}%`,`Wind Speed: ${data.wind.speed}m/s`];
    
    weatherDataEle.querySelector(".details").innerHTML = detail.map((detail)=>{

        return `<div>${detail}</div>`

    }).join("");
    }
    catch(err)
    {
        console.log(err);
    }

}

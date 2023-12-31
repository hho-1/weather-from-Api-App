

const units = "metric";
const lang = "en";

const apiKey = "bd8e3bbf55023bdcc67f450daf3c314a"

let citiesListed = []



const getWeatherData = async () => {
    
    document.querySelector(".btn-danger").onclick = async () => {
        
        const cityName = document.querySelector("input").value.toLowerCase()

        if(citiesListed.includes(cityName)){
            document.querySelector(".warning").innerHTML = `${cityName.toUpperCase()} is already listed below ☺️. Enter another city!`
        }
        else{
            
            try{
                await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`)
                .then((res) => res.json())
                .then((data) => printToScreen(data))
    
                citiesListed.push(cityName)

                const singleClearButtons = document.querySelectorAll("section.single-clear-btn")
                singleClearButtons.forEach((item) => {
                    item.addEventListener('click', sil)
                })
                function sil(e){
        
                    let index = citiesListed.indexOf(e.target.closest("div").childNodes[1].textContent.split(" ")[0].toLowerCase())
                    console.log(e.target.closest("div").childNodes[1].textContent);
                    console.log(index);
                    citiesListed.splice(index, 1)
                    //citiesListed[citiesListed.indexOf(e.target.closest("div").childNodes[1].textContent.split(" ")[0].toLowerCase())]
         
                    console.log(citiesListed);
                    
                    e.target.closest(".col").remove()
                }
                
                document.querySelector(".warning").innerHTML = ""
    
                
            }catch(err){
                document.querySelector(".warning").innerHTML = `${cityName.toUpperCase()} can not be found ☺️. Enter a valid city name!`
            }
        }

        document.querySelector("input").value = ""

    }

}

const getWeatherDatabyLocation = () => {
    
    document.getElementById("locate").onclick = () => {
        
        //const cityName = document.querySelector("input").value.toLowerCase()

        navigator.geolocation?.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${lang}`)
            .then((res) => res.json())
            .then((data) => {
                if(citiesListed.includes(data.name)){
                    console.log(citiesListed);
                    console.log(data.name);
                    document.querySelector(".warning").innerHTML = `${data.name.toUpperCase()} is already listed below ☺️. Enter another city!`
                }
                else{
                    
                    printToScreen(data)
                    citiesListed.push(data.name)
                    document.querySelector(".warning").innerHTML = ""

                }
            })
        })
    }
    
}

getWeatherData();
getWeatherDatabyLocation();


const printToScreen = (veri) => {
    
    console.log(veri);
    
    const iconUrl = `http://openweathermap.org/img/wn/${veri.weather[0].icon}@4x.png`

    document.querySelector(".row").innerHTML += `
    
    <div class="col col-sm-6 col-md-4 col-lg-3 col-xl-2 g-4">
        <div class="card shadow-lg">
          <div class="card-header fs-4 d-flex justify-content-between align-middle">
            
            <p>${veri.name} <sup style = "font-size: 0.8rem" class="bg-warning rounded px-1">${veri.sys.country}</sup></p>
            <section class="fs-6 text-danger single-clear-btn"><i class="fa-regular fa-circle-xmark p-1"></i></section>
          </div>
          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item h1 display-3">${Math.trunc(veri.main.temp)}<sup class="fs-4 display-6">℃</sup></li>
            <li class="list-group-item d-flex justify-content-center"><img src = ${iconUrl}></li>
            <li class="list-group-item">${veri.weather[0].description}</li>
          </ul>
        </div>
    </div>
    
    `

    
}

document.querySelector("input").addEventListener("keypress", function(event) {
  
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".btn-danger").click();
    }
});




const mouse = document.querySelector(".mouse")
var timeout;


document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    mouse.style.top = y + "px"
    mouse.style.left = x + "px"
    mouse.style.display = "block"

    function mouseStopped(){
        mouse.style.display = "none"
    }
    clearTimeout(timeout)
    timeout = setTimeout(mouseStopped, 1000)
})

document.addEventListener("mouseout", () => {
    mouse.style.display = "none"
})
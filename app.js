import conditon from './conditon.js';

const apikey = '5f6768a2150e4f83846130328242908'

const header = document.querySelector('.header')
const form = document.querySelector('.form')
const input = document.querySelector('.inputCity')

function removCrad() {
    const prevCard = document.querySelector('.card')
    if (prevCard) prevCard.remove()
}

function showError(erorMasage) {

    // otobrazit kartocki owibok
    const html = ` <div class="card">${erorMasage}</div> `

    header.insertAdjacentHTML('afterend', html)
}

function showCard({name, country, temp, condition, icon}) {
    const html = `
    <div class="card__card">
<div class="card">
        <h2 class="card__title">${name}<span>${country}</span></h2>
    <div class="card-city">
        <p class="card__text">${temp}<span>°c</span></p>
        <p class="card__cloud">${condition}</p>
    </div>
    <img src="https://${icon}" alt="" class="card__img">
</div>
</div>
`

    header.insertAdjacentHTML('afterend', html)
}

form.onsubmit = async function (e) {
    e.preventDefault()
    let city = input.value.trim()

    const data = await getWather(city)


        if (data.error) {
            removCrad()
            showError(data.error.message)
            
        } else {
            removCrad()

           const respons = await fetch('./conditon.js')
           console.log(respons);

           const info = conditon.find((obj) =>  obj.code === data.current.condition.code )
           console.log(info);
           console.log(info.languages[23]['day_text']);

            const weatherData = {
                name: data.location.name,
                country: data.location.country,
                temp: data.current.temp_c,
                condition: info.languages[23]['day_text'],
                icon: data.current.condition.icon
            }

            showCard(weatherData)
        }
}

async function getWather(city) {
    const url = ` http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
    const respons = await fetch(url)
    const data = await respons.json()
    console.log(data);
    return data
}

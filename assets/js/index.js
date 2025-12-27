// "use strict"
let todayDesc = document.querySelector("#apod-explanation");
let todayCopy = document.querySelector("#apod-copyright");
let todayDate = document.querySelector("#apod-date-info");
let todayImg = document.querySelector("#apod-image");
let todayHDImg = document.querySelector("#apod-hd a");
let todayMedia = document.querySelector("#apod-media-type");
let todayTitle = document.querySelector("#apod-title");
let loader = document.querySelector("#apod-loading");
let dateInput = document.querySelector("#apod-date-input");
let shownDate = document.querySelector("#shown-date");
let dateDetails = document.querySelector("#apod-date-detail");
let navLinks = document.querySelectorAll("#nav-links a");
let sections = document.querySelectorAll("section");
let planetsCards = document.querySelectorAll(".planet-card");
let mainCardImg = document.querySelector("#featured-launch img");
let mainCardName = document.querySelector("#name-card-main");
let abbrevNameCard = document.querySelector("#abbrev-name-card");
let providerName = document.querySelector("#provider-name");
let configurationName = document.querySelector("#configuration-name");
let remainingDays = document.querySelector("#remaining-days");
let mainCardDate = document.querySelector("#main-card-date");
let mainCardTime = document.querySelector("#main-card-time");
let mainCardLocation = document.querySelector("#main-card-location");
let mainCardCountry = document.querySelector("#main-card-country");
let mainCardDesc = document.querySelector("#main-card-desc");
let launchesGrid = document.querySelector("#launches-grid");
let planetDetails = document.querySelector("#planet-details");
let planetId = '' ; 
let plaents = '' ;
for(let i = 0 ; i < planetsCards.length; i++){
    planetsCards[i].addEventListener('click' , () =>{
         planetId = planetsCards[i].getAttribute("data-planet-id") ; 
          searchAndShow(planetId , plaents) ;
        
    })
}

function showLoader() {
  loader.classList.remove("hidden");
}
function hideLoader() {
  loader.classList.add("hidden");
}

const apiKey = "lys0XSfixb5cUm6cd0QjwrdEwPNtjcxHnbl2X4Td";

async function getToDayImage() {
  try {
    let response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );

    if (response.ok) {
      showLoader();
      let backEndData = await response.json();
      todayImg.setAttribute("src", backEndData.url);
      todayDesc.innerHTML = backEndData.explanation;
      todayTitle.innerHTML = backEndData.title;
      todayCopy.innerHTML = backEndData.copyright;
      todayDate.innerHTML = backEndData.date;
      todayMedia.innerHTML = backEndData.media_type;
      todayHDImg.setAttribute("href", backEndData.hdurl);
      shownDate.innerHTML = dateInput.value = backEndData.date;
      dateDetails.innerHTML = backEndData.date;
    } else {
      throw new Error("The data was not retrieved.");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}
getToDayImage();
async function getLaunchs() {
  try {
    let response = await fetch(
      "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10"
    );

    if (response.ok) {
      let launchesData = await response.json();

    //   console.log(launchesData);
    //   console.log(launchesData.results[0].image.image_url);
      mainCardImg.setAttribute("src", launchesData.results[0].image.image_url);
      mainCardName.innerHTML = launchesData.results[0].name;
      abbrevNameCard.innerHTML = launchesData.results[0].status.abbrev;
      providerName.innerHTML =
        launchesData.results[0].launch_service_provider.name;
      configurationName.innerHTML =
        launchesData.results[0].rocket.configuration.name;
      mainCardLocation.innerHTML = launchesData.results[0].pad.location.name;
      mainCardCountry.innerHTML = launchesData.results[0].pad.country.name;
      mainCardDesc.innerHTML = launchesData.results[0].mission.description;
      mainCardDate.innerHTML = convertDateTime(
        launchesData.results[0].net
      ).date;
      mainCardTime.innerHTML = convertDateTime(
        launchesData.results[0].net
      ).time;
      remainingDays.innerHTML = getTheRemainingDays(
        launchesData.results[0].net
      );
      let box = "";

      for (let i = 1; i < launchesData.results.length; i++) {
        box += `
                    <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <!-- <i class="fas fa-space-shuttle text-5xl text-slate-700 absolute z-0"></i> -->
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 " 
                src="${
                  launchesData.results[i].image?.image_url ||
                  "https://via.placeholder.com/400x200?text=No+Image+Available"
                }" 
                alt="${launchesData.results[i].name}">
                <div class="absolute top-3 right-3 ">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launchesData.results[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launchesData.results[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launchesData.results[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${
                      convertDateTime(launchesData.results[i].net).date
                    }</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${
                      convertDateTime(launchesData.results[i].net).time
                    } UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${
                      launchesData.results[i].rocket.configuration.name
                    }</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${
                      launchesData.results[i].pad.location.name
                    }</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
                `;
      }
      launchesGrid.innerHTML = box;
    } else {
      throw new Error("The data was not retrieved.");
    }
  } catch (error) {
    console.error(error);
  }
}
getLaunchs();
async function getAllPlanets() {
  try {
    let response = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets');

    if (response.ok) {
       plaents = await response.json();
       searchAndShow("earth" , plaents) ;

        
    } else {
      throw new Error("The data was not retrieved.");
    }
  } catch (error) {
    console.error(error) ; 
  }
}
 getAllPlanets() ;
function moveBetweenSections(links, sections) {
  for (let i = 0; i < links.length; i++) {
    // bg-blue-500/10 , text-blue-400
    links[i].addEventListener("click", function (e) {
      for (let j = 0; j < links.length; j++) {
        links[j].classList.remove("bg-blue-500/10", "text-blue-400");
        links[j].classList.add("text-slate-300", "hover:bg-slate-800");
        sections[j].classList.add("hidden");
      }
      // console.log(links[i].getAttribute('data-section'));

      e.preventDefault();
      sections[i].classList.remove("hidden");
      this.classList.add("bg-blue-500/10", "text-blue-400");
      this.classList.remove("hover:bg-slate-800", "text-slate-300");
      document.querySelector("#sidebar").classList.remove("sidebar-open");
    });
  }
}

moveBetweenSections(navLinks, sections);
// open sidebar
document.querySelector("#sidebar-toggle").addEventListener("click", (e) => {
  e.stopPropagation();

  document.querySelector("#sidebar").classList.add("sidebar-open");
});
// close sidebar
document.addEventListener("click", (e) => {
  if (!document.querySelector("#sidebar").contains(e.target))
    document.querySelector("#sidebar").classList.remove("sidebar-open");
});

function getTheRemainingDays(LaunchDate) {
  let launchD = new Date(LaunchDate);
  let currentDate = Date.now();
  let diff = launchD - currentDate;
  let ans = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.abs(ans);
}

function convertDateTime(date) {
  const objDate = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };
  let realDate = objDate.toLocaleDateString("en-US", options);
  let realTime = objDate.toLocaleTimeString("en-US", timeOptions);

  return {
    date: realDate,
    time: realTime,
  };
}
function searchAndShow(name , obj){
    let list = obj.bodies ; 
    let result = ''
    for(let i = 0 ; i < list.length; i++){
        if(list[i].englishName.toLowerCase() === name.toLowerCase()){
            result = `
                <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${list[i].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${list[i].englishName}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${list[i].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${((list[i].semimajorAxis)/1000000000).toFixed(2) }M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${list[i].meanRadius} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${list[i].mass.massValue} × 10^${list[i].mass.massExponent} kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${list[i].density} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${list[i].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${list[i].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${ list[i].moons === null ? 0 : list[i].moons.length}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${list[i].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >${list[i].discoveredBy === ''? 'Known since antiquity' :list[i].discoveredBy }</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >${list[i].discoveryDate === '' ? 'Ancient times' :list[i].discoveryDate }</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >${list[i].bodyType}</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${list[i].vol.volValue} × 10^${list[i].vol.volExponent}</span>
                  </div>
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass: ${list[i].mass.massValue} × 10^${list[i].mass.massExponent} kg </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Surface gravity: ${list[i].gravity} m/s² </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${list[i].density} g/cm³</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Axial tilt: ${list[i].axialTilt}°</span
                    >
                  </li>
                </ul>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      > ${((list[i].perihelion) / 1000000000).toFixed(2)}M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >${((list[i].aphelion) / 1000000000).toFixed(2)}M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      > ${list[i].eccentricity}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      > ${list[i].inclination}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >${list[i].axialTilt}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${list[i].avgTemp}°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >${list[i].escape / 1000} km/s</span
                    >
                  </div>
                </div>
              </div>
              <button
                class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
            `
        }
    }
planetDetails.innerHTML = result ; 

}



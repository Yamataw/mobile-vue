<template>
  <router-view/>
  <div class="bg-cyan-700 ">
    <br>
    <h1 class="mb-4 text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-5xl lg:text-1xl dark:text-white  text-center  ">
      Rechercher des villes</h1>
    <form>
      <div>
        <label for="default-search" class="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative mx-4">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-g  ray-400" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input v-on:input='api' type="search" id="default-search"
                 class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-cyan-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Paris, Moscou, Venise..." required
                 v-model="city" list="cities">
          <datalist id="cities" class=" ">
            <option v-for="city in cities" :key="city.name"> {{ city.name }}</option>
          </datalist>
          <button type="submit" v-on:click="search"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-cyan-700 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
            Rechercher
          </button>
        </div>
      </div>
    </form>
    <div
        class="text-white  center mt-5 mx-12 mb-10 transition duration-500 ease-in-out transform bg-cyan-900 rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6 ">
      <div class="text-3xl font-bold text-gray-900 mb-6">{{ meteo_searched.city }}</div>
      <div class="text-md font-bold flex flex-col text-white"><span class="uppercase">{{
          meteo_searched.time
        }}</span>
        <span class="font-normal text-gray-700 text-sm"></span></div>
        <img :src=image alt="meteo icon" class="w-48">
      <div class="text-3xl font-bold text-gray-900 mb-6">{{ meteo_searched.temperature }}</div>

    </div>
  </div>
</template>


<script>


export default {

  data() {

    return {
      image : "/icons/null.svg",
      cities: [],
      meteo_searched: []
    }
  },
  methods: {
    api() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      var search = document.getElementById('default-search')?.value
      if (!search.includes(',')) {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&language=fr`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              this.cities = result['results']
              if (this.cities !== undefined) {
                for (const city of this.cities) {
                  if (city.admin1 === undefined) {
                    city.name = [city.name, city.country].join(', ');
                  } else {

                    city.name = [city.name, city.admin1, city.country].join(', ');
                    console.log(this.cities)
                  }
                }
              }
            })
            .catch(error => console.log('error', error));

      }
    },


    weather(code) {
      let img_pth = "/icons/";
      console.log(code);
      if ([0].includes(code)) {
        console.log(code);
        img_pth += "0.svg";
      } else if ([1, 2, 3].includes(code)) {
        console.log(code);
        img_pth += "123.svg";
      } else if ([51, 53, 55].includes(code)) {
        console.log(code);
        img_pth += "515355.svg";
      } else if ([56, 57].includes(code)) {
        console.log(code);
        img_pth += "5657.svg";
      } else if ([61, 63, 65].includes(code)) {
        console.log(code);
        img_pth += "616365.svg";
      } else if ([66, 67].includes(code)) {
        console.log(code);
        img_pth += "6667.svg";
      } else if ([71, 73, 75].includes(code)) {
        console.log(code);
        img_pth += "717375.svg";
      } else if ([77].includes(code)) {
        console.log(code);
        img_pth += "77.svg";
      } else if ([80, 81, 82].includes(code)) {
        console.log(code);
        img_pth += "808182.svg";
      } else if ([85, 86].includes(code)) {
        console.log(code);
        img_pth += "8586.svg";
      } else if ([95].includes(code)) {
        console.log(code);
        img_pth += "95.svg";
      } else if ([96, 99].includes(code)) {
        console.log(code);
        console.log("9699.svg")
      }
      console.log(img_pth);
      return img_pth
    },

    search() {
      var text = document.getElementById("default-search").value;
      this.cities.forEach(value => {
        if (value.name === text) {
          var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${value.latitude}&longitude=${value.longitude}&hourly=temperature_2m,relativehumidity_2m&current_weather=true`, requestOptions)
              .then(response => response.json())
              .then(result => {
                this.meteo_searched = result["current_weather"];

                this.meteo_searched.city = value.name;
                this.meteo_searched.temperature = this.meteo_searched.temperature + " Cº"
                this.image = this.weather(this.meteo_searched.weathercode)
              })
              .catch(error => console.log('error', error));

        }
      });
    },


  }


}


</script>


<style scoped>


</style>
<template >
  <div class="w-64 md:mr-20 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6">
    <div class="text-md font-bold flex flex-col text-gray-900"><span class="uppercase">Ajd</span> <span class="font-normal text-gray-700 text-sm"></span></div>
    <div class="w-32 h-32 flex items-center justify-center">
    </div>

    <p class="text-gray-700 mb-2">{{weatherCode}}</p>
    <div class="text-3xl font-bold text-gray-900 mb-6">{{temperature}}º</div>
  </div>
</template>

<script>
export default {
  name: "MeteoCard",

  props:{
    city: String,
    country: String,
    temperature: String,
    weatherCode: Number
  },


  data() {
    return {
    }
  },

  created() {
  }
}
</script>

<style scoped>

</style>
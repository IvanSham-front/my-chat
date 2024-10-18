import { defineStore } from "pinia";

const colors = ['#FFADAD', '#FFD6A5', '#FFD6A5', '#f2cc8f', '#06d6a0', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];

export const useColorStore = defineStore('colors', {

	state: () => ({ list: colors }),

});
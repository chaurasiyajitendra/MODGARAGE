import { createSlice } from "@reduxjs/toolkit";
import { carsData } from "../../utils/vehiclesData";


const initailState = {
    car: carsData,
}

const carSlice = createSlice({
    name:"cars",
    initialState: initailState,
    reducers:{

    }
})

export default carSlice.reducer;

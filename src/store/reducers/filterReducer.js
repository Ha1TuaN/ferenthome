import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address: '',
    province: '',
    district: '',
    priceRange: [0, 100000000],
    areaRange: [0, 1000],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setProvince: (state, action) => {
            state.province = action.payload;
        },
        setDistrict: (state, action) => {
            state.district = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setAreaRange: (state, action) => {
            state.areaRange = action.payload;
        },
    },
});

export const { setAddress, setProvince, setDistrict, setPriceRange, setAreaRange } = filterSlice.actions;
export default filterSlice.reducer;

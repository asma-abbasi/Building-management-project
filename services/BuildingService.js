import axios from "axios";
import BaseUrl from "./BaseUrl";
import authHeader from "./authHeader";


const BuildingService = {
    saveProfileInfo: (param) => {
        //console.log('param', param);
        return axios.put(BaseUrl() + "/api/building/v1/user/update", param
            , { headers: authHeader() });
    },
    addHouse: (param) => {
        //console.log('param', param);
        return axios.post(BaseUrl() + "/api/building/v1/house/add", param
            , { headers: authHeader() });
    },
    addHouseUser: (param) => {
        return axios.post(BaseUrl() + "/api/building/v1/house/user/add", param
            , { headers: authHeader() });
    },
    addHouseWageType: (param) => {
        return axios.post(BaseUrl() + "/api/building/v1/house/housewagetype/add", param
            , { headers: authHeader() });
    },
    addHouseWage: (param) => {
        return axios.post(BaseUrl() + "/api/building/v1/house/housewage/add", param
            , { headers: authHeader() });
    },
    calcHouseWage: (param) => {
        return axios.post(BaseUrl() + "/api/building/v1/house/housewage/calculate", param
            , { headers: authHeader() });
    },
    getHouseByUserId: (param) => {
        //console.log('param', param);
        return axios.post(BaseUrl() + "/api/building/v1/house/search", param
            , { headers: authHeader() });
    },
    getUserByUserId: (param) => {
        console.log('param', param);
        return axios.post(BaseUrl() + "/api/building/v1/user/search", param
            , { headers: authHeader() });
    },
    getAllHouseUsers: (param) => {
        console.log('param', param);
        return axios.post(BaseUrl() + "/api/building/v1/user/search", param
            , { headers: authHeader() });
    },
    getHouseWageTypeBySearch: (param) => {
        console.log('param', param);
        return axios.post(BaseUrl() + "api/building/v1/house/housewagetype/search", param
            , { headers: authHeader() });
    }

    ///user/add
}
export default BuildingService;
import Axios from "axios";

const baseUrl = 'https://qa.manna-irrigation.com:8443/omer/api/v2'

//get the authorization token for a specific user 
export async function getToken(email, pass) {
    let tokenResult = await Axios({
        method: 'POST',
        url: baseUrl + "/users/login",
        data: {
            email: email,
            password: pass
        }
    })
    localStorage.setItem('token', tokenResult.data.user_api_token);
    return tokenResult;
}
//get the farms data for a specific user 
export async function getFarms() {
    return await getMethod(baseUrl + "/farms", {});
}
//get all the fields for a specific farm
export async function getFields(farmId) {
    return await getMethod(baseUrl + "/fields?", { farm_id: farmId });
}

//axios get call to the api
export async function getMethod(url, params) {
    return await Axios({
        method: 'GET',
        url: url,
        params: params,
        timeout: 5000,
        headers: {
            'X-User-Api-Token': localStorage.getItem('token')
        }
    })
}

//extract the relevant data (id and name) for all the farms
export async function getFarmsData() {
    let userFarms = await getFarms()
    userFarms = userFarms.data.map(function(f) {
        return {
            id: f.id,
            name: f.name,
            open: false
        }
    })
    return userFarms;

}

//extract the relevant data (id and name) for all the specific farm fields
export async function getFieldsData(farmId) {
    let fields = await getFields(farmId)
    fields = fields.data.map(function(f) {
        return {
            id: f.id,
            name: f.name
        }
    })
    return fields;
}

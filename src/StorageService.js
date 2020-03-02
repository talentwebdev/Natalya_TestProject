//////////////////////////////////////////////////
///
/// Save the data when page refresh 
/// Create : From siraj
///
//////////////////////////////////////////////////
import {AsyncStorage} from "AsyncStorage";

export function _storeData(data)
{
    AsyncStorage.setItem("data", JSON.stringify(data));
}

export function _fetchData(callback)
{
    AsyncStorage.getItem("data").then(data => {callback(data);})
}
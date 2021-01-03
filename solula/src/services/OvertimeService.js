import AsyncStorage from "@react-native-community/async-storage";
import UrlList from "../utils/UrlList";
import HeaderConfig from "../utils/HeaderConfig";
import UrlFormBodyEncode from "../utils/UrlFormBodyEncode";

const overtimeList = async (state, employee_id, order, offset = '', limit = '') => {
  console.log('test')
    const formBody = UrlFormBodyEncode({
      state,
      employee_id,
      order,
      offset,
      limit
    });
    const url = UrlList('overtime_list') + formBody;
    const response = await fetch(url,
      HeaderConfig('GET', 'application/json', 'application/x-www-form-urlencoded', null, await AsyncStorage.getItem('access_token')));
    return response;
}

export {
  overtimeList
}
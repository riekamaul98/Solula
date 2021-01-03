export default UrlFormBodyEncode = function(dataPosts){
  let formBody = []
  for(let property in dataPosts){
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(dataPosts[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody
}

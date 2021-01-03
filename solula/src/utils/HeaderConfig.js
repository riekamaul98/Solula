export default HeaderConfig = function(method, accept, contentType, formBody, accessToken){

  let header = new Object();

  if(method != null){
      header.method = method
  }
  header.credentials = 'same-origin'

  if(accessToken != null){
      header.headers = {
          'access_token' : accessToken,
          'Accept': accept,
          'Content-Type': contentType
      }
  }else{
      header.headers = {
          'Accept': accept,
          'Content-Type': contentType
      }
  }
  
  if(formBody != null){
      header.body = formBody
  }


  return header
}

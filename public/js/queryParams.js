function getQueryVariable(variable) {
  var querySrtring = window.location.search.substring(1);
  var variables = querySrtring.split('&');
  for(var i = 0; i< variables.length; i ++){
    var pairRoom = variables[i].split('=');
    if(decodeURIComponent(pairRoom[0]) == variable){
      return decodeURIComponent(pairRoom[1]);
    }
  }
  return undefined;
}

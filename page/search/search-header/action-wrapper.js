const DEFAULT_TIMEOUT = 5000;
var currentTimeout;
function actionWrapper(searchAction, context){
  return function(){
    context = context || this || {};
    var args = arguments;
    if(currentTimeout){
      //Cancel previous search action.
      window.clearTimeout(currentTimeout);
    }
    currentTimeout = window.setTimeout(
      function(){
        searchAction.apply(context, args)
      },
      DEFAULT_TIMEOUT
    );
    return currentTimeout;
  };
}
module.exports = actionWrapper;

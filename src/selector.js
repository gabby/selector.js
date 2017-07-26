var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if (matchFunc(startEl)){
      resultSet.push(startEl);
    }
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // loop through starting elements; if any match, then push into resultSet
  for (var i=0; i<startEl.children.length; i++){
      resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.children[i]))
      
  }

  

  // if (matchFunc(X) === true){
  //   resultSet.push(X)
  // }
  
  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  if (selector.slice(0,1) === '#')
    return 'id';
  else if (selector.slice(0,1) === '.')
    return 'class';
  else if (selector.split('.').length > 1) 
    return 'tag.class';
  else
    return 'tag';
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id
    matchFunction = function(newEl){
      if (newEl.id === selector.slice(1)){
        return true;
      } else {
        return false 
      }
    }

  } else if (selectorType === "class") {
    // define matchFunction for class

    matchFunction = function(newEl){
      // put the 3 classes in an array 
      var classArray= newEl.className.split(" ");
      // make a for loop
      for (var i=0; i<classArray.length; i++){
          if (classArray[i]=== selector.slice(1)){
            return true;
          }
      }
      return false;
    }

  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
      matchFunction = function(newEl){
        var selectorArray = selector.split(".")
        var classArray = newEl.className.split(" ");
        if (classArray.includes(selectorArray[1]) && newEl.tagName.toLowerCase()=== selectorArray[0]){
          return true;
        } else {
          return false;
        }
      }

  } else if (selectorType === "tag") {
    // define matchFunction for tag
    matchFunction = function(newEl){
      console.log(newEl.tagName)
      if (newEl.tagName.toLowerCase() === selector){
        return true;
      } else {
        return false;
      }
    }

  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

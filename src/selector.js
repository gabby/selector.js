var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if (matchFunc(startEl)){
      resultSet.push(startEl);
  }
  for (var i=0; i<startEl.children.length; i++){
      resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.children[i]))
  }
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
    matchFunction = function(newEl){
      // if (newEl.id === selector.slice(1)) return true;
      // return false; 
      return newEl.id === selector.slice(1);
    };
  } else if (selectorType === "class") {
    matchFunction = function(newEl){
      var classArray= newEl.className.split(" ");
    //   for (var i=0; i<classArray.length; i++){
    //       if (classArray[i]=== selector.slice(1)){
    //         return true;
    //       }
    //   }
    //   return false;
    // }
      return classArray.indexOf(selector.slice(1)) !== -1; 
    }
  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
      matchFunction = function(newEl){
        var tag = selector.split(".")[0];
        var tagClass = selector.split(".")[1];
        var classArray = newEl.className.split(" ");
        return classArray.indexOf(tagClass) !== -1 && newEl.tagName.toLowerCase()=== tag; 
      }
  } else if (selectorType === "tag") {
    // define matchFunction for tag
    matchFunction = function(newEl){
      return newEl.tagName.toLowerCase() === selector;
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

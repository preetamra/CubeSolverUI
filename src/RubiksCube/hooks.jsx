export const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const maxKey = (v) => {
    let absComponent = Object.values(v).map(number => Math.abs(number))
    let maxIndex = absComponent.indexOf(Math.max.apply(Math, absComponent))
  
    return Object.keys(v)[maxIndex];
}

function splicedRubik(array1, array2){
    function comparer(otherArray){
      return (current) =>{
        return otherArray.filter((other) =>{
          return other.key === current.key
        }).length === 0;
      }
    }
    var onlyInA = array1.filter(comparer(array2));
    var onlyInB = array2.filter(comparer(array1));

    return onlyInA.concat(onlyInB)
}

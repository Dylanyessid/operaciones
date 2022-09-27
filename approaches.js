export const  optimistApproach = (matrix) =>{
    let betters = []
    for (let index = 0; index < 3; index++) {
        betters.push(Math.max(matrix[index][0], matrix[index][1]))
    }

    const best = Math.max(...betters)
    return {
      value: best,
      decission: Number(betters.indexOf(best) +1)
    };
}

export const conservatureApproach = (matrix) => {
  let worses = [];
  for (let index = 0; index < 3; index++) {
    worses.push(Math.min(matrix[index][0], matrix[index][1]));
  }

  const best = Math.max(...worses);
  return {
    value: best,
    decission: Number(worses.indexOf(best) + 1),
  };
};

export const executeMaxRepentance = (matrix) =>{
    const betterS1 = Math.max(matrix[0][0], matrix[1][0], matrix[2][0])
    const betterS2 = Math.max(matrix[0][1], matrix[1][1], matrix[2][1]);
    const maxRepentanceMatrixS1  = []
    const maxRepentanceMatrixS2 = [];
    for (let index = 0; index < 3; index++) {
        maxRepentanceMatrixS1.push(betterS1-matrix[index][0])
        maxRepentanceMatrixS2.push(betterS2 - matrix[index][1]);
    }
    const finalArray = []
    for (let index = 0; index < 3; index++) {
       finalArray.push(Math.max(maxRepentanceMatrixS1[index], maxRepentanceMatrixS2[index]))
    }
    const value = Math.min(...finalArray)
    return {
      value,
      decission: Number(finalArray.indexOf(value)+1)
    };
}
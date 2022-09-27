 export const calculateEcuacion = (s1,s2) =>{{
    
    const formula =  (s1-s2) + "p" + "+" + " (" + s2 + ")";
    let p0 = s2;
    let p1 = s1 - s2 + s2;
    return {
        y0:p0,
        y1:p1,
        x0:0,
        x1:1,
        formula
    }
}}

export const getIntersect =(x0,y0,x1,y1,x2,y2,x3,y3) =>{
    let denominator = (y3-y2)*(x1-x0)- (x3-x2)*(y1-y0);
    if(denominator==0){
        return null;
    }
    let ua = ((x3 - x2) * (y0 - y2) - (y3 - y2) * (x0 - x2)) / denominator;
    let ub = ((x1 - x0) * (y0 - y2) - (y1 - y0) * (x0 - x2)) / denominator;
    return {
      x: x0 + ua * (x1 - x0),
      y: y0 + ua * (y1 - y0),
      seg1: ua >= 0 && ua <= 1,
      seg2: ub >= 0 && ub <= 1,
    };
}

export const getExpectedValueWithIntersects = (s1,s2, p) =>{
    return (s1 - s2)*p + s2;
}
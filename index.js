import {calculateEcuacion, getExpectedValueWithIntersects, getIntersect} from "./graphicAnalisis.js";
import { calculateExpecetedValue } from "./expectedValue.js";
import {calculateProbability} from "./bayes.js"
import { conservatureApproach, executeMaxRepentance, optimistApproach } from "./approaches.js";


const showGraphic = (x1, y1, x2,y2, x3,y3) =>{
  const TESTER = document.getElementById("plotlyChart");

  let data;
  if((x3[0]==0 && y3[0]==0)){
      data = [
        {
          x: x1,
          y: y1,
          name: "D1",
          line: { shape: "spline" },
        },
        {
          x: x2,
          y: y2,
          name: "D2",
          line: { shape: "spline" },
        },
      ];

      
  }else{
    data = [
      {
        x: x1,
        y: y1,
        name: "D1",
        line: { shape: "spline" },
      },
      {
        x: x2,
        y: y2,
        name: "D2",
        line: { shape: "spline" },
      },
      {
        x: x3,
        y: y3,
        name: "D3",
        line: { shape: "spline" },
      },
    ];
  }

  Plotly.newPlot(
    TESTER,
    data,
    {
      margin: { t: 0 },
    },
    { showSendToCloud: true }
  );
}



document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault()
    const s1 = Number(document.getElementById("s1").value);
    const s1d2 = Number(document.getElementById("s1d2").value);
    const s1d3 = Number(document.getElementById("s1d3").value);

    const s2 = Number(document.getElementById("s2").value);
    const s2d2 = Number(document.getElementById("s2d2").value);
    const s2d3 = Number(document.getElementById("s2d3").value);

    console.log(s2d3==0 && s1d3==0)

    const pS1 = Number(document.getElementById("pS1").value)/100;
    const pS2 = Number(document.getElementById("pS2").value)/100;
   
    const matrix = [[s1,s2], [s1d2,s2d2] ,[s1d3,s2d3]]

    const optimistValue = optimistApproach(matrix)
    const conservatureValue = conservatureApproach(matrix)
    const maxRepentance = executeMaxRepentance(matrix)
    console.log(maxRepentance)
 
    document.getElementById("approaches").innerText = `
    Mejor decisión según OPTIMISTA ES: ${optimistValue.decission} con valor de ${optimistValue.value}
    Mejor decisión según CONSERVADOR ES: ${conservatureValue.decission} con valor de ${conservatureValue.value}
    Mejor decisión según MAXIMO ARREPENTIMIENTO ES: ${maxRepentance.decission} con valor de ${maxRepentance.value}
    `

    const maxS1 = (
      Math.max(Number(matrix[0][0]), Number(matrix[1][0]), Number(matrix[2][0]))
    );

    const maxS2 = Math.max(
      Number(matrix[0][1]),
      Number(matrix[1][1]),
      Number(matrix[2][1])
    );

  const e_v_d1 = calculateExpecetedValue(pS1,pS2,s1,s2)
  const e_v_d2 = calculateExpecetedValue(pS1, pS2, s1d2, s2d2);
  const e_v_d3 = calculateExpecetedValue(pS1, pS2, s1d3, s2d3);

  const max_expected_value = Number(Math.max(e_v_d1, e_v_d2, e_v_d3))

  const VEA = (calculateExpecetedValue(pS1, pS2, maxS1, maxS2) - max_expected_value).toFixed(4);
    console.log(VEA)

    const result_d1 = calculateEcuacion(s1,s2);
    const result_d2 = calculateEcuacion(s1d2,s2d2);
    const result_d3 = calculateEcuacion(s1d3,s2d3)
  
    const intsersect_d1_and_d2 = (getIntersect(result_d1.x0, result_d1.y0, result_d1.x1, result_d1.y1, result_d2.x0, result_d2.y0, result_d2.x1, result_d2.y1))
    const intsersect_d1_and_d3 = getIntersect(
      result_d1.x0,
      result_d1.y0,
      result_d1.x1,
      result_d1.y1,
      result_d3.x0,
      result_d3.y0,
      result_d3.x1,
      result_d3.y1
    );

    const intsersect_d2_and_d3 = getIntersect(
      result_d2.x0,
      result_d2.y0,
      result_d2.x1,
      result_d2.y1,
      result_d3.x0,
      result_d3.y0,
      result_d3.x1,
      result_d3.y1
    );
    
    const prob_s1F = Number(document.getElementById("pF/s1").value)/100
    const prob_s1U = Number(document.getElementById("pU/s1").value) / 100;
    const prob_s2F = Number(document.getElementById("pF/s2").value) / 100;
    const prob_s2U = Number(document.getElementById("pU/s2").value) / 100;
  
    console.log("REV " + pS1*prob_s1F) + (pS2*prob_s2F)
    console.log("REV " + (pS1*prob_s1U) + (pS2*prob_s2U));

    const probabilityF = (pS1*prob_s1F) + (pS2*prob_s2F)
    const probabilityU = (pS1*prob_s1U) + (pS2*prob_s2U);

    const s1F = calculateProbability(prob_s1F,pS1,probabilityF)
    const s1U = calculateProbability(prob_s1U, pS1, probabilityU);
   
    
    const s2F = calculateProbability(prob_s2F, pS2, probabilityF)
    const s2U = calculateProbability(prob_s2U, pS2, probabilityU);
 
   

    const pays = {
      payS1D1:s1,
      payS2D1: s2,
      payS1D2: s1d2,
      payS2D2: s2d2,
      payS1D3: s1d3,
      payS2D3: s2d3
    }

    const favorableValues = {
      probabilityF,
      s1F,
      s2F
    };

    const unfavorableValues = {
      probabilityU,
      s1U,
      s2U
    }
    


    showTreeDiagram(pays, favorableValues, unfavorableValues)

    const eVFD1 = (calculateExpecetedValue(s1F,s2F,pays.payS1D1,pays.payS2D1))
    const eVFD2 = calculateExpecetedValue(s1F, s2F, pays.payS1D2, pays.payS2D2);
    const eVFD3 = calculateExpecetedValue(s1F, s2F, pays.payS1D3, pays.payS2D3);

    const eVUD1 = calculateExpecetedValue(s1U, s2U, pays.payS1D1, pays.payS2D1);
    const eVUD2 = calculateExpecetedValue(s1U, s2U, pays.payS1D2, pays.payS2D2);
    const eVUD3 = calculateExpecetedValue(s1U, s2U, pays.payS1D3, pays.payS2D3);

    const veod = (
      calculateExpecetedValue(
        probabilityF,
        probabilityU,
        Math.max(eVFD1, eVFD2, eVFD3),
        Math.max(eVUD1, eVUD2, eVUD3)
      ).toFixed(4)
    );

    const IVIM = (veod-max_expected_value).toFixed(4)
    const efficience = ((IVIM/VEA)*100);

  
    document.getElementById("expectedValues").innerText = `
    Valor Esperado D1: ${e_v_d1}
    Valor Esperado D2: ${e_v_d2}
    Valor Esperado D3: ${e_v_d3}
    `;

    document.getElementById("analisis").innerText = `
    Ecuación D1: ${result_d1.formula}
    Ecuación D2: ${result_d2.formula}
    Ecuación D3: ${result_d3.formula}

    Intersecto D1 y D2: (${intsersect_d1_and_d2.x} , ${intsersect_d1_and_d2.y})
    Intersecto D1 y D3: (${intsersect_d1_and_d3.x} , ${intsersect_d1_and_d3.y})
    Intersecto D2 y D3: (${intsersect_d2_and_d3.x} , ${intsersect_d2_and_d3.y})

    Valor esperado Ecuacion D1 = Ecuacion D2: ${getExpectedValueWithIntersects(
      s1,
      s2,
      intsersect_d1_and_d2.x
    )} con probabilidad del ${intsersect_d1_and_d2.x * 100}%
    Valor esperado Ecuacion D1 = Ecuacion D3: ${getExpectedValueWithIntersects(
      s1d3,
      s2d3,
      intsersect_d1_and_d3.x
    )} con probabilidad del ${intsersect_d1_and_d3.x * 100}%
     Valor esperado Ecuacion D2 = Ecuacion D3: ${getExpectedValueWithIntersects(
       s1d2,
       s2d2,
       intsersect_d2_and_d3.x
     )} con probabilidad del ${intsersect_d2_and_d3.x * 100}%

    `;

    document.getElementById("treeInformation").innerText = `

      Valor esperado del estudio favorable en D1: ${eVFD1}
      Valor esperado del estudio favorable en D2: ${eVFD2}
      Valor esperado del estudio favorable en D3: ${eVFD3}

      Valor esperado del estudio desfavorable en D1: ${eVUD1}
      Valor esperado del estudio desfavorable en D2: ${eVUD2}
      Valor esperado del estudio desfavorable en D3: ${eVUD3}

      
      Valor esperado más alto del estudio FAVORABLE: ${Math.max(
        eVFD1,
        eVFD2,
        eVFD3
      )}
      Valor esperado más alto del estudio DESFAVORABLE: ${Math.max(
        eVUD1,
        eVUD2,
        eVUD3
      )}
      VEOD: ${veod}
      IVIM: ${IVIM}
      Eficiencia: ${efficience.toFixed(4)}%
    
    `;
    showGraphic(
      [result_d1.x0, result_d1.x1], [result_d1.y0, result_d1.y1],
      [result_d2.x0, result_d2.x1], [result_d2.y0, result_d2.y1],
      [result_d3.x0, result_d3.x1], [result_d3.y0, result_d3.y1]
      );
    
})


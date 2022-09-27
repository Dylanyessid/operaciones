const showTreeDiagram = (withoutStudy, favorableValues, unfavorableValues)=>{
  simple_chart_config = {
    chart: {
      container: "#treeDiagram",
      rootOrientation: "WEST",
      levelSeparation: 20,
      connectors: { type: "step" },
      node: {
        drawLineThrough: true,
      },
    },
    nodeStructure: {
      text: { name: "Raíz" },
      children: [
        {
          children: [
            {
              text: {
                name: "D1",
              },
              children: [
                { text: { name: withoutStudy.payS1D1 } },
                { text: { name: withoutStudy.payS2D1 } },
              ],
            },
            {
              text: {
                name: "D2",
              },
              children: [
                { text: { name: withoutStudy.payS1D2 } },
                { text: { name: withoutStudy.payS2D2 } },
              ],
            },
            {
              text: {
                name: "D3",
              },
              children: [
                { text: { name: withoutStudy.payS1D3 } },
                { text: { name: withoutStudy.payS2D3 } },
              ],
            },
          ],
          text: { name: "Sin Estudio" },
        },
        {
          text: {
            name: "Fav. => " + favorableValues.probabilityF.toFixed(4),
          },
          children: [
            {
              text: {
                name: "D1",
              },
              children: [
                {
                  text: {
                    name:
                      withoutStudy.payS1D1 +
                      ".    Prob => " +
                      favorableValues.s1F.toFixed(4),
                  },
                },
                {
                  text: {
                    name:
                      withoutStudy.payS2D1 +
                      ".    Prob => " +
                      favorableValues.s2F.toFixed(4),
                  },
                },
              ],
            },
            {
              text: {
                name: "D2",
              },
              children: [
                {
                  text: {
                    name:
                      withoutStudy.payS1D2 +
                      ".    Prob => " +
                      favorableValues.s1F.toFixed(4),
                  },
                },
                {
                  text: {
                    name:
                      withoutStudy.payS2D2 +
                      ".    Prob => " +
                      favorableValues.s2F.toFixed(4),
                  },
                },
              ],
            },
            {
              text: {
                name: "D3",
              },
              children: [
                {
                  text: {
                    name:
                      withoutStudy.payS1D3 +
                      ".    Prob => " +
                      favorableValues.s1F.toFixed(4),
                  },
                },
                {
                  text: {
                    name:
                      withoutStudy.payS2D3 +
                      ".    Prob => " +
                      favorableValues.s2F.toFixed(4),
                  },
                },
              ],
            },
          ],
        },
        {
          text: { name: "Desfav. =>" +unfavorableValues.probabilityU.toFixed(4) },
          children: [
            {
              text: { name: "D1" },
              children: [
                {
                  text: {
                    name:
                      withoutStudy.payS1D1 +
                      ".    Prob => " +
                      unfavorableValues.s1U.toFixed(4),
                  },
                },
                {
                  text: {
                    name:
                      withoutStudy.payS2D1 +
                      ".    Prob => " +
                      unfavorableValues.s2U.toFixed(4),
                  },
                },
              ],
            },
            {
              text: { name: "D2" },
              children: [
                {
                  text: {
                    name:
                      withoutStudy.payS1D2 +
                      ".    Prob => " +
                      unfavorableValues.s1U.toFixed(4),
                  },
                },
                {
                  text: {
                    name:
                      withoutStudy.payS2D2 +
                      ".    Prob => " +
                      unfavorableValues.s2U.toFixed(4),
                  },
                },
              ],
            },
            {
              text: { name: "D3" },
              children: [
                {
                  text: {
                    name:
                      withoutStudy.payS1D3 +
                      ".    Prob => " +
                      unfavorableValues.s1U.toFixed(4),
                  },
                },
                {
                  text: {
                    name:
                      withoutStudy.payS2D3 +
                      ".    Prob => " +
                      unfavorableValues.s2U.toFixed(4),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

  var my_chart = new Treant(simple_chart_config);
}

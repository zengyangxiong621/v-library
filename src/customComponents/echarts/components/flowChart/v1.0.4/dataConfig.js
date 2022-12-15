export const nodes = [{
    x: 0,
    y: 100,
    nodeName: "Log",
    type: "send",
    startColor: "#96C6FE",
    endColor: "#588CDB",
  },
  {
    x: 0,
    y: 300,
    nodeName: "全包",
    type: "send",
    startColor: "#96C6FE",
    endColor: "#588CDB",
  },
  {
    x: 0,
    y: 500,
    nodeName: "Netflow",
    type: "send",
    startColor: "#96C6FE",
    endColor: "#588CDB",
  },
  {
    x: 500,
    y: 300,
    nodeName: "Flume",
    type: "access",
    startColor: "#ADE8FF",
    endColor: "#67D4FF",
  },
  {
    x: 700,
    y: 300,
    nodeName: "Kafka",
    type: "access",
    startColor: "#ADE8FF",
    endColor: "#67D4FF",
  },
  {
    x: 900,
    y: 300,
    nodeName: "Spark",
    type: "access",
    startColor: "#ADE8FF",
    endColor: "#67D4FF",
  },
  {
    x: 1150,
    y: 300,
    nodeName: "Kafka",
    type: "forward",
    startColor: "#b4efd7",
    endColor: "#61DDAB",
  },
  {
    x: 1350,
    y: 300,
    nodeName: "Spark",
    type: "forward",
    startColor: "#b4efd7",
    endColor: "#61DDAB",
  },
  {
    x: 1800,
    y: 100,
    nodeName: "ES",
    type: "process",
    startColor: "#FFE8AB",
    endColor: "#F8C12F",
  },
  {
    x: 1800,
    y: 300,
    nodeName: "Kafka",
    type: "process",
    startColor: "#FFE8AB",
    endColor: "#F8C12F",
  },
  {
    x: 1800,
    y: 500,
    nodeName: "HDFS",
    type: "process",
    startColor: "#FFE8AB",
    endColor: "#F8C12F",
  },
];
export const labelNodes = [{
    x: 180,
    y: 150,
    name: "Log",
    bgColor: "#ebf3fc",
    type: "send",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 180,
    y: 350,
    name: "全包",
    bgColor: "#ebf3fc",
    type: "send",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 180,
    y: 550,
    name: "Netflow",
    bgColor: "#ebf3fc",
    type: "send",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 700,
    y: 430,
    name: "Kafka",
    bgColor: "#e4f6fe",
    type: "access",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1260,
    y: 430,
    name: "Kafka",
    bgColor: "#dff8ee",
    type: "forward",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1620,
    y: 150,
    name: "ES",
    bgColor: "#fef3d6",
    type: "process",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1620,
    y: 350,
    name: "Kafka",
    bgColor: "#fef3d6",
    type: "process",
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1620,
    y: 550,
    name: "HDFS",
    bgColor: "#fef3d6",
    type: "process",
    customData: {
      count: 0,
      rate: 0,
    },
  },
];
export const linesData = [{
    coords: [
      [0, 300],
      [500, 300],
    ],
    lineColor: "#316bc4",
    type: "send",
  },
  {
    coords: [
      [0, 100],
      [300, 100],
      [300, 300],
      [500, 300],
    ],
    lineColor: "#316bc4",
    type: "send",
  },
  {
    coords: [
      [0, 500],
      [300, 500],
      [300, 300],
      [500, 300],
    ],
    lineColor: "#316bc4",
    type: "send",
  },
  {
    coords: [
      [500, 300],
      [700, 300],
    ],
    lineColor: "#92defa",
    type: "access",
  },
  {
    coords: [
      [700, 300],
      [900, 300],
    ],
    lineColor: "#92defa",

  },
  {
    coords: [
      [900, 300],
      [1200, 300],
    ],
    lineColor: "#88dcb3",
    type: "forward",
  },
  {
    coords: [
      [1200, 300],
      [1300, 300],
    ],
    lineColor: "#88dcb3",
  },
  {
    coords: [
      [1300, 300],
      [1800, 300],
    ],
    lineColor: "#f9c541",
    type: "process",
  },
  {
    coords: [
      [1300, 300],
      [1500, 300],
      [1500, 100],
      [1800, 100],
    ],
    lineColor: "#f9c541",
    type: "process",
  },
  {
    coords: [
      [1300, 300],
      [1500, 300],
      [1500, 500],
      [1800, 500],
    ],
    lineColor: "#f9c541",
    type: "process",
  },

];

export const dashedLinesData = [{
    coords: [
      [400, 100],
      [1000, 100],
      [1000, 500],
      [400, 500],
      [400, 100],
    ],
    lineType: "dashed",
    lineColor: "#7cd7f8",
  },
  // {
  //   coords: [
  //     [1050, 100],
  //     [1450, 100],
  //     [1450, 500],
  //     [1050, 500],
  //     [1050, 100],
  //   ],
  //   lineType: "dashed",
  //   lineColor: "#7cd7f8",
  // },
];

export const bgImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASoAAACMCAYAAAG8D9T+AAABdWlDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokXWQvUvDUBTFT6tS0DqIDh0cMolD1NIKdnFoKxRFMFQFq1OafgltfCQpUnETVyn4H1jBWXCwiFRwcXAQRAcR3Zw6KbhoeN6XVNoi3sfl/Ticc7lcwBtQGSv2AijplpFMxKS11Lrke4OHnlOqZrKooiwK/v276/PR9d5PiFlNu3YQ2U9cl84ul3aeAlN//V3Vn8maGv3f1EGNGRbgkYmVbYsJ3iUeMWgp4qrgvMvHgtMunzuelWSc+JZY0gpqhrhJLKc79HwHl4plrbWD2N6f1VeXxRzqUcxhEyYYilBRgQQF4X/8044/ji1yV2BQLo8CLMpESRETssTz0KFhEjJxCEHqkLhz634PrfvJbW3vFZhtcM4v2tpCAzidoZPV29p4BBgaAG7qTDVUR+qh9uZywPsJMJgChu8os2HmwiF3e38M6Hvh/GMM8B0CdpXzryPO7RqFn4Er/QcXKWq8UwZBywAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAABKqADAAQAAAABAAAAjAAAAADn51vmAAAUhUlEQVR4Ae2dS4xdyVnH69R53L5tt8fjjO1xEjLY8ViRIAs0IxGBhBw0s8gEEEG4k2hWkbKIsmDHgg1oFmGJGIkNs0FZEMYdIEgZDTsEihCz4SWhDMhR7GnH2ONXPz3d95x68P/qPnzdvqaPe8rtap3/6b596tSp+k7Vr76uW1Wn6qtMjY63lze+nbm676013uFj8PHGZI3HNc6Zarw1xjlnvK2NRjiHME7BzxiTN5mxqjH5ADF9DU9vCr9tCoRbw+dQnje9pjHb29tmYWHBnDlzxrz00kuQm/lxGqbPmVx471+c9nzabiT2kr54+e4PnnZCdj4foDLt6u25nTcSuNbam2YzgYQ8lARtm3rjId8EPHRmTJrEfKrEbJOojmWpEkMln6aOuWaQ6H+lH6RJTG2ZNInZJlEdU+ajJIll+CbX+Ab6bALfQpMkhGYP/jj42Inv03dIelRoKIrj7Surv5+hiWrR2tQ4o/FqlPONtF59aLUao3FuQus1Mw7n0HJViGOUcXVjNFqw0nq1aPrmW8708wIezkjIqrGm3zehBfvcc8+Zzc1Ns7i4OBNI9v2frb//u59a+C1JWCqH6FZSzWkBI8qe3MFEtS0SkiKptgTahqNOkVRbAm3DUacONKnkRgOlSTxpeS5dXbty4dNHXm2LuEPhPED9RPKbfe+nH578+ukTRzqU+T1lNXS2cqe/t6fYHYuEHk2u0ZFLsi+fYlngJUGaY1hJwsLIADWrZclo3zSE1RYWxriTHEpumf59DYbBvDTf7ewrhZYPQwXPOqslK6V9vc1/w5a0dO6oWS1ZKV3XNTWrJS1dqoxNh7aw7OYKNastLJfnqy3DdjoYRh1sGM+6cePGL548eXLQaRq7ZP6BwT8Je3F549eUt19QHi+clXUK75uVz6xyzjtvnfYeb5Rxz9a4VrjOcG1xbb3ONBzeZd7gg4h4YZ1pTMEM15huObrO4MwgzoazG57xPruQ+LVIGyCedhhxg3PgSzlDsFxrbRymZjq7teWrnrJ5UbhBXWP+pvWYMhiut7a3nfjn90q3Ud5z+dqaK3BdVZU7dOiQ+/Hx4+6Pzp93yHx4774Lo8ntoFVvX934y1/9RO/NT/fLlckdOgIB0SZxZEvXNl+98MlDV4Iv/8wkILAwO7L505l36TkhIHM99Lln5n5v4kPHIwno42XOeumReO7fwGvU5v4VXY8koL0qZ65reGSMjt7QqqZGtSl77Us0IXnsSgBzOHcNwwAgoKuSHNoQ0Kyi2mCCRpUlusA8diXAOmpXRMMAWlGjWqHCGDr/9dqQ0nWbUAyD5gHGEMhhdwJJzi3ePdn7HwKdYtZRbbBTo9pQQhhdqYp1VAtY+Nbj914LTkGj2oTrfBjUUdSoNlqgVcU6qh2omhrVChTeyfNbrwUpPeA8lhaYpB2Fzl6rkB0PpJumYeu8hRLo/71583CLcJ0Pov9qefnfO09hFwAy7Sf/x+9+V2afrZ4/f/7YLuE7eXsykWxn7v/mw+0zMHX3D5hjluEl8r9Vuf5vrey9TMlUPsxUxLCMtrC2KMMzqN00Zip68ZYBQJnJqPGLk5xFNnzFGcJgTAdBHeKEwLgvLof7mPSoML0RP5ixiIjiRrwcAizuSTCZ/gjzgCJSWSRg9HyZLIlkhPAqhxvxrBsa2tEaHvIoSQaOEA5uC8tEIlpiTdKHeCE+fMe3xIARZDgs7RueJQpEFXKWmDjCfbnEo5RRkIszhOMXIcRT+SIko/BF4X0DQ0OlKkJ8CPLwQhjcC4Il+PAIPnifIUeB1/mYIhLCyvvq0atYX5bwxCFNvPEZawnQh6hEiNzwo4FZket7vZ74xzokKdehSA+1m+4vdr+28QPAOvKVTx7+VqynUk6nCPwEChb+KYJSXVxeu/TbJ4/8JhR8pi2tTqFhZj8OgVvSPNAXr6x+57lSv0mF+jgsGXdE4Lic0Ygxv3K2r/+FWEggBgG07XIsbLeNNPhiCKQMEhAC6Ly5ATSKSkV9iEZA7Obi3QwnVkcjSkGoqaytSxkH4UECkQhgWNFhuIwvkiPxpBgQwIpjN8BUM8IggWgE0KZq6rphTRWNKAXJOJWvuQqLmhCTAIYU0Ptj5y8m087L0jCPNODqvs7rQVQAMH+FBhWbVFGhdl0Yen92UFYcUe+6IsTMP+bTSfcvpkjK6joBjb25BxXtBHVdD6LmHzZF2fuLSpTClLbG1J62XagKEQlotNTZoooIlKLk3R/GqfDmj7MUqA3RCGiD9VhY0xNNIAWRAKYTZxj85DcgVSEeAZ1nlhoVjyclgQDW/HpZYco2FdUhGgE9aExNyzjReFIQCGA7Tc7QoybEJaCLSmHHrvuGIeKKp7QuEtDa2oesdnQRBPMcj4A+nOfrq6urHKiKx7TTkmCgw+rFxcW1f33//VudJsHMxyJwUwQFo4xf/uIXb7zxxhsfbG5uij0vHiTw2ARQQ13CZ00iToyeTUsRyx24fh6f+Wl/uklgisA23DegSA8tm5mpVBLx76599HO1r3/ZZ/oMDDNCz7DdM8weiolD2DcU04xO3GKpMZN9pMUfnwxmFIMbZhMzrH8euuEvJhZhSxGWF0M4ccDuGtzyi/sSXw4xzWiwbhozvYZmGIcmF4OJRgQR84veiGxYeoSJNicXo7hDa4yQ5TD1XuQabHoNkTnMI4qHWEkMm1DLfRwG9hTFQGMwsQiziS6XHbJh1RAmGWUXa7GHmMNHdq6GqV3IKnwOP9nZWvyK0b1xGDFCr3Ufu2VLHIQuhmfrSl+4LfiVMLID/9LChKTzla28qeAGMwN31UNu1g3OFs8pnNpUyswZMeno55rGN/2+7+MME4ximtHdBdxD2F17e3vbLyws+C3ZUfvcOXcSZ3zrCHu1srLiz50752/duuUvXLiADbgfb8dskfG4x0NKtfSzjT+H8c4vYavxjUqrf57Ls2Ux9SmFJAUvxSgmNUfuoZKJP8pg6Cc2N2HXEz4w2Cl/JHO4JxY9gx8UUex+isVNvHqEW0o+KKBIkfCivHAHG59wSyGiMBAHt4NyjsLgfQDMf6oCCj60ASgaAuXBA8XuZ5bJbGmZihGSPEorCizPxbynhx7BrijUCoqcS1rEliiem6MRIN7GwBdGPMWOZ/CHdhqYBi+KoY/cyPEj+ZMDcuGG4U+kCY+AJsIThj7lYTlUUCx9SgE1CAP1RHgoDq4kz2LjU36HFj2bYAUUUZ1UAyJbzD3h9ih+COWL+Xkn721LbLMu56lB7BBOFE+eB1uf2Nl9IGe5jHWsQEFvzxI2Uaq/uLxydL4s/nM+Vz/8jecPvzkrMP1IYAaBYJJx2j8o1buXLvU2+yf/55eO9L9+dqGYqX3TkegmgR0ENlFrXR/7hd7feu/Ejz93uPomFWqMhefHJHAY38yTXQv00vLqV2GX+/rnn+l98JiCGJwEpgmcGl8U6KW88aVTz/7O2INnEtgrAdRWc/ga3Nby/Xe4oomOvYJkvAcIDE1eY0QodD8fuMULEtgbgTmJptH9w6gKDxKIR0B2GKJSxeNJSSCAwWbWVNSEuATwNgTvP3iQQEQCk7dmEWVSVMcJYESBbaqO60D07Ms7fzbUo2PttkB8/bGm6rYKxM+9TGtiTRWfa6cl4utPZpXxIIF4BKRNxSGFeDwpCQTYpqIaRCcgbSrWVNGxdlugfP2xTdVtHYiee7apoiOlQCxyYu+PahCXAGoqLNLjQQIRCchSXbapIgKlKAwpSFVFECQQkwAWd/PdX0yglCWDn5ylQD2ITADTiflCOTLTzovjLIXOq0B8AGLliQ31+Fw7LRHr/hyHFDqtAvEzz4Z6fKadl6izjA31zmtBZACoqdimisy08+JkQJ1z1DuvBnEBwEQrNrzlQQIRCWjFNlVEnBQlBMSMOMepqAtRCWCWQsZxqqhIKQw6xYY61SAuATTUOU4VFymlYfCTvT+qQVwC8pqGDfW4TDsvTexTsaHeeTWIC0Bn+slv1RU3yZSWOgHaUki9hA5g+nTOhvoBLLa0k4w2FQc/0y6ig5c6GVJg7+/glVvSKUYznSPqSZfQAUwcen/YZ5gHCUQkgH2nafUlIk+KAgHWVFSD6ATYpoqOlAJ1UXBIgWoQlwBnKcTlSWkgoEutufCBqhCVgMbBIYWoSClMlIo1FfUgKgGx+TmIKpHCukzAS+a1apqPukyBeY9KIFRQ+j8uXboVVSyFdZnATcm83rp9e/XKlSuHukyCeY9DADNeQk2Vibh33nnn2VdeeeVEr9djTzAO3y5KuQalCk2poFRY+p5dvnz5xOnTp490kQbz/LEJrEOhPhxLCUolF6JY169f7586depT45s8k0ALAjegUBvT4SZKNe0JBTuK6+PTfnSTwA4Ct6FMKzv8wuVMpZoV8K+vb/yCNf7LKsteRb12Fh8sGVQ+EwkeFV3wkL+o8mDz0WMATORksqMSnAiHUPiB5Vrlwi34Iuw49vC+RIdfhhBudG8keygO8cf2lMfyJUqQ6/FU8RSx4ZyJPy7kGUgqosrU6RACCQuLaOUxcMNfLpGGoct5vBRFuuWWpNcpTGZEfkOm8JxRmoYPQijEC4LlKXBPL9ANT0B8MbAjeQppkMCQjh/kdeQf7iOcyEaa5W6wco849+0dTuU/PHx4z0rYkHzJOH5F8jDf4sBOaZJG5ZBnBBtucYX8wS2ZG3GRM0IGsZJPxMskZuAkg0+wuC+i8RzsveaVDXIlpRJp6CUPRp7wnGERIOwofp7nyhgzCqsRN4SQxHkNuSIgKBScwggBw7NEroSW58ozoVuh3R+iSzSV4y/kIqDWuc+RTFnIKr4hETjj2YhvoVUiV5Ig5YohWoQVd454Mq0QsSdxJJzEwwunYT8DQi0uRG6RFyGcxJUj19a5ogiyCty3LpdLr2rEyXPEr1UJj3F6qqqCKjlfykPKMviXOKvBQPmq8oUtnK88fiuU1ZZHXyfIlmch7iT/bm7O9yFCZM3Pz4ePiEQwOfmFhQWJ8rQPSY8UiXwalB+oPP6B/4vZxxLKyV/b/APk9xsQXkJPt+d09vfHevmPXj7W/69KSp4HCZAACeydgDTF76B+aXYT8VBF9bc3Nk40jVpCS+I0vsxWXjhc/eHLR3vv7yaI90mABEjgYxBYQ9xbqLQmrcdpWQ9UVBeX1/4EN79SZNnNl4/Nffsz8+X6dGC6SYAESOAJE7iLyurOzmeEikq6ee7q+rvo3r14tNB/9uqphR/uDMhrEiABEtgnAtIV/GC6dSXjqcotr15EJXX2eKX/mJXUPhUFH0MCJPAoAiVu/DzGxyc9Pv328t2voVf4+b7OfnT+5MI/PSom/UmABEhgHwkUeNYnxs+DEQX/63ib7J6t9LtjT55JgARIIAECk/kVMp3lRSTIfeZQ76cJJIxJIAESIIExAZmWBtN5ShWYdxgmYaKdNZzYNg7CMwmQAAkkQkDqJ0zc5P5ZiZQHk0ECJDCDABYIoKJysupg18mhM6LTiwRIgASePAHp+skiKFeznnrytPkEEiCBPREIS00R04RFkXsSwUgkQAIk8GQJaCzXNximmrm+5sk+mtJJgARIoB0BDdsbYn3CKPb92hFjKBIggX0nIEtoLOap02TLvqPnA0mABNoSkAmfBqbULMeo2iJjOBIggf0mgMF0Jy0qV4s5Qh4kQAIkkCABTFHHSLrH/racnpBg8TBJJEACQkAMOVuxcU0cJEACJJAqAWxZICb7nanEAgwPEiABEkiQQBGW0GCnFY5QJVg6TBIJkEAgEGamh+kJHKOiSpAACSRKYLiEBluRlWXF2emJFhKTRQJdJ6Cx5ybmUWFhMqcndF0XmH8SSJYAtou12GdXKioeJEACJJAmAa0tjOZhr2zOo0qzgJgqEiABzKMatqhQWZWorniQAAmQQIIEZIwKhvNoijjBsmGSSIAERgS0sxadP+c4lk6dIAESSJWAVg6tqYyD6akWENNFAiSg1HDCJ0y9lBXHqKgQJEACaRLAGJUzGRb7pZk8pooESIAEpEWVyb5+3tZc7Ed9IAESSJSAtrJdludbv0TLh8kiARIAAQymo0WF2elVia3deZAACZBAggS0rKHhPKoES4ZJIgESmBBAi6rBPCrLwfQJEjpIgARSI6B9Vsjuo6ZUNPOSWuEwPSRAAkMCWllnNZbQcBcaqgQJkECqBGAzXZmw3i/VFDJdJEACnSegTdaIPSqOUXVeFQiABNIlgK4ffpwyFceo0i0lpowEOk5Ae4xRZVpaVJya3nFdYPZJIFkCOs+UxToaw2oq2TJiwkig8wS0sTU2IJUZCjxIgARIIE0CeOmXoUWFMaqqSjOFTBUJkEDnCWg0pYZLaGg+ofPKQAAkkCoBzKPyJqfN9FTLh+kiARIAAW0HtcvEggIPEiABEkiUgNZ5boL1hIpr/RItIyaLBDpPAGNUxmbs+nVeEQiABFImoAtV2mAznYPpKZcT00YCnSag6wb2qNii6rQSMPMkkDoBdP0yW6CiwjwqTvpMvbSYPhLoKAFUVLVVRWY6mn9mmwRI4AAQ0HOuMBUspw8OQGKZRBIggW4S0I02TsaoKs9daLqpAsw1CaRPQBfWmkxrTvhMv6yYQhLoLAENQ1RWs6LqrAIw4yRwEAho9PhsmXEw/SAUFtNIAl0loAfWbtnBYLtpmryrEJhvEiCBJAmY8RxPfaLf/+jOvXsr6+vrvSSTykSRAAl0lcD6OON6cXFx69bVq3dWV1fru5ub5fgGzyRAAiTwFAlIa+rO+Pkw7qnU66+/vvHee+8tr9682Wyyshqz4ZkESODpEJAtHK5MPzqbvlhaWqrOnj37zKkXXjjx/LFj3O9hGg7dJEAC+0HgNlpSKzsf9EBFJTfxFjB76623itdee23hOI5er8fNSXdS4zUJkEBsAlI53UElNXPN8UMV1c6no+KS7uFRfJ7FJ3QVd4bhNQmQAAnsgcAq4twdv9n7/+LvWlHNijyqvGTbmmL0YQU2CxT9SIAEpEcmRg9k9UvdplKahez/AKhN8nR+3n1HAAAAAElFTkSuQmCC"

export default {
  nodes,
  labelNodes,
  linesData,
  dashedLinesData,
  bgImage
};
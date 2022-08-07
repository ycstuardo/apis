let input1 = document.querySelector("#input1");
let TypeMoney = document.querySelector("#TypeMoney");
let buttonCal = document.querySelector("#button");
let dataArray = [];
let grafic = null;
let lastchange = 0;

async function ConectionServer() {
  try {
    currency = TypeMoney.value;

    const res = await fetch(`https://mindicador.cl/api/${currency}`);
    const data = await res.json();

    lastchange = data.serie[0].valor;
    let test = data.serie;

    calculo();
    dataArray = data.serie;

    const datChange = dataArray.map((x) => x.valor);

    const datLabel = dataArray.map((x) => x.fecha);

    chartRender(datLabel, datChange);
    document.querySelector("#error").innerHTML =
      "Mensaje del Servidor: conexión realizada";
  } catch (e) {
    document.querySelector("#error").innerHTML =
      "Mensaje del Servidor: No se pudo establecer la conexión";
    document.querySelector("#resultado").innerHTML = "....";
  }
}
function dateToday(ultimafecha) {
  var today = new Date();
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var year = today.getFullYear();
  let oscrfecha = `${day}-${month}-${year}`;

  return oscrfecha;
}

dateToday();

function chartRender(datLabel, datChange) {
  const ctx = document.getElementById("grafic").getContext("2d");
  if (grafic != null) {
    grafic.destroy();
  }
  grafic = new Chart(ctx, {
    type: "line",

    data: {
      labels: datLabel.reverse(),
      datasets: [
        {
          label: `Valor: ${currency.toUpperCase()}`,
          data: datChange.reverse(),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

function calculo() {
  let resultado = Number((input1.value / lastchange).toFixed(2));

  document.querySelector("#resultado").innerHTML = "Resultado  :  " + resultado;
}

button.addEventListener("click", () => {
  if (input1.value == "") {
    alert("Debe ingresar un valor");
    return;
  }
  
  if (isNaN(input1.value)) {
    alert("Solo puedes ingresar valores numéricos en la cantidad aconvertir");
    return;
  }
  ConectionServer();
});

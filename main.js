import "./style.scss";

let system = "metric";

let bmi = null;

const metricRadioBtn = document.querySelector('[id="metric"]');

const imperialRadioBtn = document.querySelector('[id="imperial"]');

const groupHeightCm = document.querySelector(".group--height-cm");

const groupHeightFt = document.querySelector(".group--height-ft");

const groupWeightKg = document.querySelector(".group--weight-kg");

const groupWeightLbs = document.querySelector(".group--weight-lbs");

const inputHeightCm = document.querySelector('[id="height-cm"]');
const inputHeightFt = document.querySelector('[id="height-ft"]');
const inputHeightIn = document.querySelector('[id="height-in"]');
const inputWeightKg = document.querySelector('[id="weight-kg"]');
const inputWeightSt = document.querySelector('[id="weight-st"]');
const inputWeightLbs = document.querySelector('[id="weight-lbs"]');

const bmiResult = document.querySelector(".bmi-result");

const bmiSubmit = document.querySelector(".bmi-submit");

const bmiForm = document.querySelector(".bmi-form");

const lowerWeightEl = document.getElementById("lower");
const upperWeightEl = document.getElementById("upper");
const categoryEl = document.getElementById("category");

const toggleMetricInput = function (show) {
  if (show) {
    groupHeightCm.classList.remove("hide-input");
    groupWeightKg.classList.remove("hide-input");
  } else {
    groupHeightCm.classList.add("hide-input");
    groupWeightKg.classList.add("hide-input");
  }
};

const toggleImperialInput = function (show) {
  if (show) {
    groupHeightFt.classList.remove("hide-input");
    groupWeightLbs.classList.remove("hide-input");
  } else {
    groupHeightFt.classList.add("hide-input");
    groupWeightLbs.classList.add("hide-input");
  }
};

const findHealthyRange = function (height) {
  return [
    (18.5 * Math.pow(height, 2)).toFixed(1),
    (24.9 * Math.pow(height, 2)).toFixed(1),
  ];
};

const categorizeBMI = function (bmi) {
  if (bmi < 18.5) return "underweight";
  if (18.5 < bmi < 24.9) return "heathly weight";
  if (25 < bmi < 29.9) return "overweight";
  if (bmi > 30) return "obese";
};

//Init

metricRadioBtn.checked = true;

bmiResult.classList.add("hide-input");

toggleImperialInput(false);

// Event handlers

metricRadioBtn.addEventListener("click", function () {
  system = "metric";

  imperialRadioBtn.checked = false;

  metricRadioBtn.checked = true;

  toggleMetricInput(true);

  toggleImperialInput(false);
});

imperialRadioBtn.addEventListener("click", function () {
  system = "imperial";

  metricRadioBtn.checked = false;

  imperialRadioBtn.checked = true;

  toggleImperialInput(true);

  toggleMetricInput(false);
});

bmiForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const range = [0, 0];

  if (system === "metric") {
    const kg = +inputWeightKg.value;

    const m = +inputHeightCm.value / 100;

    if (
      (+inputWeightKg.value && +inputWeightKg.value < 0) ||
      (inputHeightCm.value && inputHeightCm.value < 0)
    ) {
      return;
    }

    bmi = kg / Math.pow(m, 2);

    const range = findHealthyRange(m);

    const category = categorizeBMI(bmi);

    lowerWeightEl.textContent = range[0] + "kgs";
    upperWeightEl.textContent = range[1] + "kgs";

    categoryEl.textContent = category;
  }

  if (system === "imperial") {
    if (
      (+inputHeightIn.value && +inputHeightIn.value < 0) ||
      (+inputHeightFt.value && +inputHeightFt.value < 0) ||
      (+inputWeightLbs.value && +inputWeightLbs.value < 0) ||
      (+inputWeightSt.value && +inputWeightSt.value < 0)
    ) {
      return;
    }

    const inches = +inputHeightIn.value + 12 * +inputHeightFt.value;
    const lbs = +inputWeightLbs.value + 14 * +inputWeightSt.value;

    bmi = 703 * (lbs / Math.pow(inches, 2));

    console.log(inches);

    const range = findHealthyRange(inches * 0.0254);

    [range[0], range[1]] = [
      (2.20462 * range[0]).toFixed(1),
      (2.20462 * range[1]).toFixed(1),
    ];

    const category = categorizeBMI(bmi);

    lowerWeightEl.textContent = range[0] + "lbs";
    upperWeightEl.textContent = range[1] + "lbs";

    categoryEl.textContent = category;

    // (bmi =
    //   +inputHeightCm.value / Math.pow(+inputHeightIn.value, 2));
  }

  bmiSubmit.classList.add("hide-input");

  bmiResult.classList.remove("hide-input");

  bmiResult.querySelector(".result").textContent = bmi.toFixed(1);
});

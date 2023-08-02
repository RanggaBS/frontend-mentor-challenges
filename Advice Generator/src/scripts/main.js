const randomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const quoteId = document.querySelector(".quote-id");
const quoteText = document.querySelector(".quote-text");
const diceButton = document.querySelector(".dice-btn");
const loading = document.querySelector(".loading");

const ADVICE_URL_API = "https://api.adviceslip.com/advice";
const MIN_ADVICE_ID = 1,
	MAX_ADVICE_ID = 224;

const ToggleLoading = (show) => {
	if (show) {
		loading.classList.add("loading--is-loading");
	} else {
		loading.classList.remove("loading--is-loading");
	}
}

async function GetNewAdvice() {
	try {
		ToggleLoading(true);
		const response = await fetch(ADVICE_URL_API);
		const advice = await response.json();
		return advice.slip;
	} catch (error) {
		ToggleLoading(false);
		alert(error);
	}
}

const ChangeQuoteIdAndText = (adviceSlip) => {
	quoteId.textContent = `#${String(adviceSlip.id)}`;
	quoteText.textContent = String(adviceSlip.advice);
}

async function RandomizeAdvice() {
	const advice = await GetNewAdvice();
	ToggleLoading(false);
	ChangeQuoteIdAndText(advice);
}

const DiceButtonClickEvent = () => {
	diceButton.addEventListener("click", RandomizeAdvice)
}

const App = () => {
	DiceButtonClickEvent();
	RandomizeAdvice();
}

App();
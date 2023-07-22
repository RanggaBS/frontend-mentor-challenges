const form = document.querySelector("form");
const formInputContainer = form.children[0];
const formButtonContainer = form.children[1];

// console.log(formInputContainer.children[0])

const CreateErrorElement = function(message) {
	const el = document.createElement("span");
	el.textContent = String(message);
	return el;
}

const inputs = []
Array.from(formInputContainer.children).forEach(function (element, index) {
	const inputElement = element.children[1];

	inputs.push(element);

	inputElement.addEventListener("keyup", function (event) {
		if (inputElement.nextElementSibling) {
			// Remove "span" element (error message) if exist
			inputElement.nextElementSibling.remove();

			// Remove "error" class if exist
			inputElement.parentElement.classList.remove("error");
		}
	})
})


/*
	# Utilities
*/
const GetNumberOfDayInAMonth = function(month) {
	const year = new Date().getFullYear();
	const february =
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
		? 29
		: 28;
	const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return daysInMonth[month + 1];
}

const IsValidDay = function(date, month, year) {
	// const startYear = new Date().getFullYear();
	const february =
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
	? 29
	: 28;
	const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	return date >= 1 && date <= daysInMonth[month - 1];
}

const IsValidMonth = function(month) {
	return month >= 1 && month <= 12;
}

const IsValidYear = function(year) {
	const currentYear = new Date().getFullYear();
	const MINIMUM_YEAR = currentYear - (new Date().getYear());
	return year >= MINIMUM_YEAR && year <= currentYear;
}

const CalculateAge = function(day, month, year) {
	const today = new Date();
	const birthDate = new Date(`${year}-${month}-${day}`);

	let age = {};
	age.year = today.getFullYear() - birthDate.getFullYear();
	age.month = today.getMonth() - birthDate.getMonth();
	age.day = today.getDate() - birthDate.getDate();

	if (age.month < 0 || (age.month === 0 && age.day < 0)) {
		age.year--;
	}

	age.day = age.day < 0 ? age.day + GetNumberOfDayInAMonth(month) : age.day;
	age.month = age.month < 0 ? age.month + 12 : age.month;
	
	return [age.day, age.month, age.year];
}

/*
	# Stuff
*/
const LABEL_INPUT_EMPTY = "This field is required";
const LABEL_INPUT_INVALID = "Must be a valid";

const ValidateBirthDate = function() {
	const day = inputs[0].children[1];
	const month = inputs[1].children[1];
	const year = inputs[2].children[1];

	let isDayValid = true,
		isMonthValid = true,
		isYearValid = true;

	if (!day.nextElementSibling) {
		// If empty
		if (day.value.length < 1) {
			day.parentElement.classList.add("error");
			day.insertAdjacentElement("afterend", CreateErrorElement(LABEL_INPUT_EMPTY));

			isDayValid = false;
		}

		// If not valid day
		else if ( !IsValidDay(parseInt(day.value), parseInt(month.value), parseInt(year.value)) )  {
			day.parentElement.classList.add("error");
			day.insertAdjacentElement("afterend", CreateErrorElement(LABEL_INPUT_INVALID + " day"));

			isDayValid = false;
		}
	}

	if (!month.nextElementSibling) {
		if (month.value.length < 1) {
			month.parentElement.classList.add("error");
			month.insertAdjacentElement("afterend", CreateErrorElement(LABEL_INPUT_EMPTY));

			isMonthValid = false;
		}

		else if ( !IsValidMonth(parseInt(month.value)) ) {
			month.parentElement.classList.add("error");
			month.insertAdjacentElement("afterend", CreateErrorElement(LABEL_INPUT_INVALID + " month"));

			isMonthValid = false;
		}
	}

	if (!year.nextElementSibling) {
		if (year.value.length < 1) {
			year.parentElement.classList.add("error");
			year.insertAdjacentElement("afterend", CreateErrorElement(LABEL_INPUT_EMPTY));

			isMonthValid = false;
		}

		else if ( !IsValidYear(parseInt(year.value)) ) {
			year.parentElement.classList.add("error");
			year.insertAdjacentElement("afterend", CreateErrorElement(LABEL_INPUT_INVALID + " year"));

			isMonthValid = false;
		}
	}

	// Calculate age
	if ( isDayValid && isMonthValid && isYearValid ) {
		let age = {};
		[age.day, age.month, age.year] = CalculateAge(
			parseInt(document.querySelector("form").children[0].children[0].children[1].value),
			parseInt(document.querySelector("form").children[0].children[1].children[1].value),
			parseInt(document.querySelector("form").children[0].children[2].children[1].value)
		);

		document.querySelector(".output").children[0].children[0].textContent = String(age.year);
		document.querySelector(".output").children[1].children[0].textContent = String(age.month);
		document.querySelector(".output").children[2].children[0].textContent = String(age.day);
	}
}

form.addEventListener("submit", function (event) {
	event.preventDefault();
	ValidateBirthDate();
})
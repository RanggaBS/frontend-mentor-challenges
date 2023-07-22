const form = document.querySelector("form")

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const CreateErrorElement = function (message) {
	const el = document.createElement("span");
	el.textContent = String(message);
	return el
}

const ValidateForm = function () {
	const div_firstName = form.children[0];
	const div_lastName = form.children[1];
	const div_email = form.children[2];
	const div_password = form.children[3];

	const firstName = form.children[0].children[0];
	const lastName = form.children[1].children[0];
	const email = form.children[2].children[0];
	const password = form.children[3].children[0];

	var el;

	/* First name input */
	// If no span element (no error message)
	if (!div_firstName.children[1]) {
		
		if (firstName.value === '') {
			div_firstName.classList.add("error");
			firstName.insertAdjacentElement("afterend", CreateErrorElement("First Name cannot be empty"));
		}
		
		// If user fills only 2 character
		else if (firstName.value.length > 0 && firstName.value.length <= 2) {
			div_firstName.classList.add("error");
			firstName.insertAdjacentElement("afterend", CreateErrorElement("There's no one whose first name consists of only 2 letters!"));
		}
	}

	/* Last name input */
	if (!div_lastName.children[1]) {

		if (lastName.value === '') {
			div_lastName.classList.add("error");
			lastName.insertAdjacentElement("afterend", CreateErrorElement("Last Name cannot be empty"));
		}
		
		// If user fills only 2 character
		else if (lastName.value.length > 0 && lastName.value.length <= 2) {
			div_lastName.classList.add("error");
			lastName.insertAdjacentElement("afterend", CreateErrorElement("There's no one whose last name consists of only 2 letters!"));
		}
	}

	if (!div_email.children[1]) {

		if (email.value === '') {
			div_email.classList.add("error");
			email.insertAdjacentElement("afterend", CreateErrorElement("Email Address cannot be empty"));
		}

		// If the user fills in the email form incorrectly
		else if (!validateEmail(email.value)) {
			div_email.classList.add("error");
			email.insertAdjacentElement("afterend", CreateErrorElement("Looks like this is not an email"));
		}
	}

	if (!div_password.children[1]) {
		if (password.value === '' || password.value.length < 1) {
			div_password.classList.add("error");
			password.insertAdjacentElement("afterend", CreateErrorElement("Password cannot be empty"));
		}
		
		// If less than 6
		else if (password.value.length >= 1 && password.value.length <= 5) {
			div_password.classList.add("error");
			password.insertAdjacentElement("afterend", CreateErrorElement("Password must consist of at least 6 characters"));
		}
	}
}

form.addEventListener("submit", function (event) {
	event.preventDefault();
	ValidateForm();
})

// Input event
Array.from(form).forEach(function (element, index) {
	if (index <= 3) {
		element.addEventListener("keyup", function (a, b, c) {
			if (element.nextElementSibling) {
				element.nextElementSibling.remove();
			}
		})
	}
})

// console.log("valid?", validateEmail("abcgsdsa@gmail.com"))
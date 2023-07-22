document.addEventListener("DOMContentLoaded", function () {
	let buttons = document.querySelectorAll(".rating button");
	let buttonSubmit = document.getElementsByClassName("btn-submit").item(0);
	let rateCard = document.getElementsByClassName("card-rate").item(0);
	let thankYouCard = document.getElementsByClassName("card-thank").item(0);

	// Rate button
	Array.from(buttons).forEach(function (button) {
		button.addEventListener("click", function() {
			// Remove all "checked" class
			buttons.forEach(function (btn) {
				btn.classList.remove("checked");
			})

			// Add "checked" class to the clicked button
			this.classList.add("checked");

			// Set rate
			document.getElementById("user-rate").innerText = this.innerText;
		})
	})

	// Submit button
	buttonSubmit.addEventListener("click", function() {
		if (document.getElementById("user-rate").innerText === '') {
			alert("Rate it first before clicking the submit button, you dumb!");
			return;
		}

		rateCard.style.display = "none";
		thankYouCard.style.display = "flex";
	})
})


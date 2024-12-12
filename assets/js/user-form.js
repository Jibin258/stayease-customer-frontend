function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-options');
    dropdown.classList.toggle('hidden');
}

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-options');
    const toggleButton = document.getElementById('dropdown-toggle');
    if (event.target !== dropdown && event.target !== toggleButton) {
        dropdown.classList.add('hidden');
    }
});

function showPopup() {
    const popup = document.getElementById('popup-message');
    popup.classList.remove('hidden');
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 3000);
}

function validateForm() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const dob = document.getElementById("dob").value;
    const identityType = document.getElementById("identity-type").value;
    const identityNumber = document.getElementById("identity-number").value;
    const identityTypeSelected = document.getElementById("identity-type").value;
    const frontCopy = document.getElementById("front-copy").files[0];
    const backCopy = document.getElementById("back-copy").files[0];

    document.getElementById("fname-error").textContent = "";
    document.getElementById("lname-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("dob-error").textContent = "";
    document.getElementById("identity-number-error").textContent = "";
    document.getElementById("identity-document-error").textContent = "";

    const namePattern = /^[a-zA-Z]+$/;
    if (fname.trim() === "" || !namePattern.test(fname)) {
        document.getElementById("fname-error").textContent = "Invalid firstname!";
        return false;
    }

    if (lname.trim() === "" || !namePattern.test(lname)) {
        document.getElementById("lname-error").textContent = "Invalid lastname!";
        return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (phone.trim() === "" || !phonePattern.test(phone)) {
        document.getElementById("phone-error").textContent = "Please enter a valid phone number (10 digits)!";
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.trim() === "" || !emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email!";
        return false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (dob > today) {
        document.getElementById("dob-error").textContent = "Date of birth cannot be in the future!";
        return false;
    }

    if (identityNumber.trim() === "") {
        document.getElementById("identity-number-error").textContent = "Please enter your identity number!";
        return false;
    } else if (identityTypeSelected === "aadhar" && !/^\d{12}$/.test(identityNumber)) {
        document.getElementById("identity-number-error").textContent = "Please enter a valid 12-digit Aadhar number!";
        return false;
    } else if (identityTypeSelected === "pan-card" && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(identityNumber)) {
        document.getElementById("identity-number-error").textContent = "Please enter a valid PAN card number!";
        return false;
    } else if (identityTypeSelected === "driver-license" && !/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{6}$/.test(identityNumber)) {
        document.getElementById("identity-number-error").textContent = "Please enter a valid Driving License number!";
        return false;
    } else if (identityTypeSelected === "passport" && !/^[A-PR-WY][1-9]\d{6}[A-Z]{1}$/.test(identityNumber)) {
        document.getElementById("identity-number-error").textContent = "Please enter a valid Passport number!";
        return false;
    } else if (identityTypeSelected === "other" && identityNumber.trim().length < 5) {
        document.getElementById("identity-number-error").textContent = "Please enter a valid identity number for 'Other'!";
        return false;
    }

    if (!frontCopy && !backCopy) {
        document.getElementById("identity-document-error").textContent = 'Please upload the document!';
        return false;
    }
    if (!frontCopy) {
        document.getElementById("identity-document-error").textContent = 'Please upload a front copy file!';
        return false;
    }
    if (!backCopy) {
        document.getElementById("identity-document-error").textContent = 'Please upload a back copy file!';
        return false;
    }

    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('dob', dob);
    formData.append('identityType', identityType);
    formData.append('identityNumber', identityNumber);
    formData.append('identityTypeSelected', identityTypeSelected);
    formData.append('frontCopy', frontCopy);
    formData.append('backCopy', backCopy);

    console.log([...formData])

    // fetch('/api/storing-data', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: formData,
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             document.getElementById("data-error").textContent = "";
    //             console.log('Data submitted successfully!');
    //             showPopup();
    //         } else {
    //             console.error('Data submission failed:', data.message);
    //             document.getElementById("data-error").textContent = "Data submission failed. Please try again!";
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error submitting data:', error);
    //         document.getElementById("data-error").textContent = "Error submitting data. Please try again later!";
    //     });

    showPopup();

    return false;
}
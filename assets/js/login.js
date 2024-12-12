// Verification success message popup function
function showPopup() {
    const popup = document.getElementById('popup-message');
    popup.classList.remove('hidden');
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 3000);
}

// OTP generation function
function sendOtp() {
    document.getElementById("phone-error").textContent = '';
    const phoneNumber = document.getElementById('phone').value;

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
        document.getElementById("phone-error").textContent = "Please enter a valid 10-digit phone number!";
        return;
    }

    document.getElementById('otpDisplay').hidden = false;
    document.getElementById('submitDisplay').hidden = false;

    fetch('/api/send-otp', { //OTP send API here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('OTP sent successfully!');
                document.getElementById("otpBtn").disabled = true;
                document.getElementById("otpBtn").textContent = "OTP Sent";
            } else {
                console.error('Failed to send OTP:', data.message);
                document.getElementById("phone-error").textContent = "Failed to send OTP. Please try again!";
            }
        })
        .catch(error => {
            console.error('Error sending OTP:', error);
            document.getElementById("phone-error").textContent = "Error sending OTP. Please try again later!";
        });
}

// OTP verification function
function submitOtp() {
    const phoneNumber = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;
    const termsCheck = document.getElementById('terms-checkbox').checked;

    fetch('/api/verify-otp', { //OTP verification API here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: phoneNumber,
            otp: otp,
            termsCheck
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("otp-error").textContent = "";
                console.log('OTP verified successfully!');
                showPopup();
                window.location.href = 'user-form.html';
            } else {
                console.error('OTP verification failed:', data.message);
                document.getElementById("otp-error").textContent = "Invalid OTP. Please try again!";
            }
        })
        .catch(error => {
            console.error('Error verifying OTP:', error);
            document.getElementById("otp-error").textContent = "Error verifying OTP. Please try again later!";
        });

    return false;
}
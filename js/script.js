document.addEventListener('DOMContentLoaded', function() {
    const openFormBtn = document.getElementById('openFormBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
document.querySelectorAll('[id^="openFormBtn"]').forEach(button => {
    button.addEventListener('click', () => {
        const formId = button.id.replace('openFormBtn', 'feedbackForm');
        document.getElementById(formId).style.display = 'block';
    });
});

    openFormBtn.onclick = function() {
        feedbackForm.style.display = 'block';
    }


    closeBtn.onclick = function() {
        feedbackForm.style.display = 'none';
    }


    window.onclick = function(event) {
        if (event.target === feedbackForm) {
            feedbackForm.style.display = 'none';
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Пожалуйста, подождите...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Форма успешно отправлена";
            } else {
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            result.innerHTML = "Что-то пошло не так!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
    });
});
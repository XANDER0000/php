document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("myForm");
    let popups = document.querySelectorAll(".popup");
    let openPopupBtns = document.querySelectorAll(".openPopupBtn");
    let closePopupBtns = document.querySelectorAll(".closePopupBtn");
    
    // Открытие соответствующего попапа при нажатии на кнопку открытия
    openPopupBtns.forEach((btn, index) => {
        btn.addEventListener("click", function() {
            let popup = popups[index];
            popup.style.display = "block";
            popup.style.opacity = "1";
        });
    });
    
    // Закрытие соответствующего попапа при нажатии на кнопку закрытия
    closePopupBtns.forEach((btn, index) => {
        btn.addEventListener("click", function() {
            let popup = popups[index];
            popup.style.display = "none";
            popup.style.opacity = "0";
        });
    });
    
    // Закрытие попапа при клике вне его области
    window.addEventListener("click", function(event) {
        popups.forEach(popup => {
            if (event.target == popup) {
                popup.style.display = "none";
                popup.style.opacity = "0";
            }
        });
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let formData = new FormData(form);

        fetch('../handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Форма успешно отправлена!');

                let popupThanks = document.querySelector('.popup_thanks');
                if (popupThanks) {
                    popupThanks.style.display = "block";
                    popupThanks.style.opacity = "1";
                }
            } else {
                alert('Произошла ошибка при отправке формы.');
            }
            popup.style.display = "none";
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы.');
            popup.style.display = "none";
        });
    });
});


// SMOOTH SCROLL ================================================
const smoothLinks = document.querySelectorAll('a[href^="#"]');  
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        // Проверяем, есть ли что-либо после символа "#"
        if (id !== '#' && id.length > 1 && /^#[^#]+$/.test(id)) {
            // Получаем значение отступа из дата-атрибута "data-offset"
            const offset = smoothLink.getAttribute('data-offset') || 0;

            const targetElement = document.querySelector(id);
            
            if (targetElement) {
                const scrollPosition = targetElement.offsetTop - offset;

                if(offset == 0) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                } else {
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
};
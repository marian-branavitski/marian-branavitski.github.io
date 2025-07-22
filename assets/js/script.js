
try {
    const dots = document.querySelectorAll(".next-main-slider-dots>span");
    const slides = document.querySelectorAll('.hero>li');
    const interval = 2;

    let activeSlide = 0;


    const reset = () => {
        dots.forEach(dot => dot.removeAttribute('class'))
        dots[activeSlide].className = 'active';

        slides.forEach(slide => slide.style.display = 'none');
        slides[activeSlide].style.display = 'block';
    };

    reset();

    setInterval(() => {
        reset();

        if (activeSlide < slides.length - 1) {
            activeSlide++;
        } else {
            activeSlide = 0;
        }
    }, interval * 1000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activeSlide = index;
            reset();
        });
    });

    let checkpoint = 250;

    let nav_bg = 'transparent';
    let opacity = 1;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= checkpoint) {
            nav_bg = 'transparent';
            opacity = 1 - currentScroll / checkpoint;
        } else {
            nav_bg = '#000';
            opacity = 0;
        }

        document.querySelector(".header-nav").style.background = nav_bg;

        slides.forEach(slide => slide.getElementsByTagName('img')[0].style.opacity = opacity);
    })


} catch (error) {
    console.log(error);
}

try {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const dots = carousel.querySelectorAll(".next-carousel-slider-dots>span");
        const slides = carousel.querySelectorAll('li');
        const interval = 2;

        let activeSlide = 0;

        const reset = () => {
            dots.forEach(dot => dot.removeAttribute('class'));
            if (dots[activeSlide]) {
                dots[activeSlide].className = 'active';
            }
            slides.forEach(slide => slide.style.display = 'none');
            if (slides[activeSlide]) {
                slides[activeSlide].style.display = 'block';
            }

        };

        reset();

        setInterval(() => {
            if (activeSlide < slides.length - 1) {
                activeSlide++;
            } else {
                activeSlide = 0;
            }
            reset();
        }, interval * 2000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                activeSlide = index;
                reset();
            });
        });
    });
} catch (error) {
    console.log(error);
}

//If the current page is not index.html then the header nav background is transparent and it changes to black when the user scrolls down.
// The checkpoint is set to be lower than that in index.html so that the contents of other pages did not overlap with the header
if (!window.location.pathname.endsWith('/index.html')) {
    let checkpoint = 15;

    let nav_bg = 'transparent';
    let opacity = 1;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= checkpoint) {
            nav_bg = 'transparent';
            opacity = 1 - currentScroll / checkpoint;
        } else {
            nav_bg = '#000';
            opacity = 0;
        }

        document.querySelector(".header-nav").style.background = nav_bg;
    })
}

const menu = document.querySelector('.mobile-btn');
const submenu = document.querySelector('.middle-menu-mobile');
const menuImg = menu.getElementsByTagName('img')[0]

let is_open = 0;

// When the mennu button is clicked it changes the style of the element of class middle-menu-mobile to block 
// to display the hideable menu on the mobile devices. The actual button is also changed to the cross. 
menu.addEventListener('click', () => {
    if (!is_open) {
        submenu.style.display = 'block';
        menuImg.src = 'assets/imgs/close.png';
        menuImg.style.width = '25px';
        menuImg.style.height = '25px';
        is_open = 1;        
    } else {
        submenu.style.display = 'none';
        menuImg.src = 'assets/imgs/MenuIcon.svg';
        is_open = 0;
    }
});

// Retrieve all the images with id latest-picture from the index html file. When the image is clicked it is 
// open in the new tab by using window open and source retrieved from the image tag
try {
    const latestPic = document.querySelectorAll('#latest-picture');
    latestPic.forEach(image => image.addEventListener('click', () => {
        window.open(image.src);
    }))
} catch (error) {
    console.log(error);
}

const navLinks = document.querySelectorAll('.header-nav-elements>ul>li>a');

navLinks.forEach(link => {
    link.removeAttribute('class'); // Remove any existing class
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
        // If the current page matches the link's href, add the 'current' class
        link.className = 'current';
    }
});

const mobileNavLinks = document.querySelectorAll('.header-nav-elements-mobile>ul>li>a');
mobileNavLinks.forEach(link => {
    link.removeAttribute('class'); // Remove any existing class
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
        // If the current page matches the link's href, add the 'current' class
        link.className = 'current';
    }
});


try {
    const buttons = document.querySelectorAll('.carousel-contents>button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.id; // Get the URL from the button's id attribute
            if (url) {
                window.open(url, '_blank'); // Open the URL in a new tab
            }
        });
    });
} catch (error) {
    console.log(error);
}


window.onload = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            const btn = form.querySelector('input[type="submit"]');
            btn.value = 'Sending...'; // Change the button text to indicate sending
            btn.disabled = true; // Disable the button to prevent multiple submissions

            const serviceID = 'default_service';
            const templateID = 'template_mbzl4k9';

            emailjs.sendForm(serviceID, templateID, form)
                .then(() => {
                    alert('Message sent successfully!');
                    btn.value = 'Send'; // Change the button text to indicate success
                    btn.disabled = false; // Re-enable the button
                    form.reset(); // Reset the form fields
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    alert('Failed to send message. Please try again later.');
                    btn.value = 'Send'; // Reset the button text
                    btn.disabled = false; // Re-enable the button
                });
        });
    }
}
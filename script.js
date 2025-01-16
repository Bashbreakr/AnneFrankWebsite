// Erkennung des Geräts und Anpassen der Navigation
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.querySelector('nav').classList.add('mobile-nav');
} else {
    document.querySelector('nav').classList.remove('mobile-nav');
}

// Elemente für den IntersectionObserver
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// IntersectionObserver-Optionen
const observerOptions = {
    root: null, // Beobachtet den gesamten Viewport
    threshold: 0.3 // Nur 30% des Abschnitts müssen sichtbar sein
};

// Callback für den IntersectionObserver
const observerCallback = (entries) => {
    entries.forEach(entry => {
        const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
            // Aktuellen Link hervorheben
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        }
    });
};

// Observer initialisieren
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Abschnitte beobachten
sections.forEach(section => observer.observe(section));

// Sanftes Scrollen bei Klick
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Standardverhalten verhindern
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth', // Sanftes Scrollen
            block: 'start' // Scrollt zum Anfang des Abschnitts
        });
    });
});

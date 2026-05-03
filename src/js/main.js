document.addEventListener('DOMContentLoaded', () => {
    const transitionLinks = document.querySelectorAll('.transition-link');

    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        });
    });
});

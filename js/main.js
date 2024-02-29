function toggleDisplay(className) {
    //Get all "sections" from the DOM
    const sections = document.querySelectorAll('section');
    //Hide all sections by changing the DOM display
    // to "none"
    sections.forEach(section => {
        section.style.display = 'none';
    });
    //change display=block for className section in DOM
    document.querySelector(`.${className}`).style.display='block';
}
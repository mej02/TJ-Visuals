// ✅ Make filterCategory global so HTML onclick can use it
function filterCategory(category) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
            card.style.display = "flex"; // or "block" depending on your card style
        } else {
            card.style.display = "none";
        }
    });
}

// ✅ Everything else stays inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Back to Top Button
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Video Logic
    const video = document.getElementById("project-video");
    const playButton = document.getElementById("play-button");

    if (video && playButton) {
        function playVideo() {
            video.muted = false;
            video.play().then(() => {
                playButton.classList.add("hidden");
            }).catch(error => {
                console.error("Video Playback Error:", error);
            });
        }

        function pauseVideo() {
            video.pause();
            playButton.classList.remove("hidden");
        }

        playButton.addEventListener("click", (event) => {
            event.stopPropagation();
            playVideo();
        });

        video.addEventListener("click", () => {
            if (video.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
        });

        video.addEventListener("ended", function () {
            playButton.classList.remove("hidden");
        });
    }
});


function animateSkillsOnScroll() {
    const skills = document.querySelectorAll('.skill-fill');
    const skillsSection = document.querySelector('.skills-container');
    const rect = skillsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
        skills.forEach(skill => {
            const targetWidth = skill.getAttribute('data-width');
            skill.style.setProperty('--target-width', targetWidth);
            skill.classList.add('animated');
        });

        window.removeEventListener('scroll', animateSkillsOnScroll);
    }
}

window.addEventListener('scroll', animateSkillsOnScroll);

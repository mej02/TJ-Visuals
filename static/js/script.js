document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop();
    const indicator = document.createElement("div");
    indicator.classList.add("nav-indicator");
    document.querySelector("nav ul").appendChild(indicator);

    // Function to update navigation underline
    function moveIndicator(element) {
        const parent = element.parentElement;
        indicator.style.width = `${parent.offsetWidth}px`;
        indicator.style.transform = `translateX(${parent.offsetLeft}px)`;
    }

    // Highlight active nav link and set indicator position
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage || (currentPage === "" && link.getAttribute("href") === "TJ.html")) {
            link.classList.add("active");
            moveIndicator(link);
        }

        link.addEventListener("click", function (event) {
            const target = this.getAttribute("href");

            // Smooth scroll for internal links
            if (target.startsWith("#")) {
                event.preventDefault();
                const targetSection = document.querySelector(target);
                if (targetSection) {
                    window.scrollTo({ top: targetSection.offsetTop - 50, behavior: "smooth" });
                }
            }

            // Update active class and indicator
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            moveIndicator(this);
        });
    });

    // Adjust indicator position on window resize
    window.addEventListener("resize", () => {
        const activeNav = document.querySelector("nav ul li a.active");
        if (activeNav) moveIndicator(activeNav);
    });

    // 🖼️ Lightbox for Images & Videos
    const galleryItems = document.querySelectorAll(".gallery img, .gallery video");
    let currentIndex = 0;

    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <span class="prev">&#10094;</span>
        <div class="lightbox-content">
            <img class="lightbox-img" src="" alt="Expanded Image" style="display:none;">
            <video class="lightbox-video" controls autoplay loop muted style="display:none;">
                <source src="" type="video/mp4">
            </video>
        </div>
        <span class="next">&#10095;</span>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.querySelector(".lightbox-img");
    const lightboxVideo = document.querySelector(".lightbox-video");
    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");

    function showLightbox(index) {
        currentIndex = index;
        let item = galleryItems[currentIndex];

        if (item.tagName === "IMG") {
            lightboxImg.src = item.src;
            lightboxImg.style.display = "block";
            lightboxVideo.style.display = "none";
        } else if (item.tagName === "VIDEO") {
            lightboxVideo.querySelector("source").src = item.querySelector("source").src;
            lightboxVideo.load();
            lightboxVideo.style.display = "block";
            lightboxImg.style.display = "none";
        }

        lightbox.classList.add("active");
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => showLightbox(index));
    });

    closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
    prevBtn.addEventListener("click", () => showLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length));
    nextBtn.addEventListener("click", () => showLightbox((currentIndex + 1) % galleryItems.length));

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("active")) {
            if (e.key === "ArrowLeft") prevBtn.click();
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "Escape") closeBtn.click();
        }
    });

    // 🍔 Mobile Menu Toggle
    const menuToggle = document.createElement("button");
    menuToggle.classList.add("menu-toggle");
    menuToggle.innerHTML = "&#9776;";
    document.querySelector("nav").prepend(menuToggle);

    const navUl = document.querySelector("nav ul");
    menuToggle.addEventListener("click", () => navUl.classList.toggle("active"));
});


document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImg");
    let closeBtn = document.querySelector(".close");
    let prevBtn = document.querySelector(".prev");
    let nextBtn = document.querySelector(".next");

    let images = document.querySelectorAll(".recent-gallery img");
    let currentIndex = 0;

    // Open modal when clicking an image
    images.forEach((img, index) => {
        img.addEventListener("click", function () {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    // Show image in modal
    function showImage(index) {
        if (index >= 0 && index < images.length) {
            modal.style.display = "block";
            modalImg.src = images[index].src;
            currentIndex = index;
        }
    }

    // Close modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Next image
    nextBtn.addEventListener("click", function () {
        if (currentIndex < images.length - 1) {
            showImage(currentIndex + 1);
        }
    });

    // Previous image
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    });

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Keyboard Navigation
    document.addEventListener("keydown", function (event) {
        if (modal.style.display === "block") {
            if (event.key === "ArrowRight") {
                nextBtn.click();
            } else if (event.key === "ArrowLeft") {
                prevBtn.click();
            } else if (event.key === "Escape") {
                modal.style.display = "none";
            }
        }
    });
});

// Add Shake Effect on Click
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("modal");
    const modalMedia = document.getElementById("modal-media");
    const modalTitle = document.getElementById("modal-title");
    const closeModal = document.querySelector(".close");

    galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
            const media = item.querySelector("img, video"); // Get image or video inside the gallery-item
            const title = item.querySelector(".overlay").textContent; // Get the title

            if (media) {
                modalMedia.innerHTML = ""; // Clear previous content
                modalTitle.textContent = title; // Set the modal title

                if (media.tagName === "IMG") {
                    // If it's an image, create a new image element
                    const img = document.createElement("img");
                    img.src = media.src;
                    img.alt = title;
                    img.style.maxWidth = "90%";
                    img.style.maxHeight = "80vh";
                    modalMedia.appendChild(img);
                } else if (media.tagName === "VIDEO") {
                    // If it's a video, create a new video element
                    const video = document.createElement("video");
                    video.src = media.querySelector("source").src;
                    video.controls = true;
                    video.autoplay = true;
                    video.style.maxWidth = "90%";
                    video.style.maxHeight = "80vh";
                    modalMedia.appendChild(video);
                }

                modal.style.display = "flex"; // Show modal
            }
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the content
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

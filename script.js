document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const closeBtn = document.querySelector(".close");
    const modalDesc = document.getElementById("modal-desc");
    const modalContent = document.querySelector(".modal-content");

    // 1. CLICK HANDLER FOR IMAGES
    document.querySelectorAll(".clickable-img").forEach(img => {
        img.addEventListener("click", function () {
            removeExistingMedia();

            const newImg = document.createElement("img");
            newImg.id = "modal-img";
            newImg.src = this.src;
            newImg.alt = this.alt;

            modalContent.insertBefore(newImg, modalDesc);
            modalDesc.textContent = this.getAttribute("data-desc") || "";
            modal.style.display = "flex";
        });
    });

    // 2. CLICK HANDLER FOR VIDEOS
    document.querySelectorAll(".clickable-vid").forEach(vidContainer => {
        vidContainer.addEventListener("click", function () {
            removeExistingMedia();

            const videoPath = this.getAttribute("data-video");
            const newVideo = document.createElement("video");
            newVideo.id = "modal-video";
            newVideo.src = videoPath;
            newVideo.controls = true;
            newVideo.autoplay = true;

            modalContent.insertBefore(newVideo, modalDesc);
            modalDesc.textContent = this.getAttribute("data-desc") || "";
            modal.style.display = "flex";
        });
    });

    // 3. CLOSE MODAL LOGIC
    function closeModal() {
        modal.style.display = "none";
        removeExistingMedia();
    }

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 4. HELPER TO REMOVE MEDIA WHEN CLOSING OR SWITCHING
    function removeExistingMedia() {
        const existingImg = document.getElementById("modal-img");
        const existingVid = document.getElementById("modal-video");

        if (existingImg) {
            existingImg.remove();
        }
        
        if (existingVid) {
            existingVid.pause();
            existingVid.remove();
        }
    }
});
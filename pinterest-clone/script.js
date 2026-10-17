// Pinora - Pinterest Clone

const pins = [
    {
        id: 1,
        title: "Summer Fashion Inspiration",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
        likes: 245
    },
    {
        id: 2,
        title: "Beautiful Green Nature",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
        likes: 189
    },
    {
        id: 3,
        title: "Pink Flowers for Your Mood",
        category: "Flowers",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80",
        likes: 320
    },
    {
        id: 4,
        title: "Healthy Breakfast Ideas",
        category: "Food",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        likes: 156
    },
    {
        id: 5,
        title: "Dream Vacation Destination",
        category: "Travel",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
        likes: 410
    },
    {
        id: 6,
        title: "Minimal Bedroom Design",
        category: "Home Decor",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
        likes: 275
    },
    {
        id: 7,
        title: "Creative Art and Colors",
        category: "Art",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80",
        likes: 198
    },
    {
        id: 8,
        title: "Elegant Everyday Outfit",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
        likes: 360
    },
    {
        id: 9,
        title: "Peaceful Mountain Views",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
        likes: 287
    },
    {
        id: 10,
        title: "Cozy Coffee Corner",
        category: "Home Decor",
        image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80",
        likes: 142
    },
    {
        id: 11,
        title: "Delicious Dessert Inspiration",
        category: "Food",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
        likes: 230
    },
    {
        id: 12,
        title: "Aesthetic Travel Photography",
        category: "Travel",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
        likes: 315
    },
    {
        id: 13,
        title: "Soft Pink Flower Bouquet",
        category: "Flowers",
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80",
        likes: 290
    },
    {
        id: 14,
        title: "Modern Living Room Ideas",
        category: "Home Decor",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
        likes: 375
    },
    {
        id: 15,
        title: "Artistic Creative Workspace",
        category: "Art",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",
        likes: 164
    }
];

// Website elements
const pinGrid = document.getElementById("pinGrid");
const searchInput = document.getElementById("searchInput");
const categoryBar = document.getElementById("categoryBar");
const sectionTitle = document.getElementById("sectionTitle");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

const createDialog = document.getElementById("createDialog");
const createForm = document.getElementById("createForm");

let selectedCategory = "All";
let showSavedOnly = false;
let nextId = 16;

const savedPins = new Set();
const likedPins = new Set();

// Show a small notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Create one image card
function createPinCard(pin) {
    const card = document.createElement("article");
    card.className = "pin-card";

    // Image wrapper
    const imageWrap = document.createElement("div");
    imageWrap.className = "pin-image-wrap";

    const image = document.createElement("img");
    image.className = "pin-image";
    image.src = pin.image;
    image.alt = pin.title;
    image.loading = "lazy";

    // Hide an image if its URL is unavailable
    image.addEventListener("error", () => {
        image.alt = "Image unavailable: " + pin.title;
        image.style.height = "180px";
        image.style.objectFit = "contain";
        image.style.padding = "15px";
        image.style.background = "#f4edf1";
    });

    const overlay = document.createElement("div");
    overlay.className = "pin-overlay";

    const saveButton = document.createElement("button");
    saveButton.className = "save-btn";
    saveButton.textContent = savedPins.has(pin.id)
        ? "Saved ✓"
        : "Save Pin";

    if (savedPins.has(pin.id)) {
        saveButton.classList.add("saved");
    }

    saveButton.addEventListener("click", () => {
        if (savedPins.has(pin.id)) {
            savedPins.delete(pin.id);
            showToast("Pin removed from your saved collection.");
        } else {
            savedPins.add(pin.id);
            showToast("Pin saved successfully! ♥️");
        }

        renderPins();
    });

    imageWrap.append(image, overlay, saveButton);

    // Card information
    const info = document.createElement("div");
    info.className = "pin-info";

    const title = document.createElement("h3");
    title.className = "pin-title";
    title.textContent = pin.title;

    const bottom = document.createElement("div");
    bottom.className = "pin-bottom";

    const category = document.createElement("span");
    category.className = "pin-category";
    category.textContent = pin.category;

    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";

    function updateLikeButton() {
        const liked = likedPins.has(pin.id);

        likeButton.textContent =
            (liked ? "♥️ " : "♡ ") +
            (pin.likes + (liked ? 1 : 0));

        likeButton.classList.toggle("liked", liked);
    }

    updateLikeButton();

    likeButton.addEventListener("click", () => {
        if (likedPins.has(pin.id)) {
            likedPins.delete(pin.id);
        } else {
            likedPins.add(pin.id);
        }

        updateLikeButton();
    });

    bottom.append(category, likeButton);
    info.append(title, bottom);
    card.append(imageWrap, info);

    return card;
}

// Search and category filtering
function renderPins() {
    const query = searchInput.value.trim().toLowerCase();

    let filteredPins = pins.filter(pin => {
        const matchesSearch =
            pin.title.toLowerCase().includes(query) ||
            pin.category.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "All" ||
            pin.category === selectedCategory;

        const matchesSaved =
            !showSavedOnly || savedPins.has(pin.id);

        return matchesSearch && matchesCategory && matchesSaved;
    });

    pinGrid.replaceChildren();

    filteredPins.forEach(pin => {
        pinGrid.appendChild(createPinCard(pin));
    });

    emptyState.hidden = filteredPins.length !== 0;
    pinGrid.hidden = filteredPins.length === 0;

    resultCount.textContent =
        filteredPins.length + (filteredPins.length === 1
            ? " idea"
            : " ideas");

    if (showSavedOnly) {
        sectionTitle.textContent = "Your Saved Pins";
    } else if (selectedCategory !== "All") {
        sectionTitle.textContent = selectedCategory + " Inspiration";
    } else if (query) {
        sectionTitle.textContent = "Search Results";
    } else {
        sectionTitle.textContent = "Ideas for you";
    }
}

// Category buttons
categoryBar.addEventListener("click", event => {
    const button = event.target.closest(".category-chip");

    if (!button) return;

    selectedCategory = button.dataset.category;
    showSavedOnly = false;

    document.querySelectorAll(".category-chip").forEach(chip => {
        chip.classList.toggle("selected", chip === button);
    });

    document.querySelectorAll(".category-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.category === selectedCategory
        );
    });

    renderPins();
});

// Sidebar category links
document.querySelectorAll(".category-link").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        selectedCategory = link.dataset.category;
        showSavedOnly = false;

        searchInput.value = "";

        document.querySelectorAll(".category-chip").forEach(chip => {
            chip.classList.toggle(
                "selected",
                chip.dataset.category === selectedCategory
            );
        });

        document.querySelectorAll(".category-link").forEach(item => {
            item.classList.toggle("active", item === link);
        });

        renderPins();
    });
});

// Search as the user types
searchInput.addEventListener("input", () => {
    showSavedOnly = false;
    renderPins();
});

// Home and Explore
document.querySelectorAll('[data-page="home"], [data-page="discover"]')
    .forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            selectedCategory = "All";
            showSavedOnly = false;
            searchInput.value = "";

            document.querySelectorAll(".category-chip").forEach(chip => {
                chip.classList.toggle(
                    "selected",
                    chip.dataset.category === "All"
                );
            });

            renderPins();

            sectionTitle.textContent =
                link.dataset.page === "discover"
                    ? "Explore Ideas"
                    : "Ideas for you";
        });
    });

// Show saved pins
document.getElementById("savedBtn").addEventListener("click", event => {
    event.preventDefault();

    showSavedOnly = true;
    selectedCategory = "All";
    searchInput.value = "";

    document.querySelectorAll(".category-chip").forEach(chip => {
        chip.classList.toggle(
            "selected",
            chip.dataset.category === "All"
        );
    });

    renderPins();
});

// Open create pin form
document.getElementById("createBtn").addEventListener("click", event => {
    event.preventDefault();
    createDialog.showModal();
});

// Close create pin form
document.getElementById("closeDialog").addEventListener("click", () => {
    createDialog.close();
});

createDialog.addEventListener("click", event => {
    if (event.target === createDialog) {
        createDialog.close();
    }
});

// Add a new pin
createForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("pinTitle").value.trim();
    const image = document.getElementById("pinImage").value.trim();
    const category = document.getElementById("pinCategory").value;

    if (!title || !image) {
        showToast("Please fill in all fields.");
        return;
    }

    try {
        const url = new URL(image);

        if (url.protocol !== "https:" && url.protocol !== "http:") {
            showToast("Please enter a valid image URL.");
            return;
        }
    } catch {
        showToast("Please enter a valid image URL.");
        return;
    }

    pins.unshift({
        id: nextId++,
        title,
        image,
        category,
        likes: 0
    });

    createForm.reset();
    createDialog.close();

    selectedCategory = "All";
    showSavedOnly = false;
    searchInput.value = "";

    document.querySelectorAll(".category-chip").forEach(chip => {
        chip.classList.toggle(
            "selected",
            chip.dataset.category === "All"
        );
    });

    renderPins();
    showToast("Your new pin has been published! ✨");
});

// Profile button
document.getElementById("profileBtn").addEventListener("click", () => {
    showToast("Welcome to your Pinora profile! 👋");
});

// Reset search results
document.getElementById("resetBtn").addEventListener("click", () => {
    selectedCategory = "All";
    showSavedOnly = false;
    searchInput.value = "";

    document.querySelectorAll(".category-chip").forEach(chip => {
        chip.classList.toggle(
            "selected",
            chip.dataset.category === "All"
        );
    });

    renderPins();
});

// Display all pins when website opens
renderPins();
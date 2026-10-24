import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "ss-academy-e820a.firebaseapp.com",
    projectId: "ss-academy-e820a",
    storageBucket: "ss-academy-e820a.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const statusMessage = document.getElementById("statusMessage");
    const schedule = document.getElementById("schedule");
    const studentGreeting = document.getElementById("studentGreeting");

    if (!form || !statusMessage || !schedule || !studentGreeting) {
        console.error("Check the form and schedule IDs in index.html.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value;
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!name || !age || !email || !phone) {
            statusMessage.textContent = "Please fill in all details.";
            statusMessage.className = "error";
            return;
        }

        statusMessage.textContent = "Saving your registration...";

        try {
            await addDoc(collection(db, "registration"), {
                name: name,
                age: Number(age),
                email: email,
                phone: phone,
                registeredAt: new Date()
            });

            statusMessage.textContent =
                "Registration Successfully Completed! 🎉";
            statusMessage.className = "success";

            studentGreeting.textContent =
                "Welcome to SS Academy, " + name + "!";

            schedule.hidden = false;

            schedule.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } catch (error) {
            console.error("Firebase registration error:", error);
            statusMessage.textContent =
                "Registration could not be saved. Please try again.";
            statusMessage.className = "error";
        }
    });
});
import { FormEvent } from "react";

export const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    console.log("formData")
    event.preventDefault(); // Prevent default form submission behavior

    
    const formData = new FormData(event.currentTarget); // Extract form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email, password);
    // Further login logic can go here (e.g., API call, validation)
};

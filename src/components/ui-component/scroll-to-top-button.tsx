import { ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 100 pixels
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`${
        isVisible ? "block" : "hidden"
      } fixed right-4 bottom-4 bg-blue-400 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-300`}
      onClick={scrollToTop}
    >
      <ArrowUp />
    </button>
  );
}

export default ScrollToTopButton;

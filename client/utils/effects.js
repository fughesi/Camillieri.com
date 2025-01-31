function effects(elem, speed = 0) {
  const element = document.querySelectorAll(elem);
  const height = document.documentElement.clientHeight;

  if (element.length === 0) {
    console.log("need to provide element ID/class as first param");
  }

  return {
    parallax: () => {
      const integerSpeed = speed / 100;
      element?.forEach((item) => {
        window.addEventListener("scroll", () => {
          const bounds = item.getBoundingClientRect();
          // adds effect when element in view
          if (bounds.top < height && bounds.bottom > 0) {
            item.style.transform = `translateY(${
              window.scrollY * integerSpeed
            }px)`;
          } else {
            //removes effect when out of view
            window.removeEventListener("scroll", () => {
              element.forEach((item) => item.style.removeProperty("transform"));
            });
          }
        });
      });
    },

    scale: () => {
      element.forEach((item) => {
        window.addEventListener("scroll", () => {
          const bounds = item.getBoundingClientRect();
          // adds effect when element in view
          if (bounds.top < height && bounds.bottom > 0) {
            item.style.scale = window.scrollY * speed;
          } else {
            //removes effect when out of view
            window.removeEventListener("scroll", () => {
              element.forEach((item) => item.style.removeProperty("scale"));
            });
          }
        });
      });
    },

    visibility: () => {
      const integerSpeed = speed / 10000;
      element.forEach((item) => {
        window.addEventListener("scroll", () => {
          const bounds = item.getBoundingClientRect();
          // adds effect when element in view
          if (bounds.top < height && bounds.bottom > 0) {
            item.style.opacity = window.scrollY * integerSpeed;
          } else {
            //removes effect when out of view
            window.removeEventListener("scroll", () => {
              element.forEach((item) => item.style.removeProperty("opacity"));
            });
          }
        });
      });
    },

    observer: (style = "move", margin = "0px 0px 0px 0px", stops = 0.0) => {
      let options = {
        root: null, //never used
        rootMargin: String(margin),
        threshold: stops, // array or float
      };
      const observer = new IntersectionObserver((entries) => {
        entries?.forEach((entry) => {
          entry.target.classList.toggle(style, entry.isIntersecting);
        });
      }, options);

      element.forEach((elem) => observer.observe(elem));
    },

    popoverEffects: () => {
      element[0].addEventListener("toggle", (event) => {
        if (event.newState === "open") {
          document.body.classList.add("stop-scrolling");
        } else {
          document.body.classList.remove("stop-scrolling");
        }
      });
    },
  };
}

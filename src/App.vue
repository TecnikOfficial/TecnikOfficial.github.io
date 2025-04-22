<template>
  <div>
    <!-- Loading Screen -->
    <div id="loading-screen" :class="{ 'blur-level': true }" :style="{ 'backdrop-filter': `blur(${blurAmount}px)` }" v-show="!loadingComplete">
      <div class="loading-content">
        <div id="year-timer">{{ currentYear }}</div>
      </div>
    </div>

    <div class="video-background">
      <video autoplay muted loop playsinline>
        <source src="https://tecnik.pages.dev/assets/media/video.webm" type="video/webm">
        Your browser does not support the video tag.
      </video>

      <!-- Main Content -->
      <div class="slider">
        <img 
          src="https://tecnik.pages.dev/assets/media/tecnikmain4.avif" 
          class="hover-image" 
          title="Click To Copy!" 
          alt="Main Image" 
          @click="copyToClipboard('tecnik.gg')"
        >
        <div class="text three-d" @click="changeText">{{ sliderText }}</div>
        <div class="button-container">
          <button class="glow-button" @click="navigateTo('https://tecnik.bio.link/')" title="📧Connect with Us">Contact</button>
          <button class="glow-button" @click="openOverlay('services')" title="💲Freelance">Services</button>
          <button class="glow-button" @click="openOverlay('projects')" title="✔️Completed & Delivered">Projects</button>
        </div>
        
        <!-- Iframe Container -->
        <div class="iframe-container">
          <iframe 
            scrolling="no" 
            id="hearthis_at_user_syncking" 
            width="100%" 
            height="350" 
            src="https://app.hearthis.at/syncking/embed/?hcolor=ba1010&css=&skin=black" 
            title="SyncKing" 
            frameborder="0" 
            allowtransparency
          ></iframe>
        </div>
      </div>

      <!-- Widget Container -->
      <div class="widget-container">
        <img 
          src="https://tecnik.pages.dev/assets/media/donate.webp" 
          class="widget-image" 
          title="TYSM❤️" 
          alt="Donate" 
          @click="openOverlay('donation')"
        >
      </div>

      <!-- Notification Bell -->
      <img 
        src="https://tecnik.pages.dev/assets/media/noti.webp" 
        class="notification-bell" 
        alt="Notification Bell" 
        @click="toggleNotificationPanel"
      >

      <!-- Notification Panel -->
      <div id="notification-panel" v-show="notificationPanelVisible">
        <div class="overlay-content">
          <p>• Are you subscribed to ▶️<a href="https://www.youtube.com/channel/UCXucwi4swKyTmCUB9RrFaQw?sub_confirmation=1" target="_blank">Tecnik Official</a>💻 ?</p><br>
          <p>• Are you subscribed to ▶️<a href="https://www.youtube.com/channel/UC35TPNUnNegZq4mBWvU0o7g?sub_confirmation=1" target="_blank">Syncking</a>🎵 ?</p><br>
          <p>• <a href="https://www.youtube-nocookie.com/embed/videoseries?list=PLzXDhbvRPJ1A33piKX-ss1zjNAVdqu4mM&loop=1&autoplay=1&modestbranding=1" target="_blank">CSGO Montage 😎</a></p><br>
          <p>• <a href="./oldtheme/1.0.html">Old Site 🐈 </a>• <a href="https://tecnikofficial.github.io/404">4🚫4</a></p>
        </div>
      </div>
    </div>

    <!-- Overlays -->
    <!-- Services Overlay -->
    <div id="table-overlay" class="overlay" v-show="activeOverlay === 'services'" @click.self="closeOverlay">
      <div class="overlay-content">
        <span class="close-overlay" @click="closeOverlay">✖</span>
        <h2>Freelance Services</h2>
        <div class="table-scroll">
          <table>
            <tbody>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Price Range in (INR)</th>
              </tr>
              <tr v-for="(service, index) in services" :key="index">
                <td>{{ service.name }}</td>
                <td>{{ service.description }}</td>
                <td>{{ service.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br>
        <h4>Contact using Discord or Email📧: <a href="mailto:TecnikOfficial@Outlook.com">TecnikOfficial@Outlook.com</a></h4>
        <br>
        <p style="font-size: 15px;">Please note that the preferred payment method is UPI. Full refunds are only available for payments made via UPI. Payments made through PayPal or Stripe are not eligible for refunds.</p>
        <br><p style="font-size: 16px; text-align: center;"><strong>GIVE US FEEDBACK <a href="https://tellonym.me/tecnik">HERE😃</a></strong></p>
      </div>
    </div>

    <!-- Projects Overlay -->
    <div id="projects-overlay" class="overlay" v-show="activeOverlay === 'projects'" @click.self="closeOverlay">
      <div class="overlay-content">
        <span class="close-overlay" @click="closeOverlay">✖</span>
        <h2 style="color: green; text-decoration: underline;">Worked as Lead:</h2>
        <br>
        <div class="scrolling-text">
          <span>
            Automotive (Social Media Marketing) | Agro Pvt Ltd (Product Label & Logo Design) | Music Distributor (Website Design) | Resume Design (Multiple Clients)
          </span>
          <span>
            Automotive (Social Media Marketing) | Agro Pvt Ltd (Product Label & Logo Design) | Music Distributor (Website Design) | Resume Design (Multiple Clients)
          </span>
        </div>
        <br>
        <h2 style="color: green; text-decoration: underline;">Collaborations:</h2>
        <br>
        <div class="scrolling-text">
          <span>Cover Song Channel (Mix & Mastering), Portfolio Websites (Art Showcase) , Gaming Channel (Montage Edits)</span>
          <span>Cover Song Channel (Mix & Mastering), Portfolio Websites (Art Showcase) , Gaming Channel (Montage Edits)</span>
        </div>
        <br><br>
        <h2 style="color: green; text-decoration: underline;">Currently Working On:</h2>
        <br>
        <span>Building WEB App (working along with doctor)</span>
        <br><br>
        <div class="expertise-text">
          <span style="font-weight: bold;">Expertise in Efficiency | Provides Value for Money Solutions</span>
        </div>
      </div>
    </div>

    <!-- Donation Overlay -->
    <div id="donation-overlay" class="overlay" v-show="activeOverlay === 'donation'" @click.self="closeOverlay">
      <div class="overlay-content">
        <span class="close-overlay" @click="closeOverlay">✖</span>
        <h2 style="color: green; text-align: center; text-decoration: underline; margin-bottom: 20px;">Choose Payment Method to Support</h2>
        <div class="button-container">
          <button class="glow-button" title="Thank" @click="handleDonation('https://upi2qr.in/pay?name=Tecnik+Official&upiId=tecnikpay-1@okaxis&description=Thank+You')">Google PAY</button>
          <button class="glow-button" title="you" @click="handleDonation('https://upi2qr.in/pay?name=Tecnik+Official&upiId=tecnik@upi&description=Thank+You')">₹ UPI</button>
          <button class="glow-button" title="for" @click="handleDonation('https://www.paypal.me/TecnikOfficial')">💲PayPal</button>
        </div>
        <div class="button-container">
          <button class="glow-button" title="your" @click="handleDonation('https://buymeacoffee.com/tecnik')">Buy me a☕</button>
          <button class="glow-button" title="support!" @click="handleDonation('https://ko-fi.com/tecnik')">Ko-Fi</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        Made with
        <a href="https://youtu.be/71qssscQqH8?feature=shared" target="_blank">
          <img src="https://tecnik.pages.dev/assets/media/heart.gif" alt="Heart" title="Listen💓" width="20" height="20">
        </a>
        using A.i | Source Code
        <a href="https://github.com/TecnikOfficial/TecnikOfficial.github.io" target="_blank">
          <img src="https://tecnik.pages.dev/assets/media/GITHUB-white.svg" alt="GitHub" title="Github" width="20" height="20">
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Loading screen
      currentYear: 1999,
      blurAmount: 10, // Start with maximum blur
      loadingComplete: false,
      
      // Slider text
      sliderText: "WELCOME!",
      textOptions: [
        "COMPUTER\nENTHUSIAST",
        "GRAPHICS DESIGNER\nVFX",
        "A.i TECH\nEXPLORER 010",
        "WEB DESIGN +\nDEVELOPER",
        "PRIVACY FOCUSED\nMODE",
        "DIGITAL MUSIC\nCREATOR",
        "CASUAL GAMER\nGG + OG",
        "FREELANCE\nVIDEO EDITOR"
      ],
      currentTextIndex: 0,
      textInterval: null,
      
      // Overlays
      activeOverlay: null,
      notificationPanelVisible: false,
      
      // Drawing
      isDrawing: false,
      
      // Services data
      services: [
        { name: "Graphic Design", description: "A.i Photo editing, Logo/Banner/Thumbnails/Product label/Social media promotional Post Designs", price: "149 - 849" },
        { name: "Video Editing", description: "Youtube video editing and intro/outro design or cover song mix", price: "449 - 2499" },
        { name: "Web Development", description: "Building Static Portfolio Sites with Html5,CSS,JS. Converting sites to Android App . Provides Hosting Advice and Site Optimisation", price: "749 - 4999" },
        { name: "Resume Making", description: "ATS compatible or modern design resume", price: "175 - 240" },
        { name: "Computer Troubleshoot", description: "Diagnose computer related problem and try to find solution, pc build advice", price: "FREE" }
      ]
    };
  },
  mounted() {
    this.startYearTimer();
    document.addEventListener('mousedown', this.startDrawing);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.stopDrawing);
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('contextmenu', this.disableRightClick);
    
    // Add heart animation on donate button hover
    const donateButton = document.querySelector('.widget-image');
    if (donateButton) {
      donateButton.addEventListener('mouseenter', this.createHearts);
    }
    
    // Initial blur effect for the image grid
    setTimeout(() => {
      const imageGrid = document.querySelector('.slider');
      if (imageGrid) {
        imageGrid.style.filter = 'blur(5px)';
        imageGrid.style.opacity = '0.5';
        
        setTimeout(() => {
          imageGrid.style.transition = 'filter 1s ease-out, opacity 1s ease-out';
          imageGrid.style.filter = 'blur(0px)';
          imageGrid.style.opacity = '1';
        }, 500);
      }
    }, 100);
  },
  beforeUnmount() {
    clearInterval(this.textInterval);
    document.removeEventListener('mousedown', this.startDrawing);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.stopDrawing);
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('contextmenu', this.disableRightClick);
    
    // Remove heart animation event listener
    const donateButton = document.querySelector('.widget-image');
    if (donateButton) {
      donateButton.removeEventListener('mouseenter', this.createHearts);
    }
  },
  methods: {
    // Loading screen methods
    startYearTimer() {
      // Start with 1999 for 750ms (0.75s) with maximum blur
      setTimeout(() => {
        // Calculate how quickly to go through the middle years (2000-2024)
        const middleYears = 2024 - 2000 + 1;
        const middleYearsDuration = 1500; // 1.5 seconds for all middle years
        const intervalPerYear = middleYearsDuration / middleYears;
        
        const updateMiddleYears = (year) => {
          if (year <= 2024) {
            this.currentYear = year;
            
            // Calculate blur amount (from 10px at 2000 to 1px at 2024)
            const progress = (year - 2000) / (2024 - 2000);
            this.blurAmount = 10 - (progress * 9); // Gradually reduce from 10 to 1
            
            // Schedule the next year update
            setTimeout(() => {
              updateMiddleYears(year + 1);
            }, intervalPerYear);
          } else {
            // Show 2025 for 750ms (0.75s) with no blur
            this.currentYear = 2025;
            this.blurAmount = 0; // No blur at 2025
            
            setTimeout(() => {
              this.fadeOutLoadingScreen();
            }, 750);
          }
        };
        
        // Start updating from 2000
        updateMiddleYears(2000);
      }, 750); // Show 1999 for 750ms
    },
    fadeOutLoadingScreen() {
      setTimeout(() => {
        this.loadingComplete = true;
        this.startTextInterval();
      }, 500);
    },
    
    // Text slider methods
    startTextInterval() {
      this.textInterval = setInterval(this.changeText, 3000);
    },
    changeText() {
      if (this.currentTextIndex < this.textOptions.length) {
        this.sliderText = this.textOptions[this.currentTextIndex];
        this.currentTextIndex++;
      } else {
        this.currentTextIndex = 0;
        this.sliderText = this.textOptions[0];
      }
    },
    
    // Navigation and overlay methods
    navigateTo(url) {
      window.location.href = url;
    },
    openOverlay(type) {
      this.closeAllOverlays();
      this.activeOverlay = type;
      
      if (type === 'donation') {
        this.createHearts();
      }
    },
    closeOverlay() {
      this.activeOverlay = null;
    },
    closeAllOverlays() {
      this.activeOverlay = null;
      this.notificationPanelVisible = false;
    },
    toggleNotificationPanel() {
      this.notificationPanelVisible = !this.notificationPanelVisible;
    },
    
    // Utility methods
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert("Discord username copied to clipboard!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    },
    handleDonation(url) {
      // Create a temporary message element
      const messageElement = document.createElement('div');
      messageElement.style.position = 'fixed';
      messageElement.style.top = '40%';
      messageElement.style.left = '50%';
      messageElement.style.transform = 'translate(-50%, -50%)';
      messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      messageElement.style.color = 'white';
      messageElement.style.padding = '20px';
      messageElement.style.borderRadius = '10px';
      messageElement.style.zIndex = '200';
      messageElement.style.fontSize = '1.5rem';
      messageElement.style.fontWeight = 'bold';
      messageElement.innerText = "🤗Thanks so much for your support! It means a lot❤️";
      
      // Set width for mobile view
      if (window.innerWidth < 768) {
        messageElement.style.width = '70%';
      } else {
        messageElement.style.width = '450px';
      }
      
      // Append the message to the body
      document.body.appendChild(messageElement);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.open(url, '_blank');
        document.body.removeChild(messageElement);
      }, 2000);
    },
    
    // Drawing methods
    startDrawing(event) {
      this.isDrawing = true;
      this.handleMouseMove(event);
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    handleMouseMove(event) {
      if (this.isDrawing) {
        const drawingDot = document.createElement('div');
        drawingDot.classList.add('drawing');
        drawingDot.style.left = `${event.pageX}px`;
        drawingDot.style.top = `${event.pageY}px`;
        document.body.appendChild(drawingDot);
        
        // Remove the dot after animation completes
        setTimeout(() => {
          drawingDot.style.opacity = 0;
          setTimeout(() => {
            if (document.body.contains(drawingDot)) {
              document.body.removeChild(drawingDot);
            }
          }, 500);
        }, 5000);
      }
    },
    
    // Heart animation - optimized to reduce performance impact
    createHearts() {
      // Create a container for all hearts to improve performance
      const heartsContainer = document.createElement('div');
      heartsContainer.className = 'hearts-container';
      document.body.appendChild(heartsContainer);
      
      // Limit the number of hearts based on device performance
      const heartCount = window.innerWidth < 768 ? 5 : 10;
      
      for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.classList.add('heart');
          heart.innerText = '❤️';
          
          // Set size based on screen width
          heart.style.fontSize = window.innerWidth < 768 ? '20px' : '30px';
          heart.style.position = 'fixed';
          heart.style.left = `${Math.random() * 100}vw`;
          heart.style.top = '0';
          
          heartsContainer.appendChild(heart);
          
          // Remove heart after animation completes
          heart.addEventListener('animationend', () => {
            heart.remove();
          });
        }, i * 100); // Stagger the creation of hearts
      }
      
      // Remove the container after all animations complete
      setTimeout(() => {
        if (document.body.contains(heartsContainer)) {
          document.body.removeChild(heartsContainer);
        }
      }, 3000);
    },
    
    // Event handlers
    handleOutsideClick(event) {
      // Close notification panel when clicking outside
      if (this.notificationPanelVisible) {
        const panel = document.getElementById('notification-panel');
        const bell = document.querySelector('.notification-bell');
        
        if (panel && bell && !panel.contains(event.target) && !bell.contains(event.target)) {
          this.notificationPanelVisible = false;
        }
      }
    },
    disableRightClick(e) {
      e.preventDefault();
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  font-family: Arial, sans-serif;
  overflow: hidden;
  cursor: url('https://play.vsthemes.org/t-cursors/12251/25a255ea88403b8c79e2bb1b03efd2a5.webp'), auto; 
  background-color: #000; /* Ensure black background */
}

/* Custom cursor for buttons and specific classes */
button, .hover-image, .notification-bell, .widget-image, a {
  cursor: url('https://play.vsthemes.org/t-cursors/12251/b455a062e7b24797cc26a84981f31797.webp'), pointer !important;
}

/* Change link color to green and remove underline */
a {
  color: green;
  text-decoration: none;
}

a:hover {
  color: lightgreen;
  text-decoration: none;
}

.drawing {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 10px;
  height: 10px;
  background-color: rgba(0, 255, 0, 0.7);
  box-shadow: 0 0 10px rgba(0, 255, 0, 1), 0 0 20px rgba(0, 255, 0, 0.5);
  transition: opacity 0.5s ease;
  will-change: opacity;
}

.video-background {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: black;
}

.video-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  opacity: 1;
  transition: backdrop-filter 0.3s ease;
}

.loading-content {
  color: white;
  font-size: 3rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.blur-level {
  transition: backdrop-filter 0.3s ease;
}

.slider {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  height: 400px;
  pointer-events: auto;
  width: 90%; /* Added to ensure proper width control */
  max-width: 800px; /* Added to limit width on large screens */
}

.hover-image {
  width: 80%;
  max-Height: 60px;
  max-width: 300px;
  margin: 0 auto 30px auto; /* Increased from 20px to 30px */
  display: block; /* Make it a block element for proper centering */
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
  filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
  pointer-events: auto;
}

.hover-image:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 15px rgba(0, 255, 0, 0.7))
          drop-shadow(0 0 25px rgba(0, 255, 0, 0.5))
          drop-shadow(0 0 35px rgba(0, 255, 0, 0.3));
}

.three-d {
  font-size: 4rem;
  color: white;
  text-shadow: 
    1px 1px 0 rgba(0, 0, 0, 0.5), 
    2px 2px 0 rgba(0, 0, 0, 0.5), 
    3px 3px 0 rgba(0, 0, 0, 0.5), 
    4px 4px 0 rgba(0, 0, 0, 0.5), 
    5px 5px 0 rgba(0, 0, 0, 0.5);
  -webkit-text-stroke: 1px black;
  animation: float 3s ease-in-out infinite;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
  white-space: pre-line;
  line-height: 1.2; /* Increased from 0.9 to create more space between lines */
  margin-bottom: 20px; /* Added margin-bottom */
}

.three-d:hover {
  color: green;
}

.green-text {
  color: green;
}

.glow-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  color: white; 
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid grey;
  border-radius: 30px; /* Increased border-radius for more rounded buttons */
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: inline-block;
  min-width: 100px;
  width: fit-content;
  max-width: 250px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 5px 0;
  position: relative;
  pointer-events: auto;
  flex-wrap: wrap;
}

.glow-button:hover {
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5),
              0 0 30px rgba(0, 255, 0, 0.5), 
              0 0 40px rgba(0, 255, 0, 0.5), 
              0 0 50px rgba(0, 255, 0, 0.5);
  transform: scale(1.05);
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 55%;
  padding-top: 56.25%;
  margin-top: 20px;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: auto;
}

.widget-container {
  position: absolute;
  bottom: 20px; 
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.widget-image {
  width: 100px;
  transition: transform 0.3s ease, filter 0.3s ease;
  position: relative;
  z-index: 11;
  cursor: pointer;
}

.widget-image:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.5))
          drop-shadow(0 0 15px rgba(0, 255, 0, 0.3))
          drop-shadow(0 0 25px rgba(0, 255, 0, 0.2));
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.hearts-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
  will-change: transform;
}

.heart {
  position: absolute;
  animation: fall 2s forwards;
  font-size: 30px;
  will-change: transform, opacity;
}

@keyframes fall {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.notification-bell {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  z-index: 3;
}

#notification-panel {
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  z-index: 6;
  background-color: transparent; /* Changed from rgba(0, 0, 0, 0.8) to transparent */
}

#notification-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

#notification-panel .overlay-content {
  position: relative;
  color: white;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8); /* Added background color here instead */
  border: 2px solid green; /* Added green border to match other overlays */
  z-index: 2;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  text-align: center;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px 20px;
  border-radius: 5px;
  width: auto;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.footer-content {
  display: flex;
  align-items: center;
}

.footer a {
  display: inline-flex;
  align-items: center;
  margin: 0 3px;
}

.footer img {
  margin: 0 3px;
  display: inline-block;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  overflow: hidden;
}

.overlay-content {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border: 2px solid green;
  max-width: 800px;
  width: 90%;
  text-align: left;
  color: white;
  position: relative;
}

.overlay-content h2 {
  font-size: 1.9rem; /* Reduced from 2.2rem */
  font-weight: bold;
  margin-bottom: 15px;
}

.overlay-content h3 {
  font-size: 1.6rem; /* Reduced from 1.8rem */
  font-weight: bold;
  margin-bottom: 12px;
}

.overlay-content h4 {
  font-size: 1.3rem; /* Reduced from 1.5rem */
  font-weight: bold;
  margin-bottom: 10px;
}

.close-overlay {
  position: absolute;
  top: 5px;
  right: 12px;
  font-size: 24px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  z-index: 6;
}

.close-overlay:hover {
  color: green;
  cursor: pointer;
}

.table-scroll {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid white;
  text-align: left;
}

th {
  background-color: rgba(0, 255, 0, 0.5);
}

.expertise-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
}

.scrolling-text {
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.scrolling-text span {
  display: inline-block;
  margin-right: 60px;
  animation: scroll 31s linear infinite;
  animation-delay: 3s;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Media query for mobile devices */
@media only screen and (max-width: 600px) {
  .overlay-content h2 {
    font-size: 1.8rem;
  }
  
  .overlay-content h3 {
    font-size: 1.5rem;
  }
  
  .overlay-content h4 {
    font-size: 1.3rem;
  }
  
  .footer {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
  
  .footer a {
    margin: 0 2px;
  }
  
  .footer img {
    margin: 0 2px;
    width: 16px;
    height: 16px;
  }
}

/* Very small screens optimization */
@media only screen and (max-width: 375px) {
  .glow-button {
    font-size: 1.1rem; /* Further reduced font size */
    padding: 6px 12px; /* Smaller padding */
    max-width: 150px; /* Smaller max width */
  }
  .text.three-d {
    font-size: 1.8rem; /* Smaller font size */
    line-height: 1.1; /* Slightly reduced line height for smaller screens */
  }
  .button-container {
    gap: 5px; /* Smaller gap */
  }
  .iframe-container {
    height: 60%; /* Reduced height */
  }
}

/* Update the donation overlay heading */
.overlay-content h2[style*="text-align: center"] {
  font-size: 2.1rem; /* Reduced from 2.4rem */
  font-weight: bold;
}
</style>

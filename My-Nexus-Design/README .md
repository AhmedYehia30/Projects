# Design Conversion Website

A fully responsive, modern agency/portfolio website built with pure HTML, CSS, and JavaScript. This project demonstrates professional front-end development practices including semantic HTML, CSS Grid/Flexbox layouts, and vanilla JavaScript interactivity.

![Website Preview](assets/images/hero-bg.jpg)

## 🚀 Live Demo

**[View Live Site](https://ahmedyehia30.github.io/Projects/My-Nexus-Design/index.html)**

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Key Components](#key-components)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)
- [Customization](#customization)
- [Performance](#performance)

---

## ✨ Features

### Core Functionality
- **Sticky Navigation** - Header transforms on scroll with smooth transitions
- **Mobile Hamburger Menu** - Responsive navigation with toggle animation
- **Smooth Scrolling** - Navigation links scroll to sections with active state highlighting
- **Portfolio Filter** - Dynamic filtering by category (All, Branding, Web Design, App)
- **Project Modals** - Click any portfolio item to view details in a modal popup
- **Testimonial Slider** - Single-slide carousel with arrows, dots, and swipe support
- **Contact Form Validation** - Real-time validation with error messages
- **Animated Counters** - Statistics animate when scrolling into view
- **Back to Top Button** - Appears after scrolling down

### Design Features
- Modern gradient color scheme (Purple/Indigo primary, Pink accent)
- Smooth hover effects and transitions
- Fade-in animations on scroll
- Professional typography using Inter font family
- Consistent 8px grid spacing system

---

## 📁 Project Structure

```
design-conversion-website/
├── index.html              # Main HTML file with semantic structure
├── style.css               # Complete responsive CSS stylesheet
├── script.js               # Vanilla JavaScript functionality
├── README.md               # Project documentation
└── assets/
    └── images/
        ├── hero-bg.jpg     # Hero section background
        ├── project-1.jpg   # Portfolio project images
        ├── project-2.jpg
        ├── project-3.jpg
        ├── project-4.jpg
        ├── avatar-1.jpg    # Testimonial avatars
        ├── avatar-2.jpg
        └── avatar-3.jpg
```

---

## 🛠 Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks or libraries
- **Font Awesome** - Icons (via CDN)
- **Google Fonts** - Inter font family

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server (optional, for testing) - e.g., Live Server extension for VS Code

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd design-conversion-website
   ```

2. **Open the project**

   Option A - Direct open:
   - Double-click `index.html` to open in your default browser

   Option B - Local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (http-server)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

3. **View the website**
   - Navigate to `http://localhost:8000` or `http://127.0.0.1:8000`

---

## 🧩 Key Components

### 1. Navigation
- Fixed header that becomes sticky on scroll
- Mobile hamburger menu with smooth toggle animation
- Active state highlighting based on scroll position
- Keyboard accessible (Tab navigation)

### 2. Hero Section
- Full-screen height with background image
- Animated statistics counters
- Call-to-action buttons with hover effects
- Gradient overlay for text readability

### 3. Services Grid
- 3-column layout (responsive: 2-col tablet, 1-col mobile)
- Icon boxes with hover lift effect
- CSS Grid implementation

### 4. Portfolio Section
- Filterable grid with category buttons
- Hover overlay with project details
- Modal popup with project information
- Smooth filtering animations

### 5. Testimonials Slider
- **Single-slide display** (one opinion at a time)
- Navigation arrows (previous/next)
- Dot indicators for current position
- Auto-play functionality
- Touch/swipe support for mobile
- Keyboard navigation (arrow keys)

### 6. Contact Form
- Input validation (name, email, message)
- Real-time error messages
- Success state feedback
- Accessible form labels

---

## 📱 Responsive Design

The website is fully responsive across all device sizes:

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **Mobile** | < 768px | Single column, hamburger menu, stacked sections |
| **Tablet** | 768px - 1023px | 2-column services, adjusted spacing |
| **Desktop** | ≥ 1024px | Full 3-column layout, all features visible |

### Mobile-First Approach
- Base styles target mobile devices
- Media queries progressively enhance for larger screens
- Touch-friendly tap targets (minimum 44px)
- Optimized images and performance

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

**Note:** Internet Explorer is not supported due to use of modern CSS features (Grid, Custom Properties).

---

## 🎨 Customization

### Changing Colors
Edit CSS custom properties in `:root` (style.css):

```css
:root {
  --primary-color: #6366f1;      /* Main purple */
  --secondary-color: #ec4899;    /* Pink accent */
  --dark-color: #0f172a;         /* Dark background */
  --light-color: #f8fafc;        /* Light background */
  /* ... more variables */
}
```

### Adding Portfolio Items
Add new items to the portfolio grid in `index.html`:

```html
<div class="portfolio-item" data-category="web">
  <img src="assets/images/project-5.jpg" alt="New Project">
  <div class="portfolio-overlay">
    <h3>Project Title</h3>
    <p>Web Design</p>
  </div>
</div>
```

### Adding Testimonials
Add new slides to the testimonials slider in `index.html`:

```html
<div class="testimonial-slide">
  <div class="testimonial-content">
    <p>"Your testimonial text here..."</p>
    <div class="testimonial-author">
      <img src="assets/images/avatar-4.jpg" alt="Name">
      <div>
        <h4>Person Name</h4>
        <span>Position, Company</span>
      </div>
    </div>
  </div>
</div>
```

Then update the `totalSlides` variable in `script.js`:

```javascript
const totalSlides = 4; // Update to match number of testimonials
```

---

## ⚡ Performance

- **No external frameworks** - Pure vanilla JS for fast loading
- **Optimized images** - Compressed JPG format
- **Minimal HTTP requests** - Single CSS and JS file
- **CSS containment** - Used for layout optimization
- **Lazy loading ready** - Images can be enhanced with `loading="lazy"`

### Performance Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)

---

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels and roles where appropriate
- Keyboard navigation support (Tab, Enter, Escape, Arrow keys)
- Focus visible states for interactive elements
- Color contrast ratio meets WCAG 2.1 AA standards
- Reduced motion support (`prefers-reduced-motion` media query)

---

## 📝 Code Quality

- **HTML**: Validated with W3C Markup Validator
- **CSS**: Follows BEM-like naming convention, organized by section
- **JavaScript**: Modular functions, event delegation, no global pollution
- **Comments**: Inline documentation for complex logic
- **Formatting**: Consistent indentation and spacing

---

## 🔧 Future Enhancements

Potential improvements for production:

- [ ] Add dark/light mode toggle
- [ ] Implement service worker for offline support
- [ ] Add image lazy loading with Intersection Observer
- [ ] Integrate with backend for contact form submission
- [ ] Add multi-language support (i18n)
- [ ] Implement scroll-triggered animations with GSAP

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Created as a demonstration of modern front-end development techniques using only HTML, CSS, and JavaScript.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you encounter any issues or have questions:
- Open an issue in the repository
- Contact through the website contact form

---

**Happy Coding!** 🚀

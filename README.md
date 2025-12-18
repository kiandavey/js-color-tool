# 🎨 Color Lighten/Darken Tool

**Lumos** is a web-based utility for developers and designers to generate tints (lighten) and shades (darken) of any Hex color code. It is built with **Vanilla JavaScript** and features a custom-built engine for color channel manipulation.


## 🚀 Features

* **Real-time Validation**: Instantly checks if the input is a valid 3-digit or 6-digit Hex code.
* **Bidirectional Conversion**: Converts Hex strings to RGB objects and back to Hex for display.
* **Color Math**: accurately calculates the new R, G, and B values based on a percentage slider, ensuring values never exceed 255 or drop below 0.
* **Smart UI**:
    * **Glassmorphism Design**: Usage of `backdrop-filter: blur` and translucent backgrounds.
    * **Custom Toggle**: A purely CSS/JS-driven switch for "Lighten" vs "Darken" modes.

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3 (CSS Variables, Flexbox, Gradients).
* **Logic**: JavaScript (ES6+).
* **Fonts**: 'Space Mono' for data inputs, 'Roboto' for UI text.

## 💻 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/lumos-color-utility.git](https://github.com/yourusername/lumos-color-utility.git)
    ```
2.  **Run the App**:
    * Simply open `index.html` in your browser.

## 🧩 How It Works

The core logic revolves around the `alterColor` function. It performs the following steps without external libraries:

1.  **Parse Hex**: Slices the `#` and converts the string pairs (e.g., "FF") into integers (0-255).
2.  **Calculate Offset**: 
    ```javascript
    const adjust = Math.round(255 * (percentage / 100));
    ```
3.  **Clamp Values**: The new color channels are calculated and clamped to ensure valid RGB syntax:
    ```javascript
    const newR = Math.min(255, Math.max(0, r + adjust));
    ```
4.  **Reassemble**: The new RGB integers are converted back to Hex strings and padded with zeros if necessary.

## 📂 Project Structure

```text
lumos-color-utility/
├── index.html      # Structure
├── style.css       # Visuals (Dark Mode / Glassmorphism)
├── script.js       # Logic (Color Conversion Algorithms)
└── README.md       # Documentation

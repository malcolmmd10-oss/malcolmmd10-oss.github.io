# A Gentle Confession 💕

An interactive web app that guides someone through a heartfelt confession. Beautiful animations, responsive design, and emotional storytelling.

## Features

- **Interactive Screens**: 7+ screens with smooth transitions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Music Control**: Background music with toggle option
- **Reply System**: Users can send back a response (stored in localStorage)
- **Branching Logic**: Different responses based on user's emotional state
- **Animations**: Smooth fade-ins, slide-ins, and pulse animations

## Project Structure

```
confession-app/
├── index.html      # Main HTML structure
├── styles.css      # All CSS styling
├── script.js       # All JavaScript logic
├── package.json    # Project metadata
└── README.md       # This file
```

## How to Run

### Option 1: Open directly in browser
Simply open `index.html` in any modern web browser.

### Option 2: Use a local server
```bash
npx http-server
```
Then navigate to `http://localhost:8080`

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires JavaScript enabled.

## Data Storage

User replies are saved to the browser's localStorage under the key `confessionReplies`. Each entry contains:
- `message`: The user's reply
- `timestamp`: When the reply was sent
- `choice`: Which emotional state they selected (1, 2, or 3)

## Customization

- Edit text in `index.html` to change the confession message
- Modify colors in `styles.css` (search for hex color codes)
- Change the background music URL in `index.html` audio element
- Adjust animations and timing in `styles.css` and `script.js`

## License

MIT

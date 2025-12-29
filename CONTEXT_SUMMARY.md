# Widget Development Context Summary

## Project Overview
This is a chat widget project called "Cipher & Row" with a glassmorphism UI design. The project includes both a dashboard (Next.js/React) and widget testing environment.

## Recent Changes Made

### 1. **Blur Intensity Feature** ✅
- Added `blurIntensity` parameter (0-100) to widget configuration
- Controls glassmorphism effect strength across all widget elements
- Default value: 50 (baseline)
- **File**: `widget-test/widget-backup.js` (line 34, 84-87)
- **File**: `widget-test/src-backup/widget-ui.js` (line 19, 125-140, 185-210)

### 2. **Widget File Renamed** ✅
- Renamed: `widget-backup.js` → `widget-glass.js`
- Updated all HTML test files to use new name:
  - `index.html`
  - `test-blur-debug.html`
  - `test-visibility-state.html`
  - `test-z-index.html`
  - `demo-installation.html`

### 3. **Shadow Intensity Reduced** ✅
- Made shadows much lighter and more subtle
- **Bot bubbles**: `0 2px 8px rgba(0,0,0,0.06)` (was 0.3)
- **User bubbles**: `0 2px 8px rgba(0,0,0,0.05)` (was 0.15)
- **Container**: `0 8px 24px rgba(0,0,0,0.08)` (was 0.2)
- **File**: `widget-test/src-backup/widget-styles.js` (lines 307-310, 321-324)
- **File**: `widget-test/src-backup/widget-ui.js` (line 191)

### 4. **Padding Fix** ✅
- Removed padding from `.chat-content-blur` container (was 20px)
- Added padding to inner elements instead:
  - `.messages`: 20px (top, left, right)
  - `.input-area`: 0 20px
  - `.footer`: 16px 20px 20px 20px
- **File**: `widget-test/src-backup/widget-ui.js` (lines 192, 199-210)
- **Benefit**: Eliminates extra frosted border around content

### 5. **Auto-Scroll Improvements** ✅
- Added scroll to bottom when typing indicator appears
- Added final scroll after bot message completes
- **File**: `widget-test/src-backup/widget-ui.js` (line 347, 395)
- **File**: `widget-test/src/widget-ui.js` (line 236)

### 6. **Position Button Order Fixed** ✅
- Swapped button positions in installation page
- "Bottom Left" now on left side, "Bottom Right" on right side
- **File**: `app/(dashboard)/dashboard/installation/page.tsx` (lines 337-357)

## Key File Locations

### Widget Files (Glassmorphism Version)
- **Main Entry**: `widget-test/widget-glass.js`
- **UI Module**: `widget-test/src-backup/widget-ui.js`
- **Styles**: `widget-test/src-backup/widget-styles.js`
- **API**: `widget-test/src-backup/widget-api.js`
- **Icons**: `widget-test/src-backup/widget-icons.js`

### Widget Files (Original Version)
- **Main Entry**: `widget-test/widget.js`
- **UI Module**: `widget-test/src/widget-ui.js`
- **Styles**: `widget-test/src/widget-styles.js`

### Dashboard
- **Installation Page**: `app/(dashboard)/dashboard/installation/page.tsx`

### Test Files
- `widget-test/index.html` - Main test page (blurIntensity: 0)
- `widget-test/test-blur-debug.html` - Blur debugging tool (blurIntensity: 50)
- `widget-test/test-visibility-state.html` - State testing (blurIntensity: 25)
- `widget-test/demo-installation.html` - Installation demo (blurIntensity: 40)
- `widget-test/test-z-index.html` - Z-index testing (blurIntensity: 40)

## Widget Configuration Parameters

```javascript
window.CipherRowConfig = {
  clientId: "string",           // User/Client ID
  botId: "string",              // Bot ID
  apiKey: "string",             // API Key
  botName: "string",            // Bot display name
  primaryColor: "#hex",         // Primary color
  greeting: "string",           // Greeting message
  position: "bottom-right",     // "bottom-right" | "bottom-left"
  offsetX: number,              // Pixels from edge (horizontal)
  offsetY: number,              // Pixels from edge (vertical)
  blurIntensity: number        // 0-100 (glassmorphism effect)
};
```

## Blur Intensity Scale

| Value | Effect | Multiplier | Bubble Blur | Bot Bubble Blur |
|-------|--------|------------|-------------|-----------------|
| 0     | No blur (crystal clear) | 0.0 | 0px | 0px |
| 25    | Light blur | 0.5 | 12px | 40px |
| 50    | Default blur | 1.0 | 24px | 80px |
| 75    | Strong blur | 1.5 | 36px | 120px |
| 100   | Maximum blur | 2.0 | 48px | 160px |

## Outstanding Issues / TODO

### ⚠️ Missing in Installation Page
The `blurIntensity` parameter is **NOT included** in the installation snippet generation.

**Action Needed**: Add `blurIntensity` to:
1. State: `const [blurIntensity, setBlurIntensity] = useState(50);`
2. Snippet generation (line 26-39)
3. UI input field
4. localStorage saving/loading
5. useEffect dependency array (line 128)

### Suggested Addition
Add a slider/input for blur intensity in the installation page:
```tsx
<div>
  <label>Blur Intensity (0-100)</label>
  <input
    type="range"
    min="0"
    max="100"
    value={blurIntensity}
    onChange={(e) => setBlurIntensity(Number(e.target.value))}
  />
  <span>{blurIntensity}</span>
</div>
```

## Installation Page Auto-Update

The installation snippet **automatically updates** when any setting changes via this useEffect:
```typescript
useEffect(() => {
  setCode(generateInstallationCode());
}, [botName, primaryColor, greeting, position, offsetX, offsetY, clientId, botId, apiKey]);
// Note: blurIntensity missing from dependencies!
```

## Design Decisions

1. **Glassmorphism Style**: Heavy use of `backdrop-filter: blur()` for frosted glass effect
2. **Shadow DOM**: Widget uses shadow DOM for style isolation
3. **Default Blur**: 50 provides balanced glassmorphism without being too heavy
4. **Auto-scroll**: Ensures users always see latest messages and typing indicators
5. **Lighter Shadows**: More modern, less heavy appearance

## Testing Background Colors

For testing blur visibility:
- **index.html**: Colorful gradient background (to showcase blur)
- **Other files**: Simple gradient backgrounds
- **Recommendation**: Use varied/colorful backgrounds to see blur effect clearly

## Next Steps

1. Add `blurIntensity` to installation page UI and snippet
2. Test widget on various website backgrounds
3. Consider adding blur intensity to API/database for persistence
4. Update documentation with blur parameter

---

**Last Updated**: December 28, 2024
**Session Length**: Extensive (~122k tokens used)
**Files Modified**: 11 files
**New Files Created**: 1 (test-blur-debug.html)

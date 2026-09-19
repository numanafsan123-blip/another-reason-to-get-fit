# Image Manifest & AI Generation Prompts

**Project:** Another Reason to Get Fit  
**Academic Task 1:** MKT901 – Web Marketing  
**Image Policy:** All images must be local files stored in `assets/images/`. WebP format is strongly recommended for optimal web performance and SEO page speed.

---

## Complete Image Specifications

| Target File Path | Dimensions | Aspect Ratio | Primary Location | Semantic Alt Text |
| :--- | :--- | :--- | :--- | :--- |
| `assets/images/common/hero-main.webp` | 1200 × 675 px | 16:9 | `index.html` (Hero Section) | "Barbell on gym floor alongside fresh wholesome food ingredients representing fitness and nutrition" |
| `assets/images/common/calc-banner.webp` | 1200 × 675 px | 16:9 | `calculators/index.html` | "Minimalist fitness workspace with tape measure, notepad, and digital stopwatch" |
| `assets/images/fitness/pathway.webp` | 1200 × 675 px | 16:9 | `fitness/beginner-to-intermediate-guide.html` | "Focused lifter resting beside a barbell rack in an educational gym setting" |
| `assets/images/fitness/rest-sets.webp` | 1200 × 675 px | 16:9 | `fitness/rest-between-sets.html` | "Athlete timing rest interval between heavy compound sets using a digital stopwatch" |
| `assets/images/fitness/overload.webp` | 1200 × 675 px | 16:9 | `fitness/progressive-overload.html` | "Close-up of barbell with cast iron plates and a workout logbook tracking sets" |
| `assets/images/fitness/mistakes.webp` | 1200 × 675 px | 16:9 | `fitness/beginner-mistakes.html` | "Dumbbells arranged neatly on a gym floor symbolizing disciplined exercise selection" |
| `assets/images/diet/calories.webp` | 1200 × 675 px | 16:9 | `diet/understanding-calories.html` | "Healthy Indian meal bowls with dal, boiled eggs, brown rice, and fresh vegetables" |
| `assets/images/diet/protein-rich.webp` | 1200 × 675 px | 16:9 | `diet/protein-rich-indian-foods.html` | "Paneer cubes, soya chunks, roasted chana, and eggs displayed in small ceramic bowls" |
| `assets/images/diet/balanced-plate.webp` | 1200 × 675 px | 16:9 | `diet/balanced-indian-meal.html` | "Balanced Indian fitness thali featuring rotis, dal, fresh curd, and sliced raw vegetables" |
| `assets/images/diet/pre-post.webp` | 1200 × 675 px | 16:9 | `diet/pre-and-post-workout-nutrition.html` | "Pre-workout snack arrangement with sliced bananas, roasted chana, and clean water" |

---

## Ready-to-Use AI Generation Prompts (For ChatGPT / DeepSeek)

### 1. Hero Main (`assets/images/common/hero-main.webp`)
> *Prompt:* High-quality, clean photographic style composition. A modern gym barbell loaded with black iron plates rests cleanly on a polished concrete gym floor. In the soft-focused background on a wooden preparation surface are fresh, wholesome everyday Indian food items: a clean glass jar of roasted chana, whole eggs, and sliced lemons. Bright, natural morning daylight, cinematic lighting, editorial sports aesthetic, 16:9 aspect ratio, 4k resolution, no text, no watermarks, realistic textures.

### 2. Rest Between Sets (`assets/images/fitness/rest-sets.webp`)
> *Prompt:* Professional editorial photography of an athletic young person sitting in a relaxed, focused posture on a flat gym bench after a set of squats. The athlete holds a digital stopwatch in hand, tracking recovery time. Warm sunlight streams into an airy modern fitness space. Clear depth of field, sharp focus on the stopwatch and gym equipment, athletic discipline theme, 16:9, highly detailed, photorealistic.

### 3. Progressive Overload (`assets/images/fitness/overload.webp`)
> *Prompt:* Macro close-up shot of a barbell sleeve with cast iron weight plates loaded on the bar, barbell collar securely fastened. Lying next to the barbell is an open training logbook with handwritten sets and reps. Chalk dust texture on the knurling of the bar. Realistic gym environment, warm daylight tones, motivational and educational mood, 16:9 aspect ratio, no AI artifacts.

### 4. High-Protein Indian Foods (`assets/images/diet/protein-rich.webp`)
> *Prompt:* Overhead flat-lay culinary photograph of realistic high-protein Indian staples neatly arranged in minimalist matte ceramic bowls on a light stone kitchen countertop. The bowls contain fresh white paneer cubes, textured soya chunks, roasted chana (black chickpeas), whole boiled eggs peeled, and yellow moong dal. Bright natural lighting, fresh vibrant colors, culinary magazine style, clean composition, 16:9 aspect ratio.

### 5. Balanced Indian Fitness Plate (`assets/images/diet/balanced-plate.webp`)
> *Prompt:* Top-down modern culinary photo of a balanced fitness plate styled in the Indian context: a clean modern white ceramic plate divided into sections featuring two soft whole-wheat rotis, a generous bowl of thick cooked yellow dal garnished with coriander, a small bowl of creamy set curd (dahi), and a colorful side of sliced cucumbers, tomatoes, and carrots. Daylight food photography, crisp focus, appetizing and healthy, 16:9.

---

## Implementation Guidelines
1. Generate the images using either ChatGPT (DALL-E 3) or DeepSeek.
2. Convert and export as `.webp` or `.jpg`.
3. Save each image with the exact filename into its specified directory:
   - `assets/images/common/`
   - `assets/images/fitness/`
   - `assets/images/diet/`
4. The website's CSS and HTML already have responsive image wrappers, explicit `width` and `height`, and `loading="lazy"` enabled for speed.

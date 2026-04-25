# 📘 Amplify Lessons

A fast, interactive learning hub designed to help students explore lessons through a clean, searchable interface with tags, favorites, and smooth navigation.

---

## 📁 Project Structure


/index.html Main learning dashboard
/style.css Visual styling and layout system
/script.js Optional logic and interactivity
/lessons/ Individual lesson content folders


---

## ✨ Features

### 🔎 Smart Search
- Search lessons by title or topic tags  
- Supports partial matching (example: `surviv`, `multi`, `phys`)  
- Fast filtering with instant results  

### ⭐ Favorites System
- Mark lessons as favorites with a simple star toggle  
- Favorites are saved locally in the browser  
- Dedicated favorites view for quick access  
- Displays a message when no favorites are selected  

### 🏷️ Tag System
Lessons are organized using simple learning categories such as:
- Reading / Logic
- Problem Solving
- Physics / Motion
- Strategy
- Multiplayer / Collaboration
- Speed / Reaction

Tags allow flexible grouping and discovery.

### 🖱️ Custom Cursor (Main Page)
- Smooth animated cursor effect  
- Replaces default system pointer on the main page  
- Improves visual focus and interaction feedback  

### 🎨 Modern Interface
- Dark, distraction-free design  
- Smooth hover transitions  
- Card-based lesson layout  
- Responsive layout for different screen sizes  

---

## 🚀 How to Use

1. Open `index.html` in a browser  
2. Browse available lessons  
3. Use search or tags to filter content  
4. Star lessons to save them as favorites  

No installation or setup required.

---

## 🧠 Lesson Structure

Each lesson entry follows this format:

```html
<a class="lesson-link"
   data-name="lesson title"
   data-tags="topic1 topic2"
   href="./lessons/gX">

  <img src="./lessons/LessonFolder/icon.png" alt="">
  <span>Lesson Title</span>
  <span class="tag">Category</span>
  <span class="fav">☆</span>

</a>

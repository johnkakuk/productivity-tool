# Productivity Tool

A task manager built with Expo for Module 1. Runs on iOS and web.

## Setup

You need Node 18+ and, for iOS, Xcode with an iOS simulator.

```bash
npm install
npx expo start
```

Then press `w` for web or `i` for the iOS simulator.

If styles look broken (black text on a black background, for example), restart with a cleared cache:

```bash
npx expo start -c
```

## Testing Notes

**Platforms tested:** Web and iOS Simulator (iPhone 17 Pro).

**Check screens:**

- `/storage-test` – runs SQLite, AsyncStorage, and SecureStore tests
- `/style-test` – confirms NativeWind/Tailwind is working

**Known issues:**

- Tasks use SQLite on iOS but AsyncStorage on web, because SQLite won't load on web without extra setup. The app works the same on both, but the storage underneath is different.
- Settings use SecureStore on iOS. Web has no secure storage, so settings go in localStorage.
- If you pick Light mode, the app can show dark for a split second on launch while the setting loads.
- Android hasn't been tested.
- The code lives in `src/` (`src/app`, `src/components`, and so on), which is newer Expo's default, instead of the top-level folders in the assignment's structure.

## Features

**Works:**

- Create tasks with a title, description, and priority (High, Medium, Low)
- Mark tasks complete/incomplete, with a checkmark and strikethrough
- Delete tasks, with a confirmation
- Priority color coding on each task
- Filter by All / Open / Done
- Sort by newest or priority
- Task stats: total, completed, percent done, and a progress bar
- Settings: your name (shown on the task list) and theme
- **Dark mode (enhanced feature):** Dark/Light toggle, saved securely, consistent across every screen
- Responsive layout: 1 column on phones, 2–3 on wide screens

**Doesn't (yet):**

- Editing a task after it's created
- Text search (filtering is by completion status only)
- Remembering the filter and sort after a reload

## Reflection

See [REFLECTION.md](REFLECTION.md).

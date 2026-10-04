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

The most challenging part of cross-platform development was that "the same code" doesn't mean "the same app." Phones and browsers handle storage completely differently, so tasks ended up in SQLite on iOS and AsyncStorage on web. The browser also had its own surprises. Pop-up confirmations silently did nothing on web, and the header's back button refused to change color with the rest of the theme until the screen was reopened. A lot of the work was testing the same feature on both platforms and finding out it only worked on one.

To handle the time constraint, I leaned on AI to troubleshoot, and I focused on getting the required features working before adding anything extra. For the enhanced feature I picked dark mode, partly because I'd already built a light/dark theme for another project (Slate Writer) and could reuse that approach instead of starting from scratch. That saved a ton of time.

With more time, I'd make the storage truly identical on both platforms by getting SQLite running on web. I'd also add task editing, a real text search, and testing on Android, which I skipped entirely. The app would also remember your filter and sort choices between sessions.

What surprised me most was how much of the course material was out of date (zero offense intended Crystal!). The lessons were written for an older version of Expo, so setup steps, package versions, and even some of the provided code didn't work as written. Making the class's code work took as much time as writing my own.

I was also surprised by how one symptom can hide several problems. My seemingly simple "styling doesn't work" problem turned out to be three separate issues: wrong folder paths, a missing config line, and a dev server still running the old setup. Lastly, I didn't expect a hard rule like "always restart the server after changing config" to matter as much as it did. Lots of things that looked broken were just stale.

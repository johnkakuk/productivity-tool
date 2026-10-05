# Reflection

The most challenging part of cross-platform development was that "the same code" doesn't mean "the same app." Phones and browsers handle storage completely differently, so tasks ended up in SQLite on iOS and AsyncStorage on web. The browser also had its own surprises. Pop-up confirmations silently did nothing on web, and the header's back button refused to change color with the rest of the theme until the screen was reopened. A lot of the work was testing the same feature on both platforms and finding out it only worked on one.

To handle the time constraint, I leaned on AI to troubleshoot, and I focused on getting the required features working before adding anything extra. For the enhanced feature I picked dark mode, partly because I'd already built a light/dark theme for another project (Slate Writer) and could reuse that approach instead of starting from scratch. That saved a ton of time.

With more time, I'd make the storage truly identical on both platforms by getting SQLite running on web. I'd also add task editing, a real text search, and testing on Android, which I skipped entirely. The app would also remember your filter and sort choices between sessions.

What surprised me most was how much of the course material was out of date (zero offense intended Crystal!). The lessons were written for an older version of Expo, so setup steps, package versions, and even some of the provided code didn't work as written. Making the class's code work took as much time as writing my own.

I was also surprised by how one symptom can hide several problems. My seemingly simple "styling doesn't work" problem turned out to be three separate issues: wrong folder paths, a missing config line, and a dev server still running the old setup. Lastly, I didn't expect a hard rule like "always restart the server after changing config" to matter as much as it did. Lots of things that looked broken were just stale.

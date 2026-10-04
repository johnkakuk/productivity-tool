# Issues Encountered:

1. Issue: Red underlines all over the navigation helper.
   Solution: Accidentally pasted example code into the helper file. Moved it to the task list.
2. Issue: API file couldn't find the config.
   Solution: Wrong folder path, fixed it.
3. Issue: Layout wanted an analytics setting that didn't exist.
   Solution: Had the ChatGPT man add it to the config.
4. Issue: Splash screen would never go away on phones.
   Solution: Removed the line holding it up.
5. Issue: Type error reading tasks from the database.
   Solution: Told TypeScript what a database row looks like.
6. Issue: Priority showed "NaN."
   Solution: I had changed it from a number to a word (low/medium/high). Showed the word.
7. Issue: Delete did nothing on web.
    Solution: Phone-style pop-ups don't work in browsers. Used the browser's confirm box.
8. Issue: Toggling or deleting would crash on iPhone.
    Solution: The class code left those as placeholders. Wrote them.
9. Issue: Error flashed when the list first loaded.
    Solution: It asked for tasks before the database was open. I made it wait.
10. Issue: Original lesson used styled(), which NativeWind removed.
    Solution: Used className instead.
11. Issue: Stock styling looked like booty.
    Solution: Made it dark and moody with a lime accent.
12. Issue: Storage test took down the whole web app.
    Solution: SQLite can't load on web. Had the ChatGPT man move the SQLite test into a phone-only file.
13. Issue: Verification lesson's setup steps were for an older Expo.
    Solution: Skipped them.

Setup Time: \~180 minutes ish

Most Challenging Part: NativeWind. Outdated setup steps, wrong folders, and then black text on black because the server was still running the old setup. Three separate "styling not working" problems
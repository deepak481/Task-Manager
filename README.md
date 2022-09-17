# todo_

An offline TODO App for the browser using React JS.

Key Features :
    + A simple input bar to add Todo(s) on pressing the return-key.
    + A list of TODO cards where each todo is appended on creation.
    + Clicking on a TODO card should mark the TODO as complete and move it to the bottom
    of the list.
    + The active TODO cards should appear in order of creation (most recent on top), while the
    completed todo cards should appear in order of completion (most recent on top). + A reset
    button on the top right corner of the App to clear all Todo(s) and return to initial state.
    + Hitting the refresh button (including hard refresh) in the browser should not cause any
    change in the state of the app (it should work like a regular offline app).
    + Create a Hash-tag feature:
    + Any text in todo matching the #hashtag pattern should be separately highlighted.
    + Clicking on a hashtag should act as a filter and show only Todo(s) containing that tag.
    + Hashtags can be stacked and the result should be only Todo(s) where all of them are
    present (ex. after clicking #work I should then be able to click #back-end to see Todo(s)
    containing both tags).

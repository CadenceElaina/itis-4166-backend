# Anki deck — ITIS 4166 Modules 1-4

`itis4166-m1-m4.txt` is 78 cards, tab-separated, HTML enabled. Built from
`../q1-cheatsheet.md` and `../q1.md`, weighted toward the Quiz 1 format
(80 of 100 points were "here is a snippet, what is wrong and how do you fix it").

## Import

1. Open Anki.
2. **File -> Import**, pick `itis4166-m1-m4.txt`.
3. Choose or create the target deck.
4. Note type: **Basic**. Field mapping should already read
   Field 1 -> Front, Field 2 -> Back, Field 3 -> Tags.
5. Confirm **Allow HTML in fields** is checked, or the code blocks will show
   raw `<pre>` tags.
6. Import.

The four `#` lines at the top of the file set the separator, HTML flag and tag
column automatically in Anki 2.1.55+. On an older version, set those three
options by hand in the import dialog.

## Tags

Module tags `m1` `m2` `m3` `m4`, plus topic tags: `falsy` `arrays` `async`
`scope` `destructuring` `express` `routing` `middleware` `errors` `layers`
`rest` `query` `http` `modules` `npm`.

Two tags worth filtering on while cramming:

- `trace` — "what does this print" cards, the output-prediction format.
- `recall` — the ten highest-frequency facts, for a last pass before the exam.

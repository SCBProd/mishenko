# Approved artistic journey

The artist's manuscript received on 27 October 2026 is retained verbatim in
`approved-artistic-journey-ru.docx`. The published Russian Word file is a byte-for-byte
copy. Its paragraph layout, page break, contact band and typography control the
four translations in `journey-translations.json`.

Run `build-journey.py` with Python and python-docx to regenerate only these five
Word documents. `build.py` delegates journey generation to the same builder.
Export through Microsoft Word on Windows with `export-pdf.ps1`, or export only
the five journey files when the CV has not changed. Inspect the exported pages
before publishing. Rebuild the combined archive and update download versions.

The English academy name follows the Ukrainian education register:
https://registry.edbo.gov.ua/university/132/entrant

Website translation coverage can be checked with:

```
node scripts/check-translations.mjs
```

The check covers five-language project data, photo captions, graphic description
coverage, sketch series, asset references and language selection on the hub and
its photography and 3D placeholder pages. It complements editorial review and
does not replace visual inspection or native-language proofreading.

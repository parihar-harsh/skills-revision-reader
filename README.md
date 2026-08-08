# Skills Revision Reader

A static, navigable revision interface for 472 GFG-aligned interview questions organized into 17 resume-technology categories.

The reader defaults to 327 high-frequency questions and can switch to the complete question bank. It runs entirely in the browser. Reviewed progress, frequency filter, display mode, and theme preferences are stored locally in the browser and are not uploaded anywhere.

## Regenerate

The deployable `index.html` is generated from the source question bank in the parent directory:

```bash
cd ..
node generate-skills-reader.js
```

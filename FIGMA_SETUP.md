# Figma Setup Guide

Follow these steps once to connect your Figma design system to this project.

---

## Step 1: Get your Figma personal access token

1. Open Figma in your browser and log in
2. Click your profile picture (top-left) → **Settings**
3. Scroll to **Personal access tokens**
4. Click **Generate new token**, give it a name (e.g. "Claude Code")
5. Copy the token — you'll need it in the next step

---

## Step 2: Get your Figma file key

1. Open your design system Figma file
2. Look at the URL — it looks like: `https://www.figma.com/design/ABC123XYZ/My-Design-System`
3. The file key is the part after `/design/` — e.g. `ABC123XYZ`

---

## Step 3: Configure the Figma MCP in Claude Code

Tell Claude Code:
> "Set up the Figma MCP with my token: [paste your token here]"

Or go to **Settings → MCP Servers** and add the Figma MCP manually.

---

## Step 4: Create a `.env` file for the sync script

In the project folder, create a file called `.env` with:

```
FIGMA_TOKEN=your_token_here
FIGMA_FILE_KEY=L1pEBeQ807VixpBZMzFo39
```

Replace `your_token_here` with your Figma personal access token.

> ⚠️ Never share this file or commit it to git. It is already in `.gitignore`.

---

## Step 5: Run the first sync

In the Claude Code terminal, run:

```bash
npm run sync-figma
```

This reads your Figma colour palettes and updates the 4 product theme files.

---

## Step 6: Preview in Storybook

```bash
npm run storybook
```

Use the **Theme** dropdown in the toolbar to switch between doc-central, nav-central, draft-central, and agent-central.

---

## Ongoing use

| What happened | What to run |
|--------------|-------------|
| Designer updated Figma colours | `npm run sync-figma` |
| Want to browse components | `npm run storybook` |
| Want to build a new product page | Tell Claude: "Build a [page] for [product] using the design system" |

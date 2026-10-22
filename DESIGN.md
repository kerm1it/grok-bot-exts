---
name: Bot Extensions
description: A digital accession ledger for inspectable bot extensions.
colors:
  ink: "#132836"
  ink-soft: "#425662"
  paper: "#f5f0e5"
  paper-raised: "#fffdf7"
  paper-deep: "#ebe3d3"
  rule: "#c9bfac"
  rule-strong: "#887f70"
  vermilion: "#c6432d"
  vermilion-dark: "#94301f"
  teal: "#236d70"
  focus: "#087f8c"
typography:
  display:
    fontFamily: "Newsreader Variable, Georgia, serif"
    fontSize: "clamp(3.1rem, 7vw, 6rem)"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Sans 3 Variable, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  control: "8px"
  surface: "12px"
  status: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  section: "92px"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper-raised}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion-dark}"
    textColor: "{colors.paper-raised}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "46px"
  search-field:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "18px"
---

# Design System: Bot Extensions

## Overview

**Creative North Star: "The Accession Ledger"**

Bot Extensions borrows the clarity of a well-kept collection register: warm paper surfaces, dark archival ink, ruled dividers, and small vermilion marks that make provenance easy to scan. The system is editorial but operational. Large serif headlines establish orientation; dense rows carry the work without turning every record into a promotional card.

The visual world stays digital rather than imitating aged paper or stamped metal. Precision comes from alignment, content density, source labels, and restrained motion. The two bot ecosystems share one browsing grammar while their names, capabilities, and dependency structures remain visibly distinct.

**Key Characteristics:**

- Warm paper ground with ink-navy framing
- Editorial serif hierarchy paired with a highly legible humanist body face
- Ruled ledger rows instead of a wall of equal cards
- Vermilion used for actions, status, and moving register marks
- Compact provenance labels and generous section separation

## Colors

The palette behaves like fresh paper, archival ink, and a single active annotation color.

### Primary

- **Register Vermilion**: Primary actions, official-status emphasis, and active index marks.
- **Pressed Vermilion**: Hover state for the primary action.

### Secondary

- **Catalog Teal**: Alternate accession marks that help long ledgers retain visual rhythm.
- **Focus Teal**: Keyboard focus and active field boundaries; it is functional, not decorative.

### Neutral

- **Archive Ink**: Mastheads, footers, headings, and primary text.
- **Soft Ink**: Supporting copy and metadata that must remain readable.
- **Ledger Paper**: Default page ground.
- **Raised Paper**: Search fields and provenance panels.
- **Deep Paper**: Hovered rows and secondary control states.
- **Ledger Rule / Strong Rule**: Dividers and structural boundaries.

### Named Rules

**The Annotation Rule.** Vermilion marks decisions and trusted status; it never becomes a large decorative field.

**The Paper Contrast Rule.** Supporting text uses Soft Ink on paper, never low-contrast neutral gray.

## Typography

**Display Font:** Newsreader Variable (with Georgia fallback)  
**Body Font:** Source Sans 3 Variable (with Noto Sans SC and PingFang SC fallbacks)  
**Label/Mono Font:** SFMono-Regular (with Consolas and Liberation Mono fallbacks)

**Character:** Newsreader makes the catalog feel edited and considered without slowing down scanning. Source Sans 3 carries mixed English and Chinese interface copy cleanly. Monospace is reserved for IDs, counts, and collection labels.

### Hierarchy

- **Display** (650, fluid 3.1–6rem, 1.02): Home and directory titles with a short measure.
- **Headline** (650, fluid 2–3.4rem, 1.02): Major collection and record sections.
- **Title** (650, 1.17–1.5rem): Record names and platform headings.
- **Body** (400, 1rem, 1.55): Interface copy, with long-form record text capped near 72 characters.
- **Label** (400–700, 0.72–0.78rem, up to 0.08em tracking): IDs, category metadata, counts, and ledger headers.

### Named Rules

**The Data Voice Rule.** Monospace appears only when the content is an identifier, measurement, count, or controlled label.

## Layout

The content container tops out at 1180px and keeps a 20px minimum page gutter. The home viewport uses a two-column ledger: the primary search and official records occupy the wider column, while the collection index occupies the narrower column. Directory pages use a 238px sticky filter rail beside the results ledger. Detail pages place the record body beside a 310px sticky provenance panel.

Section separation is generous (92px on desktop), while items inside a ledger are compact. At 920px, column layouts stack and filters become a horizontal grid. At 680px, navigation simplifies, filters become two columns, ledger records reflow into three compact tracks, and platform panels stack. Nothing relies on a fixed desktop width.

## Elevation & Depth

The system is flat by default. Ruled boundaries and tonal paper changes carry most depth. Only a primary search field and a sticky provenance panel receive the ambient lift (`0 12px 30px rgba(19, 40, 54, 0.1)`) needed to distinguish an active work surface.

### Named Rules

**The Flat Ledger Rule.** Repeated records use rules and surface color, never individual shadows or nested cards.

## Shapes

Controls use gently squared 8px corners. Raised work surfaces use 12px corners. Status badges alone use a pill silhouette. Accession marks are slim vertical rectangles with 3px corners; they are data rhythm, not side-border decoration. Borders are one pixel and use the ledger-rule colors.

## Components

### Buttons

- **Shape:** Compact rectangular control with gently squared corners (8px).
- **Primary:** Register Vermilion with raised-paper text and a 46px minimum height.
- **Hover / Focus:** Hover deepens to Pressed Vermilion; keyboard focus uses the shared 3px Focus Teal ring.
- **Secondary:** Transparent with a strong ledger rule; hover fills with Deep Paper.

### Chips

- **Style:** Status-only pill using a pale vermilion surface and dark vermilion text.
- **State:** Chips communicate official or verified provenance and are never used as decorative category clouds.

### Cards / Containers

- **Corner Style:** Raised surfaces use a 12px radius.
- **Background:** Raised Paper over Ledger Paper.
- **Shadow Strategy:** Ambient lift is limited to the search field and provenance panel.
- **Border:** One strong ledger rule.
- **Internal Padding:** 22–24px for compact panels.

### Inputs / Fields

- **Style:** Raised Paper, strong ledger-rule border, 8–12px radius, and a visible search icon.
- **Focus:** Boundary changes to Focus Teal with a restrained outer ring; the home search also moves a small vermilion register mark across the field.
- **Disabled:** Controls retain their shape and reduce opacity without removing labels.

### Navigation

Navigation sits on Archive Ink with raised-paper text. It is compact, direct, and free of dropdowns in this release. Locale switching is the only pill-shaped navigation control. Mobile keeps the brand and locale switch, while secondary links move out of the masthead.

### Ledger Row

The signature record component uses a slim accession mark, serif name, short summary, monospaced platform metadata, and a direct record action. Rows gain a Deep Paper surface on hover. A selected row briefly advances its accession mark before navigation, unless reduced motion is requested.

## Do's and Don'ts

### Do:

- **Do** place platform, type, publisher, and provenance close to every extension decision.
- **Do** use ruled rows for repeated records and reserve raised surfaces for active work or provenance.
- **Do** keep official entries ahead of community entries and reinforce status with text as well as color.
- **Do** preserve the distinct English and Chinese line breaks at every breakpoint.

### Don't:

- **Don't** turn the directory into a grid of interchangeable icon cards.
- **Don't** use vermilion as a decorative background or rely on color alone for trust.
- **Don't** imitate physical aging, embossing, stamps, or paper texture with CSS effects.
- **Don't** use monospace as a general technical costume.


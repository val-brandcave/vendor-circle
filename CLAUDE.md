# Project Rules for Claude

## Component Architecture (Atomic Design)

Follow atomic design principles when creating UI components:

- **Atoms**: Basic building blocks (buttons, inputs, labels, icons). Single responsibility, no business logic.
- **Molecules**: Simple combinations of atoms (search bar = input + button, form field = label + input + error message).
- **Organisms**: Complex UI sections composed of molecules and atoms (navigation header, card grid, form with validation).
- **Templates**: Page-level layouts that define structure without real content.
- **Pages**: Templates populated with actual data and content.

When asked to build a component, determine its atomic level first and scope accordingly.

## Component Guidelines

- Keep components small and focused on a single responsibility
- Extract reusable patterns into shared components rather than duplicating code
- Props should have sensible defaults
- Avoid hardcoding text—use props or content slots for flexibility
- Components should be self-contained and not depend on external state when possible

## Styling Standards

- Use our existing design tokens and CSS variables
- Follow our spacing scale (don't use arbitrary pixel values)
- Ensure all interactive elements have visible focus states
- Support both light and dark themes where applicable

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Images require meaningful alt text
- Form inputs must have associated labels
- Color contrast must meet WCAG AA standards
- Use semantic HTML elements (nav, main, section, article, button, etc.)

## File Organization

- Place new components in the appropriate atomic folder (atoms/, molecules/, organisms/)
- Co-locate component styles and tests with the component file
- Use consistent naming: ComponentName.tsx, ComponentName.styles.ts, ComponentName.test.tsx

## Before Committing

- Verify the component renders correctly in the browser
- Check responsive behavior at mobile, tablet, and desktop breakpoints
- Confirm there are no console errors or warnings

# Visual QA notes

The locally served homepage rendered the existing React/Vite application rather than leaving the semantic fallback visible. The screenshot showed the established IFEM visual system, navigation, hero, animation-oriented execution field, and project sections without duplicate fallback navigation. The existing application currently displays its own established six-step interactive labels in the mounted UI; this pass did not redesign or alter that client experience.

The locally served `/phase/contracts/` route rendered the established phase-detail application with the expected header, breadcrumb, phase hero, reading outline, seven-phase navigation, artifact/decision-gate/stop-condition tabs, inspection practice, previous/next links, and footer. No duplicate static fallback content was visible after React mounted, and no obvious layout shift or hydration error was observed in the viewport.

The locally served Persian homepage rendered the established RTL React experience with Persian navigation, hero content, theme control, and interactive phase controls. The screenshot showed correct right-to-left composition and no visible fallback duplication.

The locally served `/fa/phase/contracts/` route rendered the established RTL phase-detail page with Persian headings, phase hero, seven-phase navigation, inspection controls, previous/next links, and footer. No static fallback duplication or obvious visual regression was observed.

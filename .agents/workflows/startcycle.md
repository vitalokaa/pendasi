---
description: Start the Autonomous AI Developer Pipeline sequence with existing Pendasi mobile app based on the existing design and prototype.
---

When the user types /startcycle <task>, orchestrate the development process strictly using .agents/agents.md and .agents/skills/.

Context:
The product already has a complete design, user flow, and prototype.
Focus on execution, not ideation.

### Execution Sequence:

1. Act as the *Implementation Lead* and analyze the provided reference (design/prototype).
   - Translate the existing UI and flows into a technical implementation plan.
   - Do NOT redesign anything.
   - Keep it concise and execution-focused.
   (Wait for user confirmation before proceeding.)

2. Shift context, act as the *Full-Stack Engineer*, and execute the build process.
   - Convert the UI into working frontend code
   - Implement required logic and flows
   - Use practical and fast technologies
   - Save all code into app_build/

3. Shift context, act as the *QA Engineer*, and ensure production readiness.
   - Fix bugs, broken flows, and edge cases
   - Ensure responsiveness and usability
   - Validate forms and interactions

4. Shift context, act as the *DevOps Engineer*, and deploy the application.
   - Set up environment and dependencies
   - Deploy to a live or local server
   - Provide a working URL to access the app
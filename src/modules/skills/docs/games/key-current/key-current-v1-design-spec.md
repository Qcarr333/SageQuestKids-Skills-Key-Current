# Key Current

## Consolidated V1 Game Design Specification

**Working title:** Key Current
**Platform:** Sage Quest Kids — Skills module
**Primary audience:** Kindergarten through fifth-grade learners
**Primary devices:** Desktop, Chromebook, tablet and mobile phone
**Game category:** Educational keyboard-recognition runner
**Development priority:** Mobile-first responsive web game with desktop physical-keyboard support

---

# 1. Executive concept

Key Current is a single-lane, elevated third-person runner in which a child-controlled character runs automatically toward a series of approaching obstacles.

Each obstacle displays a keyboard input:

* A single letter
* A short sequence of letters
* A short word of two to five letters

The player clears the obstacle by entering the displayed input before the character reaches it.

On desktop or Chromebook, the player presses keys on a physical keyboard. On mobile or tablet, the player taps an onscreen keyboard helper that preserves the approximate position of the active keys on a standard keyboard.

The character does not jump, steer or change lanes. The character’s responsibility is to run straight along the path. The player’s responsibility is to recognize and enter the correct keyboard input to remove obstacles.

The game is designed to develop:

* Recognition of keyboard zones
* Familiarity with the location of letters
* Confidence moving outward from home-row anchor keys
* Ordered key entry
* Short-word typing
* Visual-motor coordination
* Physical keyboard familiarity on supported devices
* Touch-based keyboard mapping on mobile devices

The game is free, contains no advertisements, does not use monetary sounds or cash-register effects, and operates within the larger Sage Quest Kids mandatory play-limit system.

---

# 2. Core design principles

## 2.1 Educational action and game action are the same

The child does not complete an unrelated platforming action after identifying a key. Entering the correct key directly removes the obstacle.

This creates a clear relationship:

> Recognize the key → enter the key → clear the path.

## 2.2 Accuracy is more important than speed

The game may become faster through difficulty settings, but speed does not replace correct key recognition.

A child playing on Easy can still demonstrate strong proficiency. A child playing on Expert does not earn mastery merely for moving quickly if accuracy is poor.

## 2.3 Short, repeatable sessions

A stage is divided into two short runs:

1. Guided Practice
2. Proficiency Check

Each run generally lasts approximately 25–45 seconds.

A complete stage generally lasts approximately one to one-and-a-half minutes.

## 2.4 No age information is required

The game does not need the child’s age or grade.

Difficulty is managed through:

* The learning track
* The current stage
* The selected speed
* Adaptive guidance
* Proficiency requirements

## 2.5 Mobile and desktop share content

The same tracks, stages, obstacle sequences, characters and environments are used across devices.

Only the input method changes.

## 2.6 Characters are cosmetic

All characters have identical movement, collision behavior, timing and scoring.

No character is faster, stronger or educationally superior.

---

# 3. Game perspective and camera

## 3.1 Selected perspective

The game uses an **elevated third-person view**.

The camera is positioned above and behind the character, looking forward along a single vertical lane.

The player sees:

* The back of the running character
* The current obstacle approaching
* One or two future obstacles partially visible in the distance
* The surrounding environment
* The keyboard helper beneath the gameplay area

## 3.2 Why this perspective was selected

This perspective provides:

* Better portrait mobile support
* More visible warning distance
* Clear obstacle readability
* A recognizable running character
* A visible collision reaction
* Greater visual differentiation from a horizontal side-scroller
* Space for a large onscreen keyboard helper

## 3.3 Camera behavior

The camera should remain stable during standard play.

Permitted camera effects should be subtle:

* Minor impact bump after a collision
* Slight forward movement after completing a stage
* Gentle environmental motion
* Small celebratory camera adjustment at stage completion

The camera should not:

* Rotate around the character during gameplay
* Spin during collisions
* change lanes
* zoom aggressively
* produce motion that makes letters harder to read

---

# 4. Core gameplay loop

A normal obstacle interaction follows this sequence:

1. The character runs forward automatically.
2. An obstacle appears in the distance.
3. The obstacle’s input becomes readable.
4. The obstacle moves closer as the character approaches.
5. The current required key glows on the keyboard helper.
6. The player enters the required key or sequence.
7. Correct input visually weakens the obstacle.
8. Completing the input removes or opens the obstacle.
9. The character runs through the cleared area.
10. The next obstacle becomes active.

When an obstacle contains a word, the player enters the letters in order.

Example:

```text
JET
```

After pressing `J`:

```text
✓ E T
```

After pressing `E`:

```text
✓ ✓ T
```

After pressing `T`, the obstacle disappears or opens.

Completed letters remain completed after a collision. The player does not need to re-enter correctly completed letters.

---

# 5. Input modes

## 5.1 Keyboard Mode

Keyboard Mode uses a physical keyboard.

It is intended for:

* Desktop computers
* Laptops
* Chromebooks
* Tablets with connected keyboards
* Mobile devices with connected keyboards, when supported

Keyboard Mode develops:

* Physical key location
* Approximate finger movement
* Keyboard-zone familiarity
* Ordered typing
* Physical keyboard confidence

The game listens for the expected keyboard input while ignoring irrelevant browser shortcuts whenever technically and safely possible.

## 5.2 Touch Key Mode

Touch Key Mode uses an onscreen keyboard helper.

It is intended for:

* Mobile phones
* Tablets
* Touchscreen laptops

Touch Key Mode develops:

* Letter recognition
* Keyboard-zone recognition
* Approximate left/right keyboard positioning
* Ordered input
* Visual scanning
* Touch accuracy

Touch Key Mode should not be described as proving physical typing dexterity.

## 5.3 Shared curriculum

Both modes share:

* Tracks
* Stages
* Words
* Obstacle order
* Difficulty
* XP
* Stage completion
* Character selection
* Audio options

Performance records should identify which input mode was used.

---

# 6. Keyboard-helper design

## 6.1 Purpose

The keyboard helper teaches where a key belongs while also functioning as the mobile control surface.

## 6.2 Visual structure

The keyboard helper should contain:

* A faint silhouette of the broader keyboard
* Enlarged active keys for the current stage
* Correct relative placement of active key groups
* A glow around the currently required key
* Red feedback on an incorrectly pressed key
* Positive feedback on correctly completed keys

## 6.3 Positional examples

For an `A S D F` stage:

* The active keys should appear toward the left side.
* They should remain in the order `A S D F`.
* They should not be centered as if they represent the full keyboard.

For a `J K L` stage:

* The active group should appear toward the right side.
* The relative gap between the left and right home groups should remain visible where space allows.

## 6.4 Feedback colors

Suggested functional meaning:

* **Current target:** gold, blue-white or bright pulse
* **Correct input:** green, sparkle or completed state
* **Incorrect pressed key:** red flash
* **Inactive keys:** subdued or partially transparent

The correct target should not turn red after a wrong input. Red belongs to the incorrect key that was pressed.

---

# 7. Obstacle system

## 7.1 Obstacle purpose

Every obstacle is both:

* A gameplay barrier
* An educational prompt

The obstacle is the primary place where the required letter, sequence or word appears.

## 7.2 Obstacle types

V1 may use several visual obstacle skins while sharing one technical system.

Possible obstacle skins include:

* Wooden barricade
* Coral gate
* Vine wall
* Stone barrier
* Magical energy gate
* Ice wall
* Raised bridge lock

All obstacle types use the same base logic:

1. Display required input.
2. Track correct letters in order.
3. Show progress.
4. Remove or open when complete.
5. Trigger a collision if incomplete.

## 7.3 Current and future obstacles

The current obstacle should be:

* Largest
* Brightest
* Most readable
* Clearly active

One or two upcoming obstacles may appear farther down the lane.

Future obstacles should:

* Be smaller
* Be partially obscured or visually muted
* Avoid competing with the current obstacle
* Give the player a sense of forward progress

## 7.4 Obstacle progress presentation

For words and sequences, completed letters can:

* Become transparent
* Crack apart
* Dim
* Receive a check mark
* Disappear individually
* Change into a powered-down state

The current required letter should pulse.

---

# 8. Correct and incorrect input behavior

## 8.1 Correct input

When the player enters the correct key:

* The key receives positive visual feedback.
* The associated letter on the obstacle changes to completed.
* A soft confirmation sound may play.
* The next required key begins glowing.
* The obstacle remains until all required letters are completed.

## 8.2 Incorrect input

When the player enters the wrong key:

* The pressed key flashes red.
* A gentle error sound plays.
* The obstacle does not progress.
* The correct target pulses more strongly.
* Voice Help may repeat the correct target.
* The game continues expecting the original target.

The wrong key is never added to the word.

Backspace is not needed in V1.

## 8.3 Held keys and key mashing

The input system should:

* Count only the initial key-down event
* Ignore repeated browser key-repeat events while a key remains held
* Prevent one held key from clearing multiple obstacles
* Record incorrect inputs
* Prevent rapid random key mashing from being treated as proficiency

---

# 9. Collision system

## 9.1 Collision behavior

If the character reaches an incomplete obstacle:

1. The character collides with the obstacle.
2. The obstacle shakes.
3. The character briefly flattens or compresses against it.
4. The character bounces backward a short distance.
5. The normal rear-facing run animation resumes.
6. The character begins approaching the same obstacle again.
7. Completed letters remain completed.

## 9.2 Animation approach

The collision should use a low-cost squash-and-recoil animation inspired by classic physical comedy.

The character does not need to:

* Turn around fully
* Spin
* Trigger a camera rotation
* Use a separate front-facing cutscene

Suggested animation components:

* Normal run loop
* Impact pose
* Flattened or compressed pose
* Recoil pose
* Return to run

## 9.3 Collision intensity progression

### First collision

* Most comical
* Largest flattening effect
* Largest bounce backward
* Strongest obstacle shake
* Strongest guidance

### Second collision

* Smaller squash
* Shorter bounce
* Reduced reaction

### Third collision

* Short impact
* Restart behavior for Tracks B–D

This prevents repeated mistakes from producing a long animation every time.

---

# 10. Failure and recovery

## 10.1 Track A

Track A has no traditional failure.

After a collision:

* The character bounces backward.
* The obstacle slows or pauses.
* The correct key pulses.
* Voice Help may repeat the target.
* The player continues until the obstacle is cleared.

The player is never sent to a game-over screen in Track A.

However, the game can require an additional Proficiency Check before unlocking the next stage.

## 10.2 Tracks B–D

Tracks B–D use a three-collision rule.

After the third collision:

* The current run restarts.
* The player does not return to the main landing screen.
* A short supportive message appears.
* The same stage remains active.
* The character and difficulty remain unchanged.

## 10.3 No checkpoints in V1

V1 does not require in-run checkpoints because:

* Runs are short.
* The player already receives multiple collision opportunities.
* Restart logic remains simpler.
* Repetition supports learning.
* A one-minute activity does not justify complex checkpoint state.

Progress is saved after completing a run or stage, not in the middle of one.

---

# 11. Track, stage and run terminology

## 11.1 Track

A track is a broad learning category.

Examples:

* Home Base
* Center Reach
* Outer Reach
* Short Words

## 11.2 Stage

A stage teaches a specific group of keys or word category.

Examples:

* `F/J`
* `D/K`
* `D/C`
* Two-letter words

## 11.3 Run

A run is one short gameplay attempt.

Each new stage normally contains:

1. Guided Practice run
2. Proficiency Check run

---

# 12. Stage structure

## 12.1 Guided Practice

Typical duration:

* 25–35 seconds

Typical number of obstacles:

* 8–10 for single-letter stages
* Fewer obstacles with more total keystrokes for sequence or word stages

Characteristics:

* Predictable or gently structured order
* Strong keyboard highlighting
* Voice Help available
* Introduction to new key locations
* Earlier known keys may appear as anchors

Example F/J pattern:

```text
F – J – F – J – F – J – J – F
```

## 12.2 Proficiency Check

Typical duration:

* 30–45 seconds

Typical number of obstacles:

* 10–14 for single-letter stages

Characteristics:

* Balanced but less predictable order
* Randomized on replay
* Each key appears several times
* No key is underrepresented
* Memorizing one fixed pattern is not enough

Example F/J pattern:

```text
J – F – J – J – F – F – J – F – F – J – J – F
```

## 12.3 Stage proficiency

A suggested initial threshold is:

* At least 85% correct first attempts
* No more than two guided collisions
* Successful performance on every key in the stage
* Completion of both the Guided Practice and Proficiency Check

A child who does not meet the threshold receives another short randomized attempt.

Supportive message:

> Almost there! Let’s try one more quick round.

Stage completion demonstrates readiness to continue, not permanent mastery.

Earlier keys return in later stages for reinforcement.

---

# 13. Curriculum structure

# Track A — Home Base

**Purpose:** Establish familiarity with home-row anchor areas.

### Stage 1: F and J

* Introduces the primary anchor keys
* Repeated balanced F/J practice
* Strong Voice Help and keyboard highlighting

### Stage 2: D and K

* Adds the neighboring home keys
* Includes occasional F and J anchor reminders

### Stage 3: S and L

* Adds the next outward home-row positions
* Reinforces previously introduced keys

### Stage 4: A S D F

* Builds the left home-row zone
* Uses isolated letters rather than words

### Stage 5: J K L

* Builds the right home-row zone

### Stage 6: A S D F J K L

* Combines both primary home-row areas

### Stage 7: Mixed Home Base Review

* Randomized home-row recognition
* Balanced left/right usage
* Final readiness check before Center Reach

After completing Track A, returning to it opens a randomized Home Base Practice mode.

---

# Track B — Center Reach

**Purpose:** Teach key movement around the index-finger and center-keyboard zones while repeatedly returning to familiar home keys.

### Suggested stages

1. `F / G`
2. `J / H`
3. `F / R`
4. `F / T`
5. `F / V`
6. `F / B`
7. `J / U`
8. `J / Y`
9. `J / N`
10. `J / M`
11. Left Center Zone: `F G R T V B`
12. Right Center Zone: `J H Y U N M`
13. Mixed Center Reach Review

The important educational pattern is:

* Reach away from an anchor
* Return to the anchor
* Repeat the movement
* Combine the zone only after pair familiarity

Examples:

```text
F – G – F – G
J – U – J – U
Y – U – J
N – J – U
```

---

# Track C — Outer Reach

**Purpose:** Introduce the remaining outer keyboard regions in smaller movement groups.

The left-side vertical reaches should begin with two-letter relationships before combining three letters.

### Left middle-finger stages

1. `D / C`
2. `D / E`
3. `D E C`
4. Mixed `D E C` Review

### Left ring-finger stages

5. `S / X`
6. `S / W`
7. `S W X`
8. Mixed `S W X` Review

### Left outer stages

9. `A / Z`
10. `A / Q`
11. `A Q Z`
12. Mixed `A Q Z` Review

### Right outer stages

13. `K / I`
14. `L / O`
15. `P` with familiar right-side anchors
16. Mixed Right Outer Review

### Final Track C stages

17. Left Outer-Zone Review
18. Right Outer-Zone Review
19. Mixed Full-Keyboard Recognition

This track focuses on keyboard recognition and reach familiarity rather than strict formal touch-typing certification.

---

# Track D — Short Words

**Purpose:** Combine keyboard recognition with ordered entry and basic spelling.

V1 words contain two to five letters.

### Suggested stages

1. Two-letter words
2. Three-letter home-heavy words
3. Three-letter mixed-zone words
4. Four-letter words
5. Five-letter words
6. Mixed Short-Word Review

Possible examples include:

* at
* am
* in
* cat
* jet
* sun
* fish
* hand
* plant

The actual word library should be:

* Age-appropriate
* Easy to recognize
* Free from sensitive or ambiguous meanings
* Constructed from already introduced keys
* Reviewed for inappropriate accidental combinations
* Consistent with Sage Quest Kids safety standards

Track D does not include:

* Sentences
* Punctuation
* Capitalization challenges
* Backspace correction
* Timed paragraph typing

Those are outside V1.

---

# 14. Track and stage transitions

## 14.1 Initial flow

A first-time player follows this path:

```text
Landing Screen
→ Choose Character
→ Choose Track
→ Set Difficulty
→ Guided Practice
→ Proficiency Check
→ Stage Complete
→ Continue to Next Stage
```

## 14.2 Stage-completion screen

Suggested content:

```text
F and J Ready!

Accuracy: 92%
Collisions: 1
Keys Practiced: F and J

[Continue]
[Try Faster]
[Replay]
```

### Continue

* Keeps the same character
* Keeps the same difficulty
* Loads Guided Practice for the next stage

### Try Faster

* Moves difficulty up one position
* Loads the next stage
* Requires player confirmation

### Replay

* Generates a new sequence for the current stage

## 14.3 Returning player

The main action becomes:

> Continue

Continue resumes the first incomplete stage using:

* The saved character
* The saved difficulty
* The saved audio settings
* The appropriate input mode

Choose Track allows the player to replay completed stages or switch tracks.

---

# 15. Difficulty system

## 15.1 Difficulty presentation

Difficulty uses a segmented slider with four fixed snap points.

| Position | Name   | Indicator             |
| -------- | ------ | --------------------- |
| 1        | Easy   | One lightning bolt    |
| 2        | Steady | Two lightning bolts   |
| 3        | Fast   | Three lightning bolts |
| 4        | Expert | Four lightning bolts  |

The slider behaves like four buttons internally but appears as a connected visual control.

## 15.2 Difficulty colors

Suggested progression:

* Easy: green
* Steady: yellow-green
* Fast: orange
* Expert: purple with lightning

Expert should not use solid red because red already means incorrect input.

## 15.3 What difficulty changes

Difficulty may change:

* Obstacle approach speed
* Initial obstacle distance
* Gap between obstacles
* Recovery distance after collision
* Time available before impact
* Transition speed between obstacles

Difficulty does not change:

* Required letters
* Word spelling
* Character mechanics
* Accuracy formula
* Number of educational targets
* Keyboard layout

## 15.4 Difficulty persistence

Difficulty remains selected between stages.

After excellent performance, the game may offer:

> Want to go faster?

The speed does not increase automatically without the player selecting Try Faster.

## 15.5 Performance-based offer

A simple V1 rule for displaying Try Faster:

* Zero collisions
* No more than one incorrect input
* Stage completed
* Strong response margin on most obstacles

When a player struggles, the completion or restart screen may offer:

> Make It Easier

The game should not silently lower the difficulty.

---

# 16. Character system

## 16.1 Character function

Characters are cosmetic avatars that:

* Run down the lane
* Collide with obstacles
* Bounce backward
* Celebrate completion
* Appear on selection and progress screens

## 16.2 Shared mechanics

All characters share:

* Identical speed
* Identical hitbox
* Identical collision timing
* Identical animation frame positions
* Identical score potential

## 16.3 Recommended V1 animation set

Each character requires:

* Idle pose
* Rear-facing run loop
* Impact pose
* Flattened pose
* Recoil frames
* Return-to-run frame
* Small completion celebration

Optional later additions:

* More elaborate finish animation
* Character-specific idle personality
* Unlockable cosmetic accessories
* Front-facing victory presentation

## 16.4 Sprite-sheet standardization

Every character sprite sheet should use:

* The same canvas dimensions
* The same frame order
* The same anchor point
* The same collision alignment
* The same scale
* The same naming convention

This allows new characters to be added without changing gameplay code.

---

# 17. Audio system

Audio should be divided into three independent categories.

## 17.1 Voice Help

Voice Help provides educational guidance.

### Single-letter behavior

When the obstacle appears:

> Find F.

After correct input:

> F.

After incorrect input:

> Find F.

The system should not normally speak the wrong key the child pressed.

### Word behavior

When `cat` appears:

> Cat.

On Easy, the game may speak each correct letter:

> C.
> A.
> T.
> Cat.

At faster settings, it may speak:

* The word when it appears
* The current required letter after an error
* The word again after completion

## 17.2 Sound effects

Sound effects include:

* Correct-key confirmation
* Gentle incorrect-key response
* Obstacle breaking or opening
* Character collision
* Bounce-back effect
* Stage completion

Sound effects should avoid:

* Cash registers
* Coin sounds associated with spending
* Slot-machine effects
* Gambling-style reward sounds
* Excessive celebratory noise

## 17.3 Music

Music may play on:

* Landing screen
* Track-selection screen
* Gameplay
* Completion screens

It should be:

* Light
* Adventure-oriented
* Non-distracting
* Loopable
* Different from aggressive rhythm-game music

## 17.4 Settings

The sound/settings menu contains separate toggles for:

* Voice Help
* Sound Effects
* Music

Settings persist between sessions.

---

# 18. Scoring and mastery

## 18.1 Primary metric

Accuracy is the primary performance measure.

Useful metrics include:

* Correct first-attempt inputs
* Incorrect inputs
* Total required keystrokes
* Collisions
* Completion
* Response timing
* Performance by key
* Input mode

## 18.2 Suggested accuracy calculation

A simple V1 approach:

```text
First-Attempt Accuracy =
Required inputs entered correctly before any wrong key
÷
Total required inputs
```

The game may also track total key accuracy internally.

## 18.3 Completion levels

Each stage can have three status levels:

### Completed

* Player reached the end
* Next stage unlocks

### Proficient

* Approximately 85% accuracy
* Limited collisions
* Every key demonstrated successfully

### Mastered

* Approximately 95% accuracy
* No collisions
* Very few or no incorrect inputs

A child should not be trapped on one stage because they have not achieved Mastered status.

## 18.4 XP

XP should reward:

* Completing Guided Practice
* Completing Proficiency Check
* Accuracy
* Improvement
* Stage proficiency
* Stage mastery
* Completing a new stage

XP should not heavily reward:

* Selecting the fastest mode
* Replaying one extremely easy stage indefinitely
* Random key mashing
* Repeated collisions

Difficulty may provide a small bonus, but it should not outweigh accuracy.

---

# 19. Progression and saved data

## 19.1 Saved progress

The game should save:

* Selected character
* Selected difficulty
* Current track
* Next incomplete stage
* Completed stages
* Stage proficiency status
* Highest difficulty completed
* Best accuracy
* Best collision count
* Input mode used
* Voice Help preference
* Music preference
* Sound-effects preference
* XP earned

## 19.2 Save timing

Progress should save:

* After Guided Practice
* After Proficiency Check
* After stage completion
* After settings changes
* After character or difficulty changes

V1 does not save partial obstacle progress after the player leaves a run.

## 19.3 Track locking

Suggested unlocking behavior:

* Track A starts unlocked.
* Completing Track A unlocks Track B.
* Completing enough of Track B unlocks Track C.
* Completing the required keyboard-recognition tracks unlocks Track D.

The exact number of stages required to unlock the next track can be adjusted after testing.

---

# 20. Screen structure

# Screen 1 — Game Landing Screen

Purpose:

* Introduce the game
* Resume progress quickly
* Provide access to character, track and settings

Primary elements:

* Game title
* Animated selected character
* Continue button
* Choose Track
* Choose Character
* Difficulty slider
* Sound/settings icon
* How to Play
* XP or progress summary

The Continue button should become the main action for returning players.

---

# Screen 2 — Character Selection

Purpose:

* Select a cosmetic character

Elements:

* Character carousel or grid
* Large preview
* Character name
* Locked/unlocked state
* Select button
* Back button

No character stats should appear because all characters behave identically.

---

# Screen 3 — Track Selection

Purpose:

* Show the learning path and saved progress

Elements:

* Track A: Home Base
* Track B: Center Reach
* Track C: Outer Reach
* Track D: Short Words
* Completion markers
* Locked/unlocked state
* Current stage
* Replayable completed stages

The track map may use a Skills Sea journey structure.

---

# Screen 4 — Pre-Run Screen

Purpose:

* Confirm the upcoming stage without requiring full reselection

Elements:

* Track name
* Stage name
* Keys being practiced
* Selected character
* Difficulty
* Voice Help status
* Start button
* Back button

Example:

```text
Home Base — Stage 1
Practice: F and J
Difficulty: Easy
Voice Help: On
```

---

# Screen 5 — Mobile Gameplay

Suggested portrait structure:

### Top area

* Pause
* Stage progress
* Difficulty indicator
* Collision indicators for Tracks B–D

### Main playfield

* Elevated third-person lane
* Running character
* Current obstacle
* One or two distant obstacles
* Environment
* Obstacle input

### Bottom area

* Keyboard helper
* Enlarged active keys
* Target-key glow
* Incorrect-key feedback

Approximate allocation:

* 60–65% playfield
* 30–35% keyboard helper
* Remaining space for HUD and safe margins

---

# Screen 6 — Desktop Gameplay

Desktop uses the same central lane and camera.

Additional horizontal space may contain:

* Key-zone reference
* Stage progress
* Character portrait
* Minimal instructions
* XP indicator

The main game should remain centered and should not become a dramatically different layout from mobile.

The keyboard helper may be shorter because the physical keyboard is used, but it should remain visible for educational guidance.

---

# Screen 7 — Pause Screen

Elements:

* Resume
* Restart Run
* Voice Help toggle
* Music toggle
* Sound Effects toggle
* Exit to Landing

The pause screen should not encourage switching difficulty in the middle of a run.

---

# Screen 8 — Stage Completion

Elements:

* Completion message
* Accuracy
* Collisions
* Keys practiced
* XP earned
* Continue
* Try Faster, when earned
* Replay

---

# Screen 9 — Run Restart

Tracks B–D use a supportive restart screen after the third collision.

Example:

> Good try! Let’s clear the path again.

Buttons:

* Try Again
* Make It Easier
* Exit

The screen should avoid labels such as:

* Failed
* You lost
* Game over

---

# Screen 10 — Track Completion

Elements:

* Track completed
* Keys learned
* Mastery summary
* XP earned
* Newly unlocked track
* Continue
* Replay Track
* Return Home

---

# Screen 11 — Progress View

Optional for V1, but useful if the wider platform already contains progress components.

Elements:

* Tracks completed
* Current stage
* Best accuracy
* Keys practiced
* Input mode
* Proficiency markers
* XP earned

The display should remain simple and child-friendly.

---

# 21. Visual direction

## 21.1 Environment

The recommended first environment is **Skills Sea**.

Possible visual elements:

* A magical path over shallow water
* Coral gates
* Wooden boardwalk sections
* Floating stones
* Sea plants
* Distant islands
* Soft clouds
* Friendly sea creatures
* Light magical energy

## 21.2 Obstacle appearance

Obstacles should be visually readable and distinct from the background.

The letter or word should have:

* Strong contrast
* Thick readable lettering
* Minimal decorative interference
* Stable orientation
* Sufficient size on mobile

## 21.3 Overall mood

The mood should be:

* Adventurous
* Friendly
* Calmly energetic
* Safe
* Magical
* Welcoming

It should not resemble:

* A high-intensity neon rhythm game
* A gambling interface
* A commercial reward system
* A violent obstacle course

## 21.4 Character collision tone

Collision should feel funny rather than painful.

Suitable effects:

* Soft squash
* Cartoon wobble
* Harmless bounce
* Stars or bubbles
* Comical “bonk” effect
* Obstacle shake

Avoid:

* Injury
* Crying
* Dangerous impacts
* Realistic harm
* Explosive death effects

---

# 22. Accessibility and usability

V1 should include:

* Large touch targets
* High-contrast letters
* Clear focus states
* Keyboard navigation for menus
* Pause access
* Independent audio controls
* Reduced-motion consideration
* No reliance on color alone
* Readable fonts
* Consistent button placement
* Screen-safe margins
* Support for different phone dimensions
* No critical instructions only delivered through sound

A reduced-motion option can limit:

* Camera bump
* Obstacle shake
* Particle effects
* Large bounce reactions

Voice Help should support children who benefit from spoken instructions, but all gameplay must remain possible without audio.

---

# 23. Safe engagement model

The game inherits the Sage Quest Kids safety principles.

Required protections include:

* No advertisements
* No paid currency
* No loot boxes
* No random reward chests
* No streak-loss punishment
* No countdown designed to create urgency
* No “play now or lose this” messages
* No endless default mode
* No cash-register sounds
* No casino-style effects
* No competitive public leaderboard required
* Clear end to every run
* Mandatory platform play limits
* Predictable stopping points

When the play-limit system is reached:

* Allow the current short run to finish where appropriate.
* Do not begin another stage.
* Show a calm break message.
* Preserve completed progress.

---

# 24. Technical gameplay systems required

## 24.1 Game-state manager

Suggested states:

```text
Landing
Track Selection
Character Selection
Pre-Run
Countdown
Active Run
Obstacle Active
Collision Recovery
Obstacle Cleared
Run Complete
Stage Complete
Run Restart
Paused
Track Complete
```

## 24.2 Obstacle state

Each obstacle needs:

* Required input
* Current input index
* Completed letters
* Approach speed
* Current distance
* Active/inactive state
* Collision count
* Visual skin
* Audio cue
* Clear animation

Possible states:

```text
Pending
Visible
Active
Partially Completed
Cleared
Collided
Removed
```

## 24.3 Input manager

The input manager must support:

* Physical key events
* Touch-key events
* Input-mode detection
* Expected-key validation
* Held-key suppression
* Wrong-key recording
* Key normalization
* Stage-specific allowed keys
* Input locking during collision animation
* Re-enabling after recovery

## 24.4 Sequence generator

The generator must:

* Use only approved stage keys
* Balance key frequency
* Avoid excessive repetition
* Produce predictable Guided Practice patterns
* Produce randomized Proficiency Check patterns
* Ensure every target key appears enough times
* Regenerate on replay
* Support predefined word lists
* Avoid unsafe accidental sequences

## 24.5 Difficulty manager

The difficulty manager controls:

* Approach speed
* Obstacle spacing
* Recovery distance
* Transition timing
* Recommendation to increase or decrease speed

## 24.6 Collision manager

The collision manager controls:

* Incomplete obstacle detection
* Character impact animation
* Bounce distance
* Collision counting
* Track-specific failure behavior
* Progress preservation
* Third-collision restart

## 24.7 Audio manager

The audio manager controls:

* Voice Help
* Music
* Sound effects
* Volume behavior
* Audio persistence
* Stage-specific prompts
* Preventing overlapping voice lines

## 24.8 Progress manager

The progress manager controls:

* Stage completion
* Track unlocking
* Proficiency markers
* Mastery markers
* XP
* Selected character
* Difficulty
* Settings
* Input mode history

## 24.9 Responsive-layout manager

The responsive system must support:

* Mobile portrait
* Tablet portrait
* Tablet landscape
* Desktop
* Chromebook
* Different safe areas
* Keyboard-helper scaling
* Obstacle-letter scaling
* HUD repositioning

---

# 25. Suggested data structure

A stage definition may include:

```text
stageId
trackId
stageName
activeKeys
anchorKeys
practiceObstacleCount
proficiencyObstacleCount
practicePatternType
proficiencyPatternType
wordList
voicePromptMode
failureMode
proficiencyThreshold
unlockRequirement
```

A saved player record may include:

```text
selectedCharacter
selectedDifficulty
selectedInputMode
currentTrack
currentStage
completedStages
stageBestAccuracy
stageBestDifficulty
stageCollisionRecord
stageMasteryStatus
voiceHelpEnabled
musicEnabled
soundEffectsEnabled
xpEarned
```

---

# 26. Required V1 asset list

## Characters

For each V1 character:

* Selection portrait
* Idle animation
* Rear run animation
* Impact pose
* Flattened pose
* Recoil frames
* Completion pose

## Environment

* Skills Sea background
* Main lane
* Water animation
* Decorative environmental objects
* Distant scenery
* Mobile and desktop extensions

## Obstacles

* Base obstacle
* Damaged or partially completed states
* Clear/open animation
* Collision shake
* Multiple visual skins, where budget allows

## Interface

* Landing screen
* Track cards
* Stage markers
* Difficulty slider
* Lightning indicators
* Pause icon
* Audio icons
* Collision indicators
* Progress bar
* Keyboard helper
* Key states
* Completion panels
* Lock and mastery icons

## Audio

* Landing music
* Gameplay music
* Correct input
* Incorrect input
* Collision
* Bounce
* Obstacle clear
* Stage completion
* Voice letter files
* Voice word files or text-to-speech integration

---

# 27. V1 scope

## Included

* Elevated third-person single-lane runner
* Mobile portrait support
* Desktop physical-keyboard support
* Touch Key Mode
* Keyboard Mode
* Cosmetic character selection
* Four difficulty settings
* Tracks A–D
* Single letters
* Letter sequences
* Words up to five letters
* Guided Practice
* Proficiency Check
* Three-collision rule for Tracks B–D
* Guided completion for Track A
* XP
* Saved stage progress
* Audio controls
* Voice Help
* Skills Sea environment
* Responsive layout
* Mandatory platform play limits

## Excluded from V1

* Sentences
* Paragraph typing
* Punctuation
* Number row
* Shift-key training
* Backspace correction
* Multiple lanes
* Jumping
* Steering
* Shape physics
* Character abilities
* Character speed differences
* Bridges built letter by letter
* Complex environmental puzzles
* Mid-level checkpoints
* Five- or ten-minute levels
* Public leaderboards
* Multiplayer
* User-generated levels
* In-game purchases
* Ads

These ideas may be preserved for future games or later releases but should not increase V1 development cost.

---

# 28. Differentiation from the original concept

## Original concept

The initial idea was a pseudo clone of Geometry Dash with several educational modifications:

* Horizontal side-scrolling presentation
* A geometric shape moving automatically
* Keyboard keys replacing mouse clicks or screen taps
* Correct inputs causing jumps
* Different selectable shapes
* Shape-dependent friction and speed
* Longer keyboard-row challenges
* Mobile onscreen keys
* No advertising or monetary reward sounds
* Mandatory play limits

## First major revision: perspective

The horizontal side-scroller changed into a portrait-friendly, forward-moving runner.

This solved:

* Mobile screen limitations
* Keyboard-helper space
* Limited obstacle warning distance
* Excessive resemblance to the reference game

## Second major revision: player responsibility

The game changed from:

> Press a key to jump over an obstacle.

to:

> Press the correct key to remove the obstacle.

This made the keyboard input directly responsible for clearing the path.

## Third major revision: single lane

The game became a one-lane runner.

The child does not:

* Steer
* Jump
* Change lanes

The child only identifies and enters the correct input.

## Fourth major revision: shapes replaced by characters

The original shape system existed partly to reduce animation complexity and create different physics.

After changing the perspective:

* Shape speed was no longer visually valuable.
* Friction education was no longer central.
* Character connection became more useful.
* Difficulty could control speed directly.

Characters are now cosmetic and mechanically identical.

## Fifth major revision: physics replaced by difficulty

The round-versus-flat friction system was removed.

It was replaced by:

* Easy
* Steady
* Fast
* Expert

Difficulty changes obstacle approach speed without changing educational content.

## Sixth major revision: jumping removed

Correct inputs no longer cause jumps.

Instead:

* Letters damage or disable the obstacle.
* Full sequences remove the obstacle.
* Short words are completed in order.
* Partial progress survives a collision.

## Seventh major revision: structured curriculum

The initial idea of broad rows such as `ASDFJKL` became a structured progression:

* Home Base
* Center Reach
* Outer Reach
* Short Words

Each track contains smaller stages.

Each stage contains:

* Guided Practice
* Proficiency Check

## Eighth major revision: collision-based learning

Instead of traditional instant failure:

* The character comically collides.
* The character bounces backward.
* Guidance increases.
* Track A does not fail.
* Tracks B–D restart only after three collisions.

## Ninth major revision: mobile and desktop mode distinction

Desktop and mobile share the same curriculum, but their educational claims differ.

* Keyboard Mode supports physical keyboard familiarity.
* Touch Key Mode supports recognition and keyboard mapping.

## Tenth major revision: stronger original identity

The game is no longer defined primarily as a modified Geometry Dash concept.

Its identity is now:

> A safe, short-session educational runner where children clear a magical path by recognizing keyboard zones and entering the correct letters.

This is visually, mechanically and educationally more original than the starting concept.

---

# 29. Key differentiators

Key Current differs from the original reference and from many traditional typing games through its combination of:

* Elevated third-person perspective
* Single-lane forward movement
* Obstacles removed through typing
* Keyboard-zone curriculum
* Home-key anchor progression
* Mobile keyboard mapping
* Physical-keyboard support
* Short two-run stages
* Nonviolent comedic collisions
* Guided early-track completion
* Accuracy-first scoring
* Cosmetic characters
* No advertisements
* No virtual currency
* No gambling-style rewards
* Mandatory play limits
* Integration with the Sage Quest Kids XP system
* Parent-safe educational positioning
* Skills Sea visual identity

---

# 30. Build order recommendation

## Phase 1 — Functional prototype

Build:

* One character
* One lane
* One obstacle
* F/J input
* Physical keyboard input
* Touch keyboard input
* Correct/wrong feedback
* Collision and bounce
* One difficulty
* No final artwork

Goal:

Validate the core loop.

## Phase 2 — Stage prototype

Add:

* Guided Practice
* Proficiency Check
* Balanced sequence generation
* Stage completion
* Basic scoring
* Three-collision logic
* Saved stage state

Goal:

Validate learning progression.

## Phase 3 — Responsive prototype

Add:

* Mobile portrait layout
* Desktop layout
* Keyboard-helper positioning
* Scalable obstacle letters
* HUD
* Pause screen

Goal:

Validate usability across devices.

## Phase 4 — Visual production

Add:

* Skills Sea
* Final character
* Obstacle skins
* Final UI
* Difficulty slider
* Animations
* Effects

Goal:

Establish final presentation.

## Phase 5 — Curriculum implementation

Add:

* Full Track A
* Track B
* Track C
* Track D word library
* Unlocking
* Mastery tracking

Goal:

Complete V1 content.

## Phase 6 — Audio and accessibility

Add:

* Voice Help
* Music
* Sound effects
* Reduced motion
* Contrast review
* Touch-size testing
* Keyboard-menu navigation

Goal:

Make the game broadly usable.

## Phase 7 — Platform integration

Add:

* Sage Quest Kids authentication
* XP
* Saved progress
* Play limits
* Skills-module navigation
* Parent-facing summaries where applicable

Goal:

Release the game within the wider platform.

---

# 31. Final V1 definition

Key Current is a mobile-first, elevated third-person educational runner set within Skills Sea.

The child selects a cosmetic character and begins a short keyboard-learning stage. The character runs automatically along one lane while letter-marked gates and barriers approach. The child removes each obstacle by entering its required letter, sequence or short word through either a physical keyboard or a positionally accurate onscreen key helper.

Correct inputs weaken and remove obstacles. Incorrect inputs highlight the wrong key in red and guide the player toward the correct target. Incomplete obstacles produce a harmless cartoon collision in which the character briefly flattens and bounces backward.

Each stage contains a Guided Practice run and a Proficiency Check. Track A teaches home-row familiarity without traditional failure. Later tracks expand outward from home-key anchors and use a three-collision restart system. Track D introduces short words of no more than five letters.

The game prioritizes accuracy, repetition, confidence and safe engagement. It contains no advertisements, purchases, monetary sounds, gambling-style rewards or endless default play. It integrates with Sage Quest Kids XP, progress saving and mandatory play limits.

The V1 experience is intended to be simple enough to build as one of twenty Skills games while remaining visually memorable, educationally defensible and clearly differentiated from the original pseudo-clone concept.

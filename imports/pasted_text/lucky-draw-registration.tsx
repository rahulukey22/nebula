Build a mobile-first React web app (max-w-md, centered) that implements a 
"Lucky Draw" gamification feature shown inside an Instagram-style Stories 
viewer, with a reusable right-side-panel registration flow that can be 
applied to ANY gamification action (scratch cards, spin the wheel, 
referrals, milestone rewards, etc.).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 1 — LUCKY DRAW STORY CARD (inside StoriesViewer)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When the Stories viewer opens and the current story has `isRaffle: true`, 
render a full-screen premium gradient background (brand primary → brand 
accent) with two subtle decorative white circles (top-right and 
bottom-left, partially off-screen, 10% opacity). Overlay a centered white 
card (rounded-3xl, backdrop-blur, 95% white) with the following sections 
top to bottom:

1. HEADER BADGE
   - Pill badge with brand gradient background, white text: 
     "MONTHLY LUCKY DRAW" in bold uppercase tracking-widest

2. TICKET ELIGIBILITY
   - Small label: "You're Eligible for"
   - Large Gift icon + ticket count number (e.g. "2") in brand primary color, 
     bold, 5xl font size
   - Below: "Lucky Draw Ticket(s)" label
   - Below: Fine print — "On your Invoice no. XXXXXXXX of amount ₹X,XXX"
   - Ticket count is CALCULATED from receipt total ÷ ticketThreshold 
     (e.g. ₹2,500 per ticket). Use Math.floor().

3. DASHED SEPARATOR (horizontal rule, dashed, brand color 20% opacity)

4. PRIZE STRUCTURE GRID
   - Title: "Win Amazing Prizes!" centered, semibold
   - 3 prize rows, each in a rounded-xl card with 5% brand primary 
     background and 10% border:
     • 🏆 First Prize — ₹1,00,000 — 1 Winner
     • 🥈 Second Prize — ₹30,000 — 5 Winners  
     • 🥉 Third Prize — ₹10,000 — 15 Winners

5. CTA BUTTON (pointer-events-auto — very important)
   - If NOT yet claimed: gradient button (brand primary → primaryDark),
     white text, Trophy icon + "Claim X Lucky Draw Ticket(s) Now"
     → onClick: pause the story timer, open the GameRegistrationSheet
   - If ALREADY claimed: green success state, "✓ Tickets Claimed 
     Successfully!" — no button

6. TERMS PREVIEW BOX
   - Rounded-xl, 5% brand dark background, fine print:
     • "1 lucky draw ticket for every ₹2,500 spent"
     • "Winners announced on 1st of every month"
     • "Multiple tickets = Higher chances"
     • "Valid profile information required"

Story behavior:
- Story auto-pauses (setIsPaused(true)) when isRaffle===true and 
  tickets not yet claimed
- Story resumes only after registration is complete
- After successful claim: story closes automatically after 300ms delay
- Tap navigation zones: top 15%, left strip 40px, right strip 40px, 
  bottom 15% — leaving center card fully interactive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 2 — GAME REGISTRATION SHEET (Reusable Pattern)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a component called GameRegistrationSheet. It slides in from the 
RIGHT (side="right") as a full-height panel (w-full sm:max-w-md). It is 
GENERIC and reusable — accept a `gameType` prop (e.g. 'lucky-draw', 
'scratch-card', 'spin-wheel', 'referral', 'milestone') that controls 
the title and reward description text. The 3-step flow is IDENTICAL for 
all game types — only the label copy changes.

Props interface:
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  gameType: 'lucky-draw' | 'scratch-card' | 'spin-wheel' | 'referral' | 
            'milestone'
  rewardDescription: string  // e.g. "2 Lucky Draw Tickets", "1 Scratch Card"
  onSuccess: (result: string[]) => void
  customerPhone?: string     // pre-filled, read-only

Internal state:
  step: 'profile' | 'otp' | 'success'
  loading: boolean
  formData: { firstName, lastName, gender, ageGroup, email, maritalStatus }
  otp: string
  generatedRewards: string[]  // ticket IDs, scratch card codes, etc.

Reset all state on close (useEffect watching isOpen, with 300ms delay).

─────────────────────
STEP 1 — PROFILE FORM
─────────────────────
Header (top of sheet, px-6 pt-12 pb-6):
  - Pill badge: "[gameType label] Registration" in brand primary (10% 
    opacity background)
  - Title (3xl bold, brand primaryDark font): "Join the Family"
  - Subtitle: "Complete your profile to claim [rewardDescription]."

Form fields (space-y-5):
  1. Customer Number — READ ONLY display row
     - Shows "+91 [customerPhone]" with User icon in a bordered div
     - bg-white/50, border light, rounded-lg
  
  2. First Name + Last Name — side-by-side grid (2 cols)
     - Input, bg-white, border-none, shadow-sm, h-12
     - Placeholders: "Arya" and "Sharma"
  
  3. Gender + Age Group — side-by-side grid (2 cols)
     - Select dropdowns, same styling
     - Gender options: Male / Female / Other
     - Age Group options: 18-24 / 25-34 / 35-44 / 45-54 / 55+
  
  4. Email Address — full width
     - type="email", required, h-12, bg-white, border-none, shadow-sm
  
  5. Marital Status — full width Select
     - Options: Single / Married / Other
  
  Submit Button (pt-4):
  - Full width, h-14, brand primary background, white text, semibold
  - Shows Loader2 spinner (animate-spin) when loading
  - Label: "Continue"
  - Below: "By continuing, you agree to our Terms & Conditions" (xs, 
    centered, tertiary color)
  
  On submit validation: all 6 fields required. If valid:
  - setLoading(true)
  - After 1000ms simulate API: alert("Your OTP code is: 000000")
  - setStep('otp')

─────────────────────
STEP 2 — OTP VERIFY
─────────────────────
Header updates:
  - Badge: "[gameType label] Registration"
  - Title: "Verify Details"
  - Subtitle: "Enter the code sent to [formData.email]"
  - Back arrow button (top-left) returns to 'profile' step

Body (centered column):
  - Mail icon in a circle (brand primary 5% background)
  - InputOTP — 6 slots, each slot: w-12 h-14, bg-white, shadow-sm, 
    border-none, ring-1 ring-black/5, text-lg
  - "Resend Code" text button in brand primary (onClick: alert 
    "Code resent!")
  
Submit Button:
  - "Verify & Claim", h-14, brand primary, opacity 0.7 when otp < 6 chars
  - On submit: setLoading(true), after 1000ms:
    • If otp === '000000': generate mock reward IDs:
        Array(count).fill(0).map(() => `TKT-${Math.floor(100000 + 
        Math.random() * 900000)}`)
      setGeneratedRewards(ids), setStep('success'), call onSuccess(ids)
      Then after 2000ms: onOpenChange(false) — AUTO CLOSE
    • Else: alert("Invalid OTP. Use 000000 for testing.")

─────────────────────
STEP 3 — SUCCESS
─────────────────────
Header updates:
  - Badge: "Confirmation"
  - Title: "You're In! 🎉"
  - Subtitle: "You've successfully claimed [rewardDescription]."

Body (animate-in zoom-in-95 fade-in duration-500):
  - Large icon circle (gradient brand primary → primaryDark, w-24 h-24):
    Ticket icon, white, w-10 h-10
  - White card (rounded-2xl, border light, shadow-sm, p-6):
    • Header: "YOUR TICKET NUMBERS" uppercase xs bold tracking-widest, 
      brand text secondary
    • Each reward as a row (p-4 rounded-xl, brand background tertiary):
      - Left: ticket ID in font-mono lg font-bold brand primaryDark
      - Right: CheckCircle2 icon in bg-white, text-green-600
  - Close Button: full width h-14, brand secondary background, white text
  - Below button: "Check the Loyalty section to view your tickets anytime."
    (sm, centered, text secondary, "Loyalty" in bold)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 3 — STATE MANAGEMENT & NAVIGATION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In the parent app (App.tsx or equivalent):

State:
  claimedTickets: string[]          // persisted to sessionStorage
  hasNewLoyalty: boolean            // triggers badge on nav tab
  activeNavTab: NavTab              // current navigation tab
  isStoriesOpen: boolean

After onSuccess fires from GameRegistrationSheet:
  1. Add new ticket IDs to claimedTickets state
  2. Write to sessionStorage: 
       sessionStorage.setItem(`claimed_tickets_${phone}`, 
       JSON.stringify(newTickets))
  3. setHasNewLoyalty(true)
  4. setActiveNavTab('loyalty')  ← navigate automatically
  
In StoriesViewer, after sheet closes AND raffleClaimed===true:
  useEffect → setTimeout(onClose, 300)  ← auto-close stories

This creates the full flow:
  Story → Claim CTA → Sheet opens (Profile) → OTP → Success (2s) 
  → Sheet auto-closes → Stories auto-closes (300ms delay) 
  → App navigates to Loyalty tab → Ticket visible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 4 — LOYALTY TAB (ticket display after claim)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In the Loyalty page, show a "My Lucky Draw Tickets" section only when 
claimedTickets.length > 0:

Card (rounded-2xl, border light, bg-white, shadow-sm, p-5, mb-6):
  - Header row: Ticket icon in brand-primary 10% circle + 
    title "My Lucky Draw Tickets" (bold) + 
    subtitle "[N] active ticket(s) for this month" (xs)
  - Ticket rows (space-y-2):
    Each: flex justify-between, p-3, rounded-xl, border-dashed at 30% 
    primary opacity, bg brand tertiary
    • Left: ticket ID in font-mono medium sm, brand primaryDark
    • Right: "Active" badge (text-[10px] font-bold uppercase, px-2 py-1, 
      bg-green-100, text-green-700, rounded)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 5 — REUSE PATTERN FOR OTHER GAMIFICATION FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The GameRegistrationSheet MUST work for these additional game types by 
simply changing the gameType prop and rewardDescription text. The 3-step 
profile → OTP → success flow stays IDENTICAL. Only these strings change:

  gameType='scratch-card'
    Badge: "Scratch Card Unlock"
    Title (profile): "Unlock Your Card"
    Subtitle: "Complete your profile to claim [rewardDescription]."
    Success title: "Scratch Away! 🎴"
    Success reward label: "YOUR SCRATCH CARDS"
    Reward ID format: `SCR-${random6digits}`
    Loyalty display: "My Scratch Cards" section

  gameType='spin-wheel'
    Badge: "Spin the Wheel"
    Title (profile): "Ready to Spin?"
    Subtitle: "Register to spin and win [rewardDescription]."
    Success title: "You Spun & Won! 🎡"
    Success reward label: "YOUR SPIN REWARD"
    Reward ID format: `SPIN-${random6digits}`
    Loyalty display: "My Spin Rewards" section

  gameType='referral'
    Badge: "Referral Reward"
    Title (profile): "Share the Love"
    Subtitle: "Complete your profile to unlock your referral bonus."
    Success title: "Referral Activated! 🤝"
    Success reward label: "YOUR REFERRAL CODE"
    Reward ID format: `REF-${firstname.toUpperCase()}-${random4digits}`
    Loyalty display: "My Referral Rewards" section

  gameType='milestone'
    Badge: "Milestone Unlocked"
    Title (profile): "Claim Your Reward"
    Subtitle: "You've hit a milestone! Claim [rewardDescription]."
    Success title: "Milestone Achieved! 🏆"
    Success reward label: "YOUR MILESTONE REWARD"
    Reward ID format: `MLT-${random6digits}`
    Loyalty display: "My Milestone Rewards" section

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- React + TypeScript + Tailwind CSS (mobile-first, max-w-md)
- All colors from a central brand config object (primary, primaryDark, 
  primaryLight, secondary, accent, background.*, text.*, border.*,
  neutral.*, colors.success)
- All colors applied via inline style={{ }} — NOT hardcoded Tailwind 
  color classes
- Use shadcn/ui components: Sheet, SheetContent, SheetTitle, 
  SheetDescription, Input, Label, Button, Select/SelectTrigger/
  SelectContent/SelectItem, InputOTP/InputOTPGroup/InputOTPSlot
- Use lucide-react icons: ChevronLeft, CheckCircle2, Ticket, Mail, User, 
  Loader2, Gift, Trophy, X
- Use motion/react (import from 'motion/react') for any animations
- sessionStorage for ticket persistence (resets on page refresh for 
  testing — this is intentional)
- Magic OTP for testing: 000000 (show in alert when profile submitted)
- All state is frontend-only (no backend calls)
- Story auto-pause: when a gamification story is active and the reward 
  is unclaimed, call setIsPaused(true) to freeze the progress bar
- The Sheet uses side="right" and slides in OVER the story viewer 
  (z-index: story viewer is z-[100], sheet must be z-[200]+)
- Pointer events on the story card: the card itself is 
  pointer-events-none but CTA buttons inside are pointer-events-auto
- Auto-close sequence timing:
    OTP success → 2000ms → Sheet closes
    Sheet closes + raffleClaimed → 300ms → StoriesViewer closes
    StoriesViewer closes → immediate → navigate to Loyalty tab
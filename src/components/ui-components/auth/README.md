# Compact Auth Modal Components

This folder contains a streamlined authentication modal system with a clean black & white design.

## Structure

```
auth/
├── index.js                # Export file for easy imports
├── AuthModal.jsx          # Main modal container
├── CompactSignInForm.jsx  # Compact sign in form
├── CompactSignUpForm.jsx  # Compact sign up form
└── SocialLogin.jsx        # Social authentication buttons
```

## Components

### AuthModal

The main container component with compact black & white design.

**Features:**

- Small modal size (no scrolling needed)
- Black & white color scheme
- Clean tab navigation
- Responsive design

**Props:**

- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback when modal should close
- `defaultTab` (string): "signin" or "signup" - which tab to show initially

### CompactSignInForm

Streamlined sign-in form with essential fields only.

**Features:**

- Email and password fields
- Password visibility toggle
- Forgot password link
- Black button styling
- Compact spacing

### CompactSignUpForm

Clean registration form with minimal required fields.

**Features:**

- Name, email, and password fields
- Terms acceptance checkbox
- Password visibility toggle
- Compact layout
- Black button styling

### SocialLogin

Minimal social authentication options.

**Features:**

- Google and Twitter login
- Icon-only compact buttons
- Clean separator line

## Design Philosophy

- **Compact**: No scrolling required
- **Monochrome**: Black & white color scheme
- **Minimal**: Only essential fields
- **Clean**: Simple, elegant interface
- **Fast**: Quick authentication flow

## Usage

```jsx
import { AuthModal } from "./ui-components/auth";

<AuthModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  defaultTab="signin"
/>;
```

# Raintech Hotel Room Booking — Coding Test

A small single-page hotel room booking interface built for the Raintech Software Limited Developer Skills Assessment.

## Stack

- React
- Vite
- JavaScript
- CSS
- Vitest for a small unit-test suite

## Requirements implemented

- Hardcoded sample hotel room data from the assessment.
- Check-in and check-out date selection.
- Room selection.
- Number of nights calculation.
- Total price calculation: `nights × price per night`.
- Check-in cannot be in the past.
- Check-out must be after check-in.
- Clear validation messages.
- Optional bonus: hardcoded existing bookings prevent overlapping reservations.
- Optional bonus: room filtering by maximum guests.
- Optional bonus: unit tests for night calculation and validation.

## Run locally

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Run tests

```bash
npm test
```

## Production build

```bash
npm run build
```

## Date/booking logic

The booking overlap check uses half-open date ranges:

`requestedCheckIn < existingCheckOut && requestedCheckOut > existingCheckIn`

This means a guest can check in on the same day another guest checks out.

## What I would improve with more time

- Add a small backend/API and database instead of hardcoded data.
- Persist reservations and return a real booking confirmation.
- Add accessibility/usability review and more automated UI tests.
- Add a richer availability calendar and loading/error states for API requests.
- Add currency/tax configuration if required by the business.

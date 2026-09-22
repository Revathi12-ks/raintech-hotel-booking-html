import { describe, expect, it } from "vitest";
import { calculateNights, validateBooking } from "./main.jsx";

describe("calculateNights", () => {
  it("calculates nights correctly", () => {
    expect(calculateNights("2026-10-01", "2026-10-04")).toBe(3);
  });

  it("returns zero for the same date", () => {
    expect(calculateNights("2026-10-01", "2026-10-01")).toBe(0);
  });
});

describe("validateBooking", () => {
  it("rejects a past check-in", () => {
    expect(
      validateBooking("2026-09-09", "2026-09-11", "R101", "2026-09-10")
    ).toContain("cannot be in the past");
  });

  it("rejects same-day checkout", () => {
    expect(
      validateBooking("2026-09-12", "2026-09-12", "R101", "2026-09-10")
    ).toContain("must be after");
  });

  it("rejects an overlapping booked room", () => {
    expect(
      validateBooking("2026-09-19", "2026-09-21", "R101", "2026-09-10")
    ).toContain("already booked");
  });

  it("allows checkout on another booking's check-in date", () => {
    expect(
      validateBooking("2026-09-16", "2026-09-18", "R101", "2026-09-10")
    ).toBe("");
  });
});
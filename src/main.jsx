import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const rooms = [
  { code: "101", floor: 1, status: "available" },
  { code: "102", floor: 1, status: "occupied" },
  { code: "103", floor: 1, status: "available" },
  { code: "104", floor: 1, status: "dirty" },
  { code: "105", floor: 1, status: "maintenance" },
  { code: "106", floor: 1, status: "available" },
  { code: "107", floor: 1, status: "available" },
  { code: "108", floor: 1, status: "available" },
  { code: "109", floor: 1, status: "occupied" },
  { code: "110", floor: 1, status: "available" },
  { code: "111", floor: 1, status: "available" },
  { code: "112", floor: 1, status: "available" },

  { code: "201", floor: 2, status: "available" },
  { code: "202", floor: 2, status: "available" },
  { code: "203", floor: 2, status: "occupied" },
  { code: "204", floor: 2, status: "available" },
  { code: "205", floor: 2, status: "dirty" },
  { code: "206", floor: 2, status: "available" },
  { code: "207", floor: 2, status: "available" },
  { code: "208", floor: 2, status: "available" },
  { code: "209", floor: 2, status: "available" },
  { code: "210", floor: 2, status: "blocked" },
  { code: "211", floor: 2, status: "available" },
  { code: "212", floor: 2, status: "available" },
];

const guests = [
  ["102", "₹1200.00", "₹112", "Mathew Hyden", "02", "00", "02", "02/04/2026", "mathewhyden..."],
  ["103", "₹1300.00", "₹115", "Sarah Thompson", "02", "03", "03", "03/04/2026", "sarahthomps..."],
  ["104", "₹1400.00", "₹110", "James Smith", "02", "04", "04", "04/04/2026", "jamessmithid..."],
  ["105", "₹1500.00", "₹122", "Emily Clark", "02", "05", "05", "05/04/2026", "emilyclarkid..."],
  ["106", "₹1600.00", "₹125", "Michael Brown", "02", "06", "00", "06/04/2026", "michaelBrown..."],
  ["107", "₹1700.00", "₹150", "Jessica Lee", "02", "07", "07", "07/04/2026", "jessicaleeid..."],
  ["108", "₹1800.00", "₹132", "David Wilson", "02", "08", "00", "08/04/2026", "davidwilsonid..."],
  ["109", "₹1900.00", "₹135", "Sophia Martinez", "02", "09", "00", "09/04/2026", "sophiamartin..."],
  ["110", "₹2000.00", "₹138", "Daniel Garcia", "02", "10", "00", "10/04/2026", "danielgarciaid..."],
  ["111", "₹2100.00", "₹140", "Olivia Rodriguez", "02", "11", "00", "11/04/2026", "oliviarodrigue..."],
];

const bookings = [
  {
    roomCode: "R101",
    checkIn: "2026-09-18",
    checkOut: "2026-09-20",
  },
  {
    roomCode: "R201",
    checkIn: "2026-09-22",
    checkOut: "2026-09-25",
  },
];

const bookingRooms = [
  { code: "R101", type: "Deluxe Room", price: 3500, maxGuests: 2 },
  { code: "R102", type: "Deluxe Room", price: 3500, maxGuests: 2 },
  { code: "R201", type: "Executive Suite", price: 5800, maxGuests: 3 },
  { code: "R202", type: "Executive Suite", price: 5800, maxGuests: 3 },
  { code: "R301", type: "Family Room", price: 4200, maxGuests: 4 },
];

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Dashboard({ setPage }) {
  const [roomStatus, setRoomStatus] = useState(rooms);

  function changeStatus(code, status) {
    setRoomStatus((prev) =>
      prev.map((room) =>
        room.code === code ? { ...room, status } : room
      )
    );
  }

  return (
    <div>
      <h1 className="page-title">Main Dashboard</h1>

      <div className="dashboard-actions">
        <button onClick={() => setPage("checkin")}>🧳 Guest Check-in</button>
        <button onClick={() => setPage("checkout")}>🚪 Guest Check-out</button>
        <button onClick={() => setPage("booking")}>📅 Reservations</button>
        <button>🧹 Housekeeping</button>
        <button>🍽 Restaurant</button>
        <button>💬 WhatsApp</button>
        <button>🏨 Rooms</button>
        <button>👥 Staff</button>
        <button>▣ Floors</button>
        <button>📊 Reports</button>
        <button>⚙ Settings</button>
        <button>👨‍👩‍👧 Group Booking</button>
      </div>

      <div className="overview">
        <h2>Operational Overview</h2>

        <div className="overview-grid">
          <div>
            <span>Occupancy</span>
            <strong>4%</strong>
          </div>

          <div>
            <span>Pending Check-ins</span>
            <strong>0</strong>
          </div>

          <div>
            <span>Pending Departures</span>
            <strong>0</strong>
          </div>

          <div>
            <span>Revenue Today</span>
            <strong>₹0</strong>
          </div>
        </div>
      </div>

      <div className="room-panel">
        <h2>Room Status - Interactive Floor View</h2>
        <p>50 rooms across your property</p>

        {[1, 2].map((floor) => (
          <div className="floor-row" key={floor}>
            <div className="floor-name">Floor {floor}</div>

            <div className="room-grid">
              {roomStatus
                .filter((room) => room.floor === floor)
                .map((room) => (
                  <button
                    key={room.code}
                    className={`room-tile ${room.status}`}
                    onClick={() => {
                      const next =
                        room.status === "available"
                          ? "occupied"
                          : room.status === "occupied"
                          ? "dirty"
                          : "available";

                      changeStatus(room.code, next);
                    }}
                    title="Click to change room status"
                  >
                    {room.code}
                  </button>
                ))}
            </div>
          </div>
        ))}

        <div className="legend">
          <span>🟢 Available</span>
          <span>🔵 Occupied</span>
          <span>🔴 Dirty</span>
          <span>🟠 Maintenance</span>
          <span>⚫ Blocked</span>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="vacate-box">
          <h2>🛏 Going to Vacate Rooms</h2>

          <div className="vacate-item">
            <div className="room-photo">🛏️</div>
            <div>
              <strong>Room 101</strong>
              <p>Departing - Guest</p>
              <small>Check-Out Scheduled</small>
            </div>
          </div>

          <div className="vacate-item">
            <div className="room-photo">🛏️</div>
            <div>
              <strong>Room 102</strong>
              <p>Departing - Guest</p>
              <small>Check-Out: 11:00 AM</small>
            </div>
          </div>
        </div>

        <div className="quick-box">
          <h2>Quick Room Status Changer & Actions</h2>

          <select>
            <option>Room 101</option>
            <option>Room 102</option>
            <option>Room 103</option>
            <option>Room 104</option>
          </select>

          <button className="success-btn">🧹 Cleaning done, ready to serve</button>
          <button>Set all Dirty to Cleaning</button>
          <button>View All Maintenance</button>
        </div>
      </div>
    </div>
  );
}

function CheckIn() {
  return (
    <div>
      <h1 className="page-title">Guest Check-in</h1>

      <div className="checkin-layout">
        <section className="panel">
          <h2>1. Select Booking & Guest</h2>

          <input placeholder="🔍 Search Booking ID / Guest Name" />

          <select>
            <option>Name/Phone number</option>
            <option>Mathew Hyden</option>
            <option>Sarah Thompson</option>
            <option>James Smith</option>
          </select>

          <button className="primary">＋ Add Guest</button>

          <div className="info-row">
            <div>
              <b>Booking Date</b>
              <br />
              02/04/2026
            </div>

            <div>
              <b>Booking Time</b>
              <br />
              07:00 PM
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>2. Review & Update Details</h2>

          <div className="form-grid">
            <label>
              Room No.
              <input value="101" readOnly />
            </label>

            <label>
              Rent
              <input value="1200.00" readOnly />
            </label>

            <label>
              GST
              <input value="112.00" readOnly />
            </label>

            <label>
              Tenant Name
              <input defaultValue="Mathew Hyden" />
            </label>

            <label>
              No-of Adults
              <input value="02" readOnly />
            </label>

            <label>
              No-of Kids
              <input value="00" readOnly />
            </label>

            <label>
              Checkout Date
              <input value="02/04/2026" readOnly />
            </label>

            <label>
              Guest Count
              <select>
                <option>02</option>
                <option>03</option>
                <option>04</option>
              </select>
            </label>

            <label>
              Update Guest Name
              <input defaultValue="Mathew Hyden" />
            </label>
          </div>

          <div className="button-row">
            <button>🗑 Delete</button>
            <button>✏ Edit</button>
            <button>⟳ Update</button>
            <button className="primary">Confirm Guest Details</button>
          </div>
        </section>
      </div>

      <section className="panel table-panel">
        <h2>Guest List</h2>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ROOM NO.</th>
                <th>RENT</th>
                <th>GST</th>
                <th>NAME</th>
                <th>NO. OF ADULTS</th>
                <th>NO. OF KIDS</th>
                <th>SENIOR CITIZEN</th>
                <th>CHECKOUT DATE</th>
                <th>ID PROOF</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {guests.map((guest, index) => (
                <tr key={index}>
                  {guest.map((item, i) => (
                    <td key={i}>{item}</td>
                  ))}
                  <td>⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="payment-panel">
        <h2>3. Finalize Check-in & Payment</h2>

        <p>Room Charge <strong>₹2500.00</strong></p>
        <p>Extra Charges <strong>₹2500.00</strong></p>
        <p>Tax <strong>₹0.00</strong></p>

        <hr />

        <h2>Total Amount: ₹2500.00</h2>
        <h3>Total Paid: ₹2500.00</h3>

        <button className="primary big">
          Complete Check-in
        </button>

        <button>Get Data</button>
        <button>💳 M-Pay</button>
        <button>🖨 Print</button>
        <button>Print Registration Card</button>
        <button>Download Folio</button>
      </section>
    </div>
  );
}

function CheckOut() {
  return (
    <div>
      <h1 className="page-title">Guest Check-out</h1>

      <div className="checkout-layout">
        <section className="panel">
          <h2>1. Identify Departing Guest</h2>

          <input placeholder="Search Guest" />

          <select>
            <option>Select Guest from List</option>
            <option>Mathew Hyden</option>
            <option>Sarah Thompson</option>
          </select>

          <button className="primary">Find Room/Guest</button>

          <div className="guest-card">
            <h3>Guest Name</h3>
            <strong>Mathew Hyden</strong>

            <h3>Room No.</h3>
            <strong>🛏 101</strong>
          </div>

          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Stay Dates</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>101</td>
                <td>02/04/2026-04/04/2026</td>
                <td>
                  <input type="checkbox" /> Select
                </td>
              </tr>

              <tr>
                <td>103</td>
                <td>02/04/2026-04/04/2026</td>
                <td>
                  <input type="checkbox" /> Select
                </td>
              </tr>
            </tbody>
          </table>

          <button>Add/Change Selected Rooms</button>
        </section>

        <section className="panel">
          <h2>2. Review & Finalize Bill</h2>

          <div className="bill-room">
            <h2>[Room 101]</h2>

            <p>
              <b>(Nights: 2, Rate: ₹1200.00, Total: ₹2400.00)</b>
            </p>

            <h3>Additional Charges</h3>

            <button>Mini-bar</button>
            <button>Laundry</button>
            <button>＋</button>

            <table>
              <tbody>
                <tr>
                  <td>Mini-bar (Water x2)</td>
                  <td>03/04/2026</td>
                  <td>₹100.00</td>
                </tr>

                <tr>
                  <td>Room Service</td>
                  <td>03/04/2026</td>
                  <td>₹1200.00</td>
                </tr>

                <tr>
                  <td>Restaurant Bill (Room 101)</td>
                  <td>03/04/2026</td>
                  <td>₹850.00</td>
                </tr>
              </tbody>
            </table>

            <h3 className="right">
              Room 101 Total ₹4550.00
            </h3>
          </div>

          <div className="bill-room">
            <h2>[Room 103]</h2>

            <p>
              <b>(Nights: 2, Rate: ₹1200.00, Total: ₹2400.00)</b>
            </p>

            <h3>Additional Charges</h3>

            <button>Mini-bar</button>
            <button>Laundry</button>
            <button>＋</button>

            <table>
              <tbody>
                <tr>
                  <td>Mini-bar (Chips)</td>
                  <td>03/04/2026</td>
                  <td>₹50.00</td>
                </tr>

                <tr>
                  <td>Restaurant Bill (Room 103)</td>
                  <td>03/04/2026</td>
                  <td>₹1200.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="right">
            Selected Rooms Combined Total: ₹8200.00
          </h2>
        </section>

        <section className="panel payment-box">
          <h2>3. Payment & Check-out</h2>

          <h2>
            Total Amount Due <span>₹8200.00</span>
          </h2>

          <label>Payment Method</label>

          <select>
            <option>Credit Card</option>
            <option>Cash</option>
            <option>M-Pay</option>
          </select>

          <label>Payment Amount</label>

          <input value="₹8200.00" readOnly />

          <button className="primary big">
            Process Payment & Check-out
          </button>

          <button className="primary">
            Payment & Check-out
          </button>

          <button>Print Final Invoice</button>
          <button>Email Final Invoice</button>
        </section>
      </div>
    </div>
  );
}

function Booking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [guestFilter, setGuestFilter] = useState("all");

  const filteredRooms =
    guestFilter === "all"
      ? bookingRooms
      : bookingRooms.filter(
          (room) => room.maxGuests >= Number(guestFilter)
        );

  const selected = bookingRooms.find(
    (room) => room.code === selectedRoom
  );

  const nights =
    checkIn &&
    checkOut &&
    checkOut > checkIn
      ? Math.round(
          (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const total = selected ? selected.price * nights : 0;

  return (
    <div>
      <h1 className="page-title">Hotel Room Booking</h1>

      <div className="booking-layout">
        <section className="panel">
          <h2>1. Choose your stay</h2>

          <div className="date-grid">
            <label>
              Check-in
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>

            <label>
              Check-out
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
          </div>

          <label>
            Filter by maximum guests
            <select
              value={guestFilter}
              onChange={(e) => setGuestFilter(e.target.value)}
            >
              <option value="all">All rooms</option>
              <option value="2">2+ guests</option>
              <option value="3">3+ guests</option>
              <option value="4">4+ guests</option>
            </select>
          </label>

          <h2>Available Rooms</h2>

          <div className="booking-room-list">
            {filteredRooms.map((room) => (
              <button
                key={room.code}
                className={`booking-room ${
                  selectedRoom === room.code ? "selected" : ""
                }`}
                onClick={() => setSelectedRoom(room.code)}
              >
                <div>
                  <strong>{room.code}</strong>
                  <span>{room.type}</span>
                  <small>Up to {room.maxGuests} guests</small>
                </div>

                <strong>{money(room.price)}</strong>
              </button>
            ))}
          </div>
        </section>

        <aside className="panel summary">
          <h2>2. Booking Summary</h2>

          {selected ? (
            <>
              <h2>{selected.code}</h2>
              <p>{selected.type}</p>
              <h3>{money(selected.price)}</h3>
            </>
          ) : (
            <p>No room selected yet.</p>
          )}

          <hr />

          <p>
            Check-in <strong>{checkIn || "—"}</strong>
          </p>

          <p>
            Check-out <strong>{checkOut || "—"}</strong>
          </p>

          <p>
            Number of nights <strong>{nights || "—"}</strong>
          </p>

          <h2>Total price {money(total)}</h2>

          <button
            className="primary big"
            onClick={() =>
              alert(
                `Booking confirmed!\nRoom: ${selectedRoom}\nNights: ${nights}\nTotal: ${money(
                  total
                )}`
              )
            }
          >
            Confirm Booking
          </button>
        </aside>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">R</div>
          <div>
            <strong>Raintech</strong>
            <small>HOTEL</small>
          </div>
        </div>

        <input
          className="global-search"
          placeholder="🔍 Search guests, rooms, reservations, staff..."
        />

        <div className="top-date">
          📅 22 Sep 2026 | 9:30 PM
        </div>
      </header>

      <nav className="navbar">
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "booking" ? "active" : ""}
          onClick={() => setPage("booking")}
        >
          Reservations
        </button>

        <button
          className={page === "checkin" ? "active" : ""}
          onClick={() => setPage("checkin")}
        >
          Guest Check-in
        </button>

        <button
          className={page === "checkout" ? "active" : ""}
          onClick={() => setPage("checkout")}
        >
          Guest Check-out
        </button>
      </nav>

      <main className="content">
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "booking" && <Booking />}
        {page === "checkin" && <CheckIn />}
        {page === "checkout" && <CheckOut />}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
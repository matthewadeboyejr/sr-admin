"use client";

import ArtisanBookingItem from "./ArtisanBookingItem";

export default function ArtisanBookingActivities() {
  return (
    <section className="gap-5 w-full ">
      <div className="flex flex-col gap-5 border p-3 rounded-md shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="font-medium">Booking Activities</h2>
        </div>

        <ArtisanBookingItem />
      </div>
    </section>
  );
}

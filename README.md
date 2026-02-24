# React Native Analog Clock & Time Zone App
## Overview
This is a React Native app I built that displays a custom analog clock. It lets users check their local time and seamlessly switch between different global time zones using data fetched from a public API. I also set it up with an offline-first approach, using a local SQLite database to cache data so the app stays perfectly usable even if the device loses its internet connection.

## Architecture Decisions
Keeping Components Clean (Custom Hooks): I wanted to keep the UI components as pure and readable as possible. To do this, I pulled the heavy lifting—like data fetching, DB initialization, and clock math—out into custom React Hooks (useHome, useTimezone, useAnalogClock).


Zero Third-Party Clock Libraries: Since the assignment specifically forbade using prebuilt analog clock components, I built the clock face and hands completely from scratch using core React Native View components. To make the hands tick, I calculated the exact degrees for the hours, minutes, and seconds, and mapped those to CSS transform properties.


Responsive & Adaptive Layout: To ensure the clock resizes correctly across different devices and handles orientation changes gracefully, I relied on useWindowDimensions(). By calculating the clock's diameter against the smaller value between the screen's width and the available height, it always stays perfectly circular and avoids getting cut off in landscape mode.

Handling Time Math (Intl.DateTimeFormat): Rather than trying to manually add or subtract raw GMT offset seconds (which usually breaks as soon as you factor in complex Daylight Saving Time rules), I decided to leverage JavaScript's native Intl.DateTimeFormat API. It safely and accurately extracts the exact local time for any given IANA time zone string.

Offline Caching Approach
To fulfill the offline constraints, I went with react-native-sqlite-storage.


Time Zone List Caching: On the first successful launch, the app pulls the list of time zones from the TimeZoneDB API and runs a batch insert into a local SQLite TimeZones table. Every time you open the app after that, it instantly loads the list from SQLite, bypassing the network entirely. If the database ever gets deleted or corrupted, the app catches the error, safely falls back to the API, and repopulates the local DB.


Persisting User Preferences: To remember the user's last selected time zone, I created a simple UserPreferences key-value table inside the same SQLite database. When the app boots up, it queries this table right away so the clock immediately jumps to their preferred time zone.

## Assumptions & Trade-offs

Battery Life vs. Real-Time Ticking: The requirements state the clock must update in real time. To achieve this, I used a setInterval hook firing every 1000 milliseconds. While this makes the second hand sweep smoothly, having continuous state updates running in the background carries a slight trade-off in battery consumption compared to a static UI.

JS Engine Compatibility: My time calculation approach assumes that the underlying JavaScript engine (like Hermes, which is standard in modern React Native) has the full internationalization (i18n) timezone dictionary enabled.

Large List Performance: The time zone API returns hundreds of cities. Rendering a list that massive can cause memory bloat and make the search input feel laggy. To counter this, I swapped out the standard FlatList for @legendapp/list to heavily optimize the rendering batches and keep the list UI buttery smooth.

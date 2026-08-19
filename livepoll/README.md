LivePoll

LivePoll is a simple and modern polling application where users can create polls, share them with others, and collect votes.

Features
User signup and login
Create polls
Add multiple poll options
Remove poll options
View created polls
Share polls using a unique link
Copy poll links
Public voting pages
Responsive dark-mode interface
Secure authentication with Supabase
PostgreSQL database with Supabase
Tech Stack
Next.js
React
TypeScript
CSS Modules
Supabase
PostgreSQL
How It Works
Create an account or log in.
Open the dashboard.
Create a poll with a question and options.
Share the generated poll link.
Other users open the link and vote.
Poll data is stored in Supabase.
Poll URL

Each poll has its own unique URL:

/polls/[poll-id]

Example:

http://localhost:3000/polls/ec56a870-6b87-4552-95dd-23d29daf878f

Project Goal

LivePoll is built as a full-stack polling application to demonstrate authentication, database integration, dynamic routes, CRUD operations, and a responsive Next.js user interface
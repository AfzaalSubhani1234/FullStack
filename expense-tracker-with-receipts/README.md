# Bookmark Manager

A personal bookmark manager built with Next.js and Supabase.

## Features

- User Signup
- User Login
- User Logout
- Create Folders
- Delete Folders
- Create Bookmarks
- Edit Bookmarks
- Delete Bookmarks
- Search Bookmarks
- Protected Dashboard
- Supabase Row Level Security (RLS)

## Tech Stack

- Next.js
- React
- Supabase
- PostgreSQL
- CSS Modules

## Database Structure

Folders

- id
- user_id
- name
- created_at

Bookmarks

- id
- folder_id
- user_id
- title
- url
- note
- created_at

## Relationship

User
└── Folders
    └── Bookmarks

## Security

Row Level Security (RLS) ensures:

- Users can only see their own folders.
- Users can only see their own bookmarks.
- Users cannot access another user's data.

## Local Setup

1. Clone repository

git clone <repo-url>

2. Install dependencies

npm install

3. Create .env.local

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key

4. Start server

npm run dev

## Live Demo

https://full-stack-murex-ten.vercel.app/
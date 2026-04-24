# AI Sales Page Generator - Product Requirements Document

## 1. Product Overview

AI Sales Page Generator is a web application that helps users generate professional, conversion-focused sales pages from a structured brief. Users provide product and market inputs, AI produces persuasive copy sections, and the app publishes a public, shareable landing page.

Primary value:
- Reduce time to create high-quality sales pages.
- Standardize conversion-focused copy structure.
- Provide instant publishing with public links.

## 2. Goals and Non-Goals

### Goals
- Deliver a secure authentication flow (register/login/logout).
- Provide a multi-step brief form for structured sales page input.
- Generate AI sales copy using server-side LLM calls.
- Persist generated pages and metadata in PostgreSQL.
- Publish SEO-friendly public pages at `/p/[id]`.
- Provide a dashboard for page management (list/share/delete).
- Include automated tests for critical flows.

### Non-Goals (Initial Version)
- Team collaboration/workspaces.
- Payment/billing system.
- Version history and rollback.
- A/B testing engine.
- Advanced analytics dashboard.

## 3. Target Users

- **Solo founders:** Need fast sales pages for MVP launches.
- **Marketers:** Need repeatable copy drafts for campaigns.
- **Agencies/freelancers:** Need fast first drafts for client work.

## 4. User Stories

- As a new user, I want to register with email/password so I can save my generated pages.
- As a returning user, I want to log in securely and access my dashboard.
- As an authenticated user, I want to complete a guided form describing my product and target market.
- As an authenticated user, I want AI to generate complete sales copy sections from my inputs.
- As an authenticated user, I want to preview and publish a page with a public URL.
- As an authenticated user, I want to see all generated pages and delete pages I no longer need.
- As a public visitor, I want to open a page URL and view a fast, SEO-friendly landing page.

## 5. Functional Requirements

### 5.1 Authentication
- Register page with `name`, `email`, `password`.
- Login page with `email`, `password`.
- Credential validation and error states for invalid login.
- Session handling with NextAuth.js Credentials Provider.
- Protected routes for dashboard/generator.

### 5.2 Sales Page Generator
- Multi-step form collecting:
  - Product Name
  - Original Description
  - Target Market
- Form validation per step and before submit.
- Progress indicator and back/next navigation.

### 5.3 AI Generation
- Server Action receives validated form payload.
- Server Action calls LLM through Vercel AI SDK.
- Prompt enforces a structured output format (headline, subheadline, pain points, benefits, offer, CTA, FAQ).
- Response saved as `aiContent` JSON in PostgreSQL.
- Record linked to current user.

### 5.4 Public Preview and Publishing
- Every page has a UUID-based public identifier.
- Route `/p/[id]` renders published page without authentication.
- SEO metadata generated from page content.
- If page is unpublished or not found, return appropriate 404/visibility state.

### 5.5 Dashboard
- List all pages created by current user.
- Show key metadata:
  - Product Name
  - Publish status
  - Creation date
- Actions:
  - Share (copy public URL)
  - Delete (with confirmation)

## 6. Data Requirements

- Persist users, credentials hash, and sales pages in PostgreSQL.
- Ensure each `SalesPage` belongs to one `User`.
- Store generated content in `aiContent` JSON field.
- Support draft/unpublished state using `isPublished`.

## 7. Security and Compliance Requirements

- Hash passwords before storage (bcrypt or equivalent).
- Never expose raw passwords in logs/responses.
- Validate all server action inputs.
- Restrict dashboard/generator endpoints to authenticated users.
- Ensure users can only access/manage their own private data.

## 8. Non-Functional Requirements

- Use TypeScript across frontend and backend.
- Use App Router patterns in Next.js.
- Basic accessibility:
  - Semantic headings.
  - Keyboard-accessible forms/buttons.
- Performance:
  - Public pages should be renderable for SEO and quick first contentful paint.
- Maintainable architecture with clear module boundaries.

## 9. User Flow

1. User opens app.
2. User registers or logs in.
3. User lands on dashboard.
4. User starts generator flow.
5. User fills multi-step brief form.
6. User submits; server action calls AI and saves result.
7. User is redirected to generated result/detail screen.
8. User publishes page (toggle to `isPublished = true`).
9. User shares public URL `/p/[id]`.
10. Public visitor opens URL and views landing page.

## 10. Feature Breakdown by Milestone

### Milestone 1: Foundation
- Prisma setup + PostgreSQL connection.
- User and SalesPage models + migration.
- NextAuth credentials setup.

### Milestone 2: Core Product
- Register/login/logout UI.
- Protected dashboard shell.
- Generator multi-step form.
- AI server action + persistence.

### Milestone 3: Publishing and QA
- Public route `/p/[id]` with SEO metadata.
- Share and delete actions in dashboard.
- Automated tests for auth, AI generation persistence, and public page load.

## 11. Acceptance Criteria

- User can register and login with credentials.
- Authenticated user can generate and save AI sales content.
- Generated record appears in dashboard.
- Published page is accessible publicly via `/p/[id]`.
- Unpublished/non-existent pages are not publicly exposed as valid pages.
- Automated tests exist and pass for defined critical scenarios.


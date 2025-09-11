# MCP usage rules for this repo

- Database (DDL, DML, roles, RLS, data fixes): must be done via Supabase MCP server configured in `.vscode/mcp.json`.
  - Prefer: list tables, inspect policies, and apply changes using MCP tools; avoid raw external network calls.
  - Never hardcode secrets in code; use server-side SQL or RPCs via MCP.
- Storage (assets, uploads, rules): must be done via Firebase MCP server.
  - Use Firebase Storage for images and get public URLs; do not store binary blobs in DB.
  - Validate Storage rules with MCP when changing access.
- App code patterns:
  - Reads/writes go through `src/services/**` and are consumed with TanStack Query in UI.
  - Forms must use React Hook Form with our RHF components in `src/components/Inputs`.
  - Use `CustomButton` and `CustomLink` for actions/links.
- Security & RLS:
  - Respect RLS. Admin/moderation writes require appropriate roles/RPCs; do not bypass.
  - For role changes (e.g., super-admin), use Supabase MCP to execute the approved SQL.

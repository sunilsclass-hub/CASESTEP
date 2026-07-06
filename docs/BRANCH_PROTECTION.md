# Branch protection — recommended settings for `main`

These settings make `main` safe: nothing lands without a green CI run and a pull
request, and history cannot be rewritten or the branch deleted. Configure once,
in the GitHub UI.

## Enable (classic branch protection)

**Settings → Branches → Branch protection rules → Add branch protection rule**

- **Branch name pattern:** `main`

Then tick:

| Setting | Value |
| --- | --- |
| **Require a pull request before merging** | ✅ on |
| &nbsp;&nbsp;↳ Require approvals | ✅ **1** *(optional — enable once collaborators are added; leave off for a solo repo so you are not blocked)* |
| &nbsp;&nbsp;↳ Dismiss stale approvals when new commits are pushed | ✅ on |
| **Require status checks to pass before merging** | ✅ on |
| &nbsp;&nbsp;↳ Require branches to be up to date before merging | ✅ on |
| &nbsp;&nbsp;↳ **Status checks required** (search and select) | `Lint · Type-check · Test · Build` **and** `End-to-end (Playwright)` |
| **Require conversation resolution before merging** | ✅ on |
| **Do not allow force pushes** | ✅ on (i.e. leave "Allow force pushes" **unchecked**) |
| **Do not allow deletions** | ✅ on (leave "Allow deletions" **unchecked**) |

> Do **not** require the `Supabase Preview` check — it is an external
> integration check that is skipped on doc-only PRs and would block merges.
> Only require the two CI jobs above.

Optionally also enable **Require linear history** (pairs well with squash/rebase
merges) and **Include administrators** (applies the rules to owners too).

## Notes

- The two required checks appear in the search box **only after they have run at
  least once** — they already have (see the Actions tab), so they are
  selectable now.
- New collaborators: turn on **Require approvals → 1** at that point so every
  change gets a second set of eyes.
- Equivalent **Rulesets** (Settings → Rules → Rulesets) can express the same
  policy if you prefer the newer UI; the required checks and the
  no-force-push / no-deletion / PR-required toggles map one-to-one.

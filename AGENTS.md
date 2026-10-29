<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Product page lives at `/` and is composed from `src/components/product/*`; bundle prices and copy data live in `src/lib/product.ts` so pricing has one source of truth (covered by `src/test/product-pricing.test.ts`).
- Cart is client-only React context (`cart.tsx`); checkout is not connected to a backend yet.
- Each extra product page gets its own route, `src/components/<product>/*` folder, cart context and `src/lib/<product>.ts` price module with a pricing test, so products never share price data.
- Per-page visual themes are scoped CSS classes in `src/styles.css` (e.g. `.theme-solar`) that override the semantic tokens; portaled UI (sheets) must add the class too because it renders outside the page wrapper.

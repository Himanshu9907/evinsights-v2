# EVInsights Hub — Global Data Model

The project is global-first. Vehicle facts are normalized into canonical entities; market-specific prices are kept separate from FX display conversion. Every published fact should retain source/provenance and verification metadata.

## Core dimensions
- vehicle, generation, variant, brand
- market/country/city and availability
- pricing, taxes, incentives, currency
- battery, performance, dimensions, safety, features, charging
- media, reviews, articles, guides, FAQs, history
- sources, evidence, verification

## Localization
Supported initial UI languages: en, hi, es, fr, de, it, pt, ja, ko, zh, ar.
Supported major currencies are defined in `src/config/global-markets.js` and use ISO 4217 codes.

## Data pipeline
Discovery → fetch (where permitted) → extraction → normalization → deduplication → conflict resolution → validation → verification → publishing → indexes → Next.js UI.

Do not copy protected editorial text or media wholesale. Use factual structured extraction, attribution and source links; generate original summaries/reviews where appropriate.

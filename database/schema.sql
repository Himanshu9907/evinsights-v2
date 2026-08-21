-- EVInsights Hub PostgreSQL schema
-- No ORM. The application uses node-postgres (pg) and parameterized SQL.

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT,
  logo TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON UPDATE CASCADE,
  generation_id TEXT,
  markets TEXT[] NOT NULL DEFAULT '{}',
  classification JSONB NOT NULL DEFAULT '{}'::jsonb,
  status JSONB NOT NULL DEFAULT '{}'::jsonb,
  page JSONB NOT NULL DEFAULT '{}'::jsonb,
  extracted JSONB NOT NULL DEFAULT '{}'::jsonb,
  verification JSONB NOT NULL DEFAULT '{}'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  rating NUMERIC(3,1),
  review_count INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS markets (
  id TEXT PRIMARY KEY,
  name TEXT,
  currency_code TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS pricing (
  id TEXT PRIMARY KEY,
  variant_id TEXT NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
  market_id TEXT,
  amount NUMERIC(14,2),
  currency_code CHAR(3),
  currency_symbol TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS specifications (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('battery','performance','dimensions','safety','features')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS charging (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  entity_ids TEXT[] NOT NULL DEFAULT '{}',
  type TEXT,
  title TEXT,
  publisher TEXT,
  url TEXT,
  reliability TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT REFERENCES vehicles(id) ON DELETE CASCADE,
  type TEXT,
  url TEXT,
  alt TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('article','review')),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  excerpt TEXT,
  content TEXT,
  vehicle_ids TEXT[] NOT NULL DEFAULT '{}',
  score NUMERIC(3,1),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vehicles_brand_id ON vehicles(brand_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_name ON vehicles(name);
CREATE INDEX IF NOT EXISTS idx_variants_vehicle_id ON variants(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_pricing_variant_id ON pricing(variant_id);
CREATE INDEX IF NOT EXISTS idx_pricing_market_id ON pricing(market_id);
CREATE INDEX IF NOT EXISTS idx_specifications_vehicle_type ON specifications(vehicle_id,type);
CREATE INDEX IF NOT EXISTS idx_charging_vehicle_id ON charging(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_media_vehicle_id ON media(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_vehicle_ids ON content USING GIN(vehicle_ids);
CREATE INDEX IF NOT EXISTS idx_sources_entity_ids ON sources USING GIN(entity_ids);

-- Useful full-text search index for the catalog.
CREATE INDEX IF NOT EXISTS idx_vehicles_search ON vehicles USING GIN (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(slug,'')));

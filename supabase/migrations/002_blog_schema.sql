CREATE TABLE blog_posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  slug          text UNIQUE NOT NULL,
  excerpt       text NOT NULL,
  content       text NOT NULL,
  cover_image   text NOT NULL,
  category      text NOT NULL CHECK (category IN (
                  'style-guide','brand-story','culture','tips')),
  tags          text[] DEFAULT '{}',
  author_name   text DEFAULT 'OWL FAMILY',
  author_avatar text,
  published     boolean DEFAULT false,
  featured      boolean DEFAULT false,
  views         integer DEFAULT 0,
  read_time     integer DEFAULT 5,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now(),
  published_at  timestamptz
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads published posts"
  ON blog_posts FOR SELECT USING (published = true);

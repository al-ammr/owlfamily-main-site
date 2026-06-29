#!/bin/bash

echo "Starting Database Setup for OWL FAMILY..."

# 1. Ensure supabase/migrations directory exists (already done via file creation)
mkdir -p supabase/migrations

# 3. Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo "Creating .env.local with placeholder values..."
  cat << 'EOF' > .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_CALLBACK_URL=http://localhost:3000/api/paystack/verify
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="OWL FAMILY"
ADMIN_EMAIL=admin@owlfamily.com
ADMIN_PASSWORD=your_secure_admin_password
EOF
else
  echo ".env.local already exists. Skipping..."
fi

# 4. Install required packages
echo "Installing Supabase packages..."
npm install @supabase/supabase-js @supabase/ssr

# 5. Output instructions for applying migrations
echo "==========================================================="
echo "Setup complete! To apply migrations to your Supabase project:"
echo "1. Login: npx supabase login"
echo "2. Link project: npx supabase link --project-ref <your-project-id>"
echo "3. Push DB: npx supabase db push"
echo "==========================================================="

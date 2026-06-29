#!/bin/bash

echo '🦉 OWL FAMILY - Auto Supabase Setup'
echo '====================================='

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo '❌ Supabase CLI not found. Please install first.'
    exit 1
fi

# Step 1: Login
echo '🔑 Please login to Supabase CLI'
echo '   Generate token at: https://app.supabase.com/account/tokens'
supabase login

# Step 2: Initialize
echo '📁 Initializing Supabase in project...'
supabase init

# Step 3: Link project
echo '🔗 Please enter your Project ID'
echo '   Find it at: https://supabase.com/dashboard/project/YOUR_PROJECT_ID'
read -p 'Project ID: ' PROJECT_ID
supabase link --project-ref $PROJECT_ID

# Step 4: Pull schema
echo '📥 Pulling schema...'
supabase db pull

# Step 5: Create .env.local
echo '🔑 Setting up environment variables...'
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Paystack Configuration
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
PAYSTACK_SECRET_KEY=your-paystack-secret-key
PAYSTACK_CALLBACK_URL=http://localhost:3000/api/paystack/verify

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=OWL FAMILY Store
EOF

echo '✅ .env.local created!'
echo '⚠️  Please update the values with your actual credentials'

# Step 6: Apply migrations
echo '🚀 Applying migrations...'
supabase migration up

# Step 7: Seed products
echo '🌱 Seeding products...'
npm run seed:products

# Step 8: Verify
echo '✅ Verifying setup...'
supabase projects list

echo ''
echo '====================================='
echo '✅ Setup Complete!'
echo '====================================='
echo '📝 Next steps:'
echo '1. Update .env.local with your actual credentials'
echo '2. Run npm run dev to start the app'
echo '3. Visit http://localhost:3000/admin/products'
echo '====================================='

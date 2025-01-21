#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting API tests...${NC}\n"

# Get access token
echo -e "${GREEN}Getting access token...${NC}"
TOKEN_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@example.com&password=admin")

TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.access_token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
    echo -e "${RED}Failed to get token. Response: $TOKEN_RESPONSE${NC}"
    exit 1
fi

echo -e "Token obtained successfully\n"

# Create test properties
echo -e "${GREEN}Creating test properties...${NC}"

# Property 1 - Residential in San Francisco
PROP1_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/v1/properties/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St",
    "location": "San Francisco, CA",
    "price": 1000000,
    "property_type": "residential",
    "square_footage": 2000,
    "year_built": 2010,
    "bedrooms": 3,
    "bathrooms": 2,
    "description": "Beautiful residential property"
  }')

PROP1_ID=$(echo "$PROP1_RESPONSE" | jq -r '.id // empty')
if [ -n "$PROP1_ID" ]; then
    echo "Created residential property with ID: $PROP1_ID"
else
    echo -e "${RED}Failed to create property 1. Response: $PROP1_RESPONSE${NC}"
fi

sleep 1

# Property 2 - Commercial in San Francisco
PROP2_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/v1/properties/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "456 Market St",
    "location": "San Francisco, CA",
    "price": 1100000,
    "property_type": "commercial",
    "square_footage": 3000,
    "year_built": 2005,
    "description": "Prime commercial space"
  }')

PROP2_ID=$(echo "$PROP2_RESPONSE" | jq -r '.id // empty')
if [ -n "$PROP2_ID" ]; then
    echo "Created commercial property with ID: $PROP2_ID"
else
    echo -e "${RED}Failed to create property 2. Response: $PROP2_RESPONSE${NC}"
fi

sleep 1

# Property 3 - Retail in San Jose
PROP3_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/v1/properties/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "789 Mission St",
    "location": "San Jose, CA",
    "price": 950000,
    "property_type": "retail",
    "square_footage": 2500,
    "year_built": 2008,
    "description": "High-traffic retail location"
  }')

PROP3_ID=$(echo "$PROP3_RESPONSE" | jq -r '.id // empty')
if [ -n "$PROP3_ID" ]; then
    echo "Created retail property with ID: $PROP3_ID"
else
    echo -e "${RED}Failed to create property 3. Response: $PROP3_RESPONSE${NC}"
fi

sleep 1

# List all properties
echo -e "\n${GREEN}Listing all properties...${NC}"
curl -s "http://localhost:8000/api/v1/properties/" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

if [ -n "$PROP1_ID" ]; then
    # Get property matches
    echo -e "\n${GREEN}Getting matches for property 1...${NC}"
    curl -s "http://localhost:8000/api/v1/properties/${PROP1_ID}/matches?min_score=0.5" \
      -H "Authorization: Bearer $TOKEN" | jq '.'

    # Get exchange chains
    echo -e "\n${GREEN}Getting exchange chains for property 1...${NC}"
    curl -s "http://localhost:8000/api/v1/properties/${PROP1_ID}/exchange-chains?min_score=0.5&max_chain_length=3" \
      -H "Authorization: Bearer $TOKEN" | jq '.'

    # Update property 1's price
    echo -e "\n${GREEN}Updating property 1's price...${NC}"
    curl -s -X PUT "http://localhost:8000/api/v1/properties/${PROP1_ID}" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "address": "123 Main St",
        "location": "San Francisco, CA",
        "price": 1200000,
        "property_type": "residential",
        "square_footage": 2000,
        "year_built": 2010,
        "bedrooms": 3,
        "bathrooms": 2,
        "description": "Beautiful residential property"
      }' | jq '.'

    # Get updated matches
    echo -e "\n${GREEN}Getting matches after price update...${NC}"
    curl -s "http://localhost:8000/api/v1/properties/${PROP1_ID}/matches?min_score=0.5" \
      -H "Authorization: Bearer $TOKEN" | jq '.'
fi
